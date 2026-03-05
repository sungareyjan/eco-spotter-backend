const { Observation, User, ObservationImage, Species, EcosystemSpecificType, EcosystemTertiaryType, EcosystemSecondaryType, EcosystemPrimaryType } = require('../models');

/**
 * Get observation with optional search and pagination
 * @param {Object} options
 * @param {string} options.search - search term for species name or scientificName
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
            include: [{
                model: ObservationImage,
                as: 'ObservationImages',
                required: false,
                attributes: [
                    'publicId',
                    'imagePath',
                    'thumbnailPath',
                    'mimeType',
                ]
            }, {
                model: User,
                as: 'creator',
                required: false,
                attributes: [
                    'publicId',
                    'username',
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
                        username: obs.creator.username
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
}

module.exports = new ObservationService();