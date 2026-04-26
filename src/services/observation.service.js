const { sequelize,Observation, User, ObservationImage, Species, EcosystemSpecificType, EcosystemTertiaryType, EcosystemSecondaryType, EcosystemPrimaryType } = require('../models');
// const storage = require('../services/storage.service');
const { uploadImage } = require('../services/media.service');
const getFileType = async (buffer) => {
    const mod = await import('file-type');
    return mod.fileTypeFromBuffer(buffer);
};
/**
 * Get observation with optional search and pagination
 * @param {Object} options
 * @param {string} options.search - search term for observation name  or kingdomGroup
 * @param {number} options.page - page number (1- indexed)
 * @param {number} options.limit - items per page
 */

class ObservationService {
    async getAll({ search = '', page = 1, limit = 10 } = {}) {

        page = page && page > 0 ? page : 1;
        limit = limit && limit > 0 ? limit : 10;
        const offset = (page - 1) * limit;
        const where = {};

        //  Op = Operator ex(Op.or, Op.like for search)
        if (search) {
            const { Op } = require('sequelize');
            where[Op.or] = [
                { description: { [Op.like]: `%${search}%` } },
                { kingdomGroup: { [Op.like]: `%${search}%` } },
            ];
        }
        const { rows, count } = await Observation.findAndCountAll({
            where,
            distinct: true,
            attributes: [
                'publicId',
                // 'proposedSpeciesId',
                'kingdomGroup',
                'description',
                'observedAt',
                'latitude',
                'longitude',
                'locationName',
                // 'confidenceLevel',
                'status',
                'createdAt'
            ],
            include: [
                {
                model: ObservationImage,
                as: 'ObservationImages',
                required: false,
                attributes: [
                    'publicId',
                    'imagePath',
                    'thumbnailPath',
                    'mimeType',
                ]
            },
            {
                model: User,
                as: 'creator',
                required: false,
                attributes: [
                    'publicId',
                    // 'username',
                ]
            }, {
                model: Species,
                as: 'species',
                required: false,
                attributes: [
                    'publicId',
                    'name',
                    'scientificName',
                ],
                include: [{
                    model: EcosystemSpecificType,
                    as: 'ecosystemSpecificType',
                    attributes: [
                        'publicId',
                        'name',
                        'keyCharacteristics',
                    ],
                    include: [{
                        model: EcosystemTertiaryType,
                        as: 'ecosystemTertiaryType',
                        attributes: [
                            'publicId',
                            'name',
                            'keyCharacteristics',
                            'ecosystemPrimaryType',
                            'ecosystemSecondaryType',
                        ],
                    }]
                }],
            }]
            ,
            offset,
            limit,
            order: [['observedAt', 'ASC']]
        });

        // todo map data
        const data = rows.map(obs => {
            const specific = obs.species?.ecosystemSpecificType;
            const primary = specific?.ecosystemTertiaryType.ecosystemPrimaryType;
            const secondary = specific?.ecosystemTertiaryType.ecosystemSecondaryType;
            const tertiary = specific?.ecosystemTertiaryType.name;
            const specificType = obs.species?.ecosystemSpecificType.name;
            return {
                publicId: obs.publicId,
                observation: {
                    kingdomGroup: obs.kingdomGroup,
                    description: obs.description,
                    observedAt: obs.observedAt,
                    status: obs.status
                },
                location: {
                    name: obs.locationName,
                    coordinates: {
                        latitude: obs.latitude,
                        longitude: obs.longitude
                    }
                },
                species: obs.species ? {
                    publicId: obs.publicId,
                    commonName: obs.species.name,
                    ecosystem: primary ? {
                        primaryType: primary,
                        secondaryType: secondary,
                        tertiaryType: tertiary,
                        specificType: specificType,
                    } : null
                } : null,
                observer: obs.creator
                    ? {
                        publicId: obs.creator.publicId,
                        // username: obs.creator.username
                    }
                    : null,
                images: obs.ObservationImages?.map(img => ({
                    publicId: img.publicId,
                    imageUrl: img.imagePath,
                    thumbnailUrl: img.thumbnailPath,
                    mimeType: img.mimeType
                })) || [],

                timestamps: {
                createdAt: obs.createdAt
                }
            }
        });

        return { data, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } }

    }

    async createObservation(payload,logger) {
        let t; // define outside try
        const { files, createdBy, speciesId, kingdomGroup, description, observedAt, latitude, longitude, locationName, images, proposedSpeciesId } = payload;

        try {

            console.log('Payload:', payload);
            if (!payload) {
                logger.app.warn({
                    createdBy,
                    message: 'Payload is empty'
                });
                throw new Error('Payload is required');
            }
            // Upload file to MinIO
            logger.app.info({
                createdBy,
                endpoint: 'createObservation',
                payloadSummary: {
                    fileCount: files?.length || 0,
                    locationName,
                    speciesId
                },
                message: 'Starting observation creation'
            });

            // Validate files (before transaction)
            if (Array.isArray(files) && files.length > 0) {
                for (const f of files) {
                    const type = await getFileType(f.file.buffer);

                    if (!type || !type.mime.startsWith('image/')) {
                        throw new Error('Invalid media file detected');
                    }
                }
            }

            t = await sequelize.transaction(); // start transaction

            // Upload file to MinIO
            if (Array.isArray(files) && files.length > 0) {

                const uploadedFiles = await Promise.all(
                    files.map(img =>
                        uploadImage(
                            img.file.buffer,
                            img.storageKey,
                            img.file.mimetype
                        )
                    )
                );
                files.forEach((img, index) => {
                    img.uploaded = uploadedFiles[index];
                });

                logger.app.info({
                    createdBy,
                    count: files.length,
                    message: 'All files uploaded to MinIO'
                });
            }
            // Validate species
            const species = await Species.findOne({
                where: { publicId: speciesId }
            });

            if (!species) {
                logger.app.warn({
                    createdBy,
                    speciesId,
                    message: 'Species not found'
                });
                throw new Error('Species not found');
            }

            const user = await User.findOne({
                where: { publicId: createdBy }
            });

            if (!user) {
                logger.app.warn({
                    createdBy,
                    message: 'User not found'
                });
                throw new Error('User not found');
            }
            // Create observation
            const observation = await Observation.create({
                speciesId: species.id,
                proposedSpeciesId: proposedSpeciesId || null,
                kingdomGroup,
                description,
                observedAt: new Date(observedAt),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                locationName,
                createdBy: user.id
            }, { transaction: t });

            logger.app.info({
                createdBy,
                observationId: observation.id,
                message: 'Observation record created in DB'
            });

            // Create associated images
            console.log('Images:', images);
            if (Array.isArray(files) && files.length > 0) {
                for (const img of files) {
                    await ObservationImage.create(
                        {
                            observationId: observation.id,
                            imagePath: img.uploaded.imagePath,
                            thumbnailPath: img.uploaded.thumbnailPath || null,
                            iconPath: img.uploaded.iconPath || null,
                            mimeType: img.file.mimetype,
                        },
                        { transaction: t }
                    );
                }

                logger.app.info({
                    createdBy,
                    count: files.length,
                    message: 'All files uploaded to MinIO'
                });
            }

            const createdObservation = await Observation.findByPk(observation.id, {
                include: [
                    {
                        model: ObservationImage,
                        as: 'ObservationImages',
                        attributes: ['publicId', 'imagePath', 'thumbnailPath','iconPath', 'mimeType']
                    },
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['publicId']
                    },
                    {
                        model: Species,
                        as: 'species',
                        attributes: ['publicId', 'name', 'scientificName'],
                        include: [
                            {
                                model: EcosystemSpecificType,
                                as: 'ecosystemSpecificType',
                                attributes: ['name'],
                                include: [
                                    {
                                        model: EcosystemTertiaryType,
                                        as: 'ecosystemTertiaryType',
                                        attributes: ['name', 'ecosystemPrimaryType', 'ecosystemSecondaryType']
                                    }
                                ]
                            }
                        ]
                    }
                ],
                transaction: t
            });

            await t.commit(); // commit transaction
            logger.app.info({
                createdBy,
                observationId: observation.id,
                message: 'Transaction committed successfully'
            })
            const obs = createdObservation.toJSON();

            const ecosystemSpecific = obs.species?.ecosystemSpecificType;
            const tertiary = ecosystemSpecific?.ecosystemTertiaryType;
            // JSON map
            const formatted = {
                publicId: obs.publicId,
                observation: {
                    kingdomGroup: obs.kingdomGroup,
                    description: obs.description,
                    observedAt: obs.observedAt,
                    status: obs.status
                },
                location: {
                    name: obs.locationName,
                    coordinates: {
                        latitude: obs.latitude,
                        longitude: obs.longitude
                    }
                },
                species: obs.species ? {
                    publicId: obs.species.publicId,
                    commonName: obs.species.name,
                    ecosystem: tertiary ? {
                        primaryType: tertiary.ecosystemPrimaryType,
                        secondaryType: tertiary.ecosystemSecondaryType,
                        tertiaryType: tertiary.name,
                        specificType: ecosystemSpecific.name
                    } : null
                } : null,
                observer: obs.creator ? {
                    publicId: obs.creator.publicId,
                    // username: obs.creator.username
                } : null,
                images: obs.ObservationImages?.map(img => ({
                    publicId: img.publicId,
                    imageUrl: img.imagePath,
                    thumbnailUrl: img.thumbnailPath || null,
                    iconPath: img.iconPath || null,
                    mimeType: img.mimeType
                })) || [],
                timestamps: {
                    createdAt: obs.createdAt
                }
            };

            return formatted;

        } catch (error) {
            console.error('CreateObservation ERROR:', error);
            // Only rollback if transaction actually started
            if (t) {
                try {
                    await t.rollback();
                    logger.app.warn({
                        createdBy,
                        message: 'Transaction rolled back due to error'
                    });
                } catch (rollbackError) {
                    logger.app.error({
                        createdBy,
                        error: rollbackError.message,
                        stack: rollbackError.stack,
                        message: 'Rollback failed'
                    });
                    console.error('Rollback failed:', rollbackError);
                }
            }
            throw error;
        }
    }
}
module.exports = new ObservationService();