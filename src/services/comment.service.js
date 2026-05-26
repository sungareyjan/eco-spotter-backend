const { Comment, Observation, User ,UserProfile } = require('../models');

class CommentService{

    async getCommentsByObservation({publicId, page=1, limit=10 }={}) {

        page = page && page > 0 ? page : 1;
        limit = limit && limit > 0 ? limit : 10;
        const offset = (page - 1) * limit;
        const where = {};

        const observation = await Observation.findOne({
            where: { public_id: publicId },
            attributes: ['id'],
            raw: true
        });

        if (!observation) {
            throw new Error('Observation not found');
        }

        const { rows, count } = await Comment.findAndCountAll({
            where: {
                observationId: observation.id,
            },
            distinct: true,
            attributes: [
                'publicId',
                'content',
                'isExpertComment',
                'updatedAt',
                'createdAt',
            ],

            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['publicId'],
                    include: [{
                        model     : UserProfile,
                        as        : 'profile',
                        required  : false,
                        attributes: [
                            'profilePictureUrl',
                            'firstName',
                            'middleName',
                            'lastName',
                        ]
                    }]
                }
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });
        const data = rows;
        return { data, pagination: {total: count, page, limit, totalPages: Math.ceil(count / limit)} };
    }
    async createComments(payload){
        const { observationId, content, userId, isExpertComment = false } = payload;

        if (!observationId || !content) {
            const error = new Error('observationId and content are required');
            error.statusCode = 400;
            throw error;
        }
        const observation = await Observation.findOne({
            where: {
                publicId: observationId
            },
            attributes: ['id']
        });

        const user = await User.findOne({
            where: {
                publicId: userId
            },
            attributes: ['id']
        });

        if (!observation) {
            const error = new Error('Observation not found');
            error.statusCode = 404;
            throw error;
        }

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const comment = await Comment.create({
            observationId: observation.id,
            userId: user.id,
            content: payload.content,
            isExpertComment: payload.isExpertComment || false
        });

        return {
            publicId: comment.publicId,
            content: comment.content,
            isExpertComment: comment.isExpertComment,
            createdAt: comment.createdAt,
            observation: {
                publicId: observationId
            },
            user: {
                publicId: userId
            }
        };
    }
}

module.exports = new CommentService();