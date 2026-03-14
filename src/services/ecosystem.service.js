const { EcosystemSpecificType, EcosystemTertiaryType} = require('../models');
const {SECONDARY_TYPES,HABITAT_VALUES} = require('../constants/ecosystem.constants');
const { Op } = require('sequelize');

class EcosystemService{

    async getPrimaryType(){
        return  HABITAT_VALUES;
    }

    async getSecondaryTypes(primaryTypeKey){
        return await SECONDARY_TYPES[primaryTypeKey] || [];
    }

    /**
     * Get all tertiary type with optional search and pagination
     * @param {Object} options
     * @param {string} options.search - search term for species name or scientificName
     * @param {number} options.page - page number (1- indexed)
     * @param {number} options.limit - items per page
     */

    async getTertiaryTypes({secondary, search = '', page = 1, limit = 10 } = {}){
        page = page > 0 ? page : 1;
        limit = limit > 0 ? limit : 10;
        const offset = (page - 1) * limit;

        const where = {};

        if (search) {
            where[Op.or] = [
                {ecosystemSecodaryType:secondary}, // where ecosystemSecondaryType = "Forest"
                { name: { [Op.like]: `%${search}%` } },
                { scientificName: { [Op.like]: `%${search}%` } }
            ];
        }

        const { rows, count } = await EcosystemTertiaryType.findAndCountAll({
            where,
            attributes: [
                'publicId',
                'name',
                'keyCharacteristics',
                'ecosystemPrimaryType',
                'ecosystemSecondaryType',
            ],
            offset,
            limit,
            order: [['name', 'ASC']]
        });

        // Map to JSON format for API
        const data = rows.map(item =>({
            publicId: item.publicId,
            name: item.name,
            characteristics: item.keyCharacteristics,
            ecosystemPrimaryType: item.ecosystemPrimaryType,
            ecosystemSecondayType: item.ecosystemSecondaryType,
        }));

        return {
            status: 'success',
            code: 200,
            data,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Get all specific type with optional search and pagination
     * @param {Object} options
     * @param {string} options.search - search term for species name or scientificName
     * @param {number} options.page - page number (1- indexed)
     * @param {number} options.limit - items per page
     */
    async getSpecificTypes({ search = '', page = 1, limit = 10 } = {}) {
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
                    'ecosystemPrimaryType',
                    'ecosystemSecondaryType',
                ],
            }],
            offset,
            limit,
            order: [['name', 'ASC']]
        });

        const data = rows.map(specificType => ({
            subtypeId: specificType.publicId,
            name: specificType.name,
            characteristics: specificType.keyCharacteristics,

            ecosystemPrimaryType: specificType.ecosystemTertiaryType?.ecosystemPrimaryType,
            ecosystemSecondaryType: specificType.ecosystemTertiaryType?.ecosystemSecondaryType,
            ecosystemTertiaryTypeId: specificType.ecosystemTertiaryType?.publicId,
            ecosystemTertiaryType: specificType.ecosystemTertiaryType?.name,
            ecosystemTertiaryCharacteristics: specificType.ecosystemTertiaryType?.keyCharacteristics,

        }))

        return { data, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } }
    }

}

module.exports = new EcosystemService();