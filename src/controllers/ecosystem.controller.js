const EcosystemService = require('../services/ecosystem.service');

class EcosystemController{

    async getEcosystemPrimaryType(req, res, next){
        try{
            const result = await EcosystemService.getPrimaryType();

            res.status(200).json({
                status: 'success',
                code  : 200,
                data  : result
            });
        }catch(error){
            next(error);
        }
    }

    async getEcosystemSecondaryType(req, res, next){
        try{
            const result = await EcosystemService.getSecondaryTypes(req.params.primary);
            res.status(200).json({
                status: 'success',
                code  : 200,
                data  : result
            });
        }catch(error){
            next(error);
        }
    }

    async getEcosystemTertiaryTypes(req, res, next) {
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const { secondary } = req.params;
        const result = await EcosystemService.getTertiaryTypes({secondary,
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

    async getEcosystemSpecificTypes(req,res){
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const ecosystemSubtypes = await EcosystemSpecificTypeService.getEcosystemSpecificTypes({
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

    async getEcosystemSpecificTypes(req,res){
        let { search, page, limit } = req.query;
        page  = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const ecosystemSubtypes = await EcosystemService.getSpecificTypes({
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

module.exports = new EcosystemController();