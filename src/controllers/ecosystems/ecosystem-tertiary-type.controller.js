const EcosystemTertiaryTypeService = require('../../services/ecosystem/ecosystem-tertiary-type.service');

class EcosystemTertiaryTypeController{

    async getEcosystemTertiaryTypes(req, res, next) {
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const result = await EcosystemTertiaryTypeService.getAll({
            search,
            page,
            limit
        });
        res.status(200).json({
            status: 'success',
            code  : 200,
            data  : result.data,
            pagination  : result.pagination
        }
        );
    }

}

module.exports = new  EcosystemTertiaryTypeController();