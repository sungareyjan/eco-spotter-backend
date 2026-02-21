const EcosystemPrimaryTypeService = require('../../services/ecosystem/ecosystem-primary-type.service');

class EcosystemPrimaryTypeController{

    async getEcosystemPrimaryType(req, res, next){
        try{
            const result = await EcosystemPrimaryTypeService.getAll();

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

module.exports = new EcosystemPrimaryTypeController();