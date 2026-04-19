const DashBoardService = require('../services/dashboard.service');


class DashBoardController{

    async getConversationMetric(req,res,next){
        try{

            const result =  await DashBoardService.conservationMetric();

            res.status(200).json({
                status:'success',
                code:200,
                data: result
            });

        }catch(error){
            next(error);
        }

    }
}

module.exports = new DashBoardController();