const { EcosystemTertiaryType, EcosystemSecondaryType, EcosystemSpecificType } = require('../../models');

/**
 * Get all species with optional search and pagination
 * @param {Object} options
 * @param {string} options.search - search term for species name or scientificName
 * @param {number} options.page - page number (1- indexed)
 * @param {number} options.limit - items per page
 */

class EcosystemSpecificTypeService {
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

        const { rows, count } = await EcosystemSpecificType.findAndCountAll({
            where,
            distinct: true,
            attributes: [
                'publicId',
                'name',
                'keyCharacteristics',
                'exampleSpecies',
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
                        'name'
                    ]
                }]
            }],
            offset,
            limit,
            order: [['name', 'ASC']]
        });

        const data = rows.map(specificType => ({
            subtypeId: specificType.publicId,
            name: specificType.name,
            characteristics: specificType.keyCharacteristics,

            tertiaryTypeId: specificType.ecosystemTertiaryType?.publicId,
            tertiaryTypeName: specificType.ecosystemTertiaryType?.name,
            tertiaryCharacteristics: specificType.ecosystemTertiaryType?.keyCharacteristics,

            secondaryTypeId: specificType.ecosystemTertiaryType?.ecosystemSecondaryType?.publicId,
            secondaryTypeName: specificType.ecosystemTertiaryType?.ecosystemSecondaryType?.name,
        }))

        return { data, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } }
    }
}

module.exports = new EcosystemSpecificTypeService();