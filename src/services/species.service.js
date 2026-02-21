const { Species, EcosystemPrimaryType, EcosystemTertiaryType, EcosystemSpecificType, EcosystemSecondaryType } = require('../models');
class SpeciesService {

    /**
     * Get all species with optional search and pagination
     * @param {Object} options
     * @param {string} options.search - search term for species name or scientificName
     * @param {number} options.page - page number (1- indexed)
     * @param {number} options.limit - items per page
     */

    async getAll({ search = '', page = 1, limit = 10 } = {}) {
        page = page && page > 0 ? page : 1;
        limit = limit && limit > 0 ? limit : 10;
        const offset = (page - 1) * limit;
        const where = {};

        //  Op = Operator ex(Op.or, Op.like for search)
        if (search) {
            const { Op } = require('sequelize');
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { scientificName: { [Op.like]: `%${search}%` } },
            ];
        }
        const { rows, count } = await Species.findAndCountAll({
            where,
            distinct: true,
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
                    ],
                    include: [{
                        model: EcosystemSecondaryType,
                        as: 'ecosystemSecondaryType',
                        attributes: [
                            'publicId',
                            'name',
                        ],
                        include: [{
                            model: EcosystemPrimaryType,
                            as: 'ecosystemPrimaryType'
                        }]
                    }]
                }]
            }],
            offset,
            limit,
            order: [['name', 'ASC']]
        });

        const data = rows.map(species => ({
            speciesId: species.publicId,
            name: species.name,
            scientificName: species.scientificName,
            subtypeId: species.ecosystemSpecificType?.publicId,
            ecosystems: [{
                subtypeName: species.ecosystemSpecificType?.name,
                subtypeCharacteristics: species.ecosystemSpecificType?.keyCharacteristics,

                specificTypeId: species.ecosystemSpecificType?.ecosystemTertiaryType?.publicId,
                specificTypeName: species.ecosystemSpecificType?.ecosystemTertiaryType?.name,
                tertiaryTypeCharacteristic: species.ecosystemSpecificType?.ecosystemTertiaryType?.keyCharacteristics,

                secondaryTypeId: species.ecosystemSpecificType?.ecosystemTertiaryType?.ecosystemSecondaryType?.publicId,
                secondaryType: species.ecosystemSpecificType?.ecosystemTertiaryType?.ecosystemSecondaryType?.name,

                primaryType: species.ecosystemSpecificType?.ecosystemTertiaryType?.ecosystemSecondaryType?.ecosystemPrimaryType?.name,

            }]

        }))

        return { data, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } }
    }
}

module.exports = new SpeciesService();