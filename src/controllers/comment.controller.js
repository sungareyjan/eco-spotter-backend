const CommentService = require('../services/comment.service');
class commentController{

    async getCommentsByObservation(req,res,next) {
        let { page, limit } = req.query;
        try {
            const { publicId } = req.params;

            const comment = await CommentService.getCommentsByObservation({
                    publicId: publicId,
                    page: Number(page) || 1,
                    limit: Number(limit) || 10,
                });

            return res.status(200).json({
                status: 'success',
                code: 200,
                data: comment.data,
                pagination:comment.pagination
            });

        } catch (error) {
            next(error);
        }
    }
    async createComments(req,res,next){
        const comment =  await CommentService.createComments(req.body);
        return  res.status(200).json({
            status:'success',
            code:200,
            data:comment,
        })
    }

}

module.exports = new commentController();