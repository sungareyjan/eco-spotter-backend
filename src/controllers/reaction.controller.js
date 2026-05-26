const { status } = require('init');
const ReactionService =  require('../services/reaction.service');

class ReactionController{

    async getReaction(req, res, next){
        let { page, limit } = req.query;
        // page  = parseInt(page, 10);
        // limit = parseInt(limit, 10);
        // if (isNaN(page) || page < 1) page = 1;
        // if (isNaN(limit) || limit < 1) limit = 10;

        try {
            const { publicId } = req.params;
            console.log(publicId)
            const reaction = await ReactionService.getReaction({
                observationId: publicId,
                page: Number(page) || 1,
                limit: Number(limit) || 10,
            });

            return res.status(200).json({
                status: 'success',
                code  : 200,
                data  : reaction.data,
                pagination :reaction.pagination
            })

        }catch(error){
            next(error);
        }

    }

    async createReaction(req, res, next){
        try {
            const  reaction = await ReactionService.createReaction(req.body);

            return res.status(200).json({
                status:'success',
                code:200,
                data: reaction,
            })

        }catch(error){
            next(error);
        }
    }

}

module.exports = new ReactionController();