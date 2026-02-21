const EcosystemSecondaryTypeService = require('../../services/ecosystem/ecosystem-secondary-type.service');

class EcosystemSecondaryTypeController{

    async getEcosystemSecondaryType(req, res, next){
        try{
            const result = await EcosystemSecondaryTypeService.getAll();

            res.status(200).json({
                status: 'success',
                code  : 200,
                data  : result
            });
        }catch(error){
            next(error);
        }
    }

}

module.exports = new EcosystemSecondaryTypeController();