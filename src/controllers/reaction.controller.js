const { status } = require('init');
const ReactionService =  require('../services/reaction.service');

class ReactionController{

    async getReaction(req, res, next){
        let { page, limit } = req.query;
        try {
            const { publicId } = req.params;

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