const CommentService = require('../services/comment.service');
class commentController{

    async getCommentsByObservation(req,res,next) {
        try {

            const { publicId } = req.params;
            const comment = await CommentService.getCommentsByObservation(publicId);

            return res.status(200).json({
                status: 'success',
                code: 200,
                data: comment
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