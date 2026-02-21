const EcosystemSpecificTypeService = require('../../services/ecosystem/ecosystem-specific-type.service');

class EcosystemSpecificTypeController{

    async getEcosystemSpecificTypes(req,res){
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const ecosystemSubtypes = await EcosystemSpecificTypeService.getAll({
            search,
            page,
            limit
        });
        res.status(200).json({
            status: 'success',
            code  : 200,
            data  : ecosystemSubtypes.data,
            pagination  : ecosystemSubtypes.pagination
        }
        );
    }

}

module.exports = new EcosystemSpecificTypeController();