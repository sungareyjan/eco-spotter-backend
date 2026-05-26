const { Comment, Observation, User ,UserProfile } = require('../models');

class CommentService{

    async getCommentsByObservation(publicId) {

        const observation = await Observation.findOne({
            where: { public_id: publicId },
            attributes: ['id'],
            raw: true
        });

        if (!observation) {
            throw new Error('Observation not found');
        }

        const comments = await Comment.findAll({
            where: {
                observationId: observation.id,
            },

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

            order: [['createdAt', 'DESC']]
        });

        return comments;
    }
    async createComments(payload){


        const observation = await Observation.findOne({
            where: {
                publicId: payload.observationId
            }
        });

        const user = await User.findOne({
            where: {
                publicId: payload.userId
            }
        });

        if (!observation) {
            throw new Error('Observation not found');
        }

        if (!user) {
            throw new Error('User not found');
        }

        const comment = await Comment.create({
            observationId: observation.id,
            userId: user.id,
            content: payload.content,
            isExpertComment: payload.isExpertComment || false
        });

        return comment;
    }
}

module.exports = new CommentService();