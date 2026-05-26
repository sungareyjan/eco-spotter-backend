const { Model } = require('sequelize');
const { fn, col } = require('sequelize');
const {Reaction, Observation, User, UserProfile , Profile } = require('../models');

class ReactionService{

    async getReaction({observationId,page=1, limit= 10 }= {}) {

        page = page && page > 0 ? page : 1;
        limit = limit && limit > 0 ? limit : 10;
        const offset = (page - 1) * limit;
        const where = {};

        const observation = await Observation.findOne({
            where: {
                publicId: observationId
            },
            attributes: ['id'],

        });
        if (!observation) {
            throw new Error('Observation not found');
        }
        const { rows, count } = await Reaction.findAndCountAll({
            where: {
                observationId: observation.id
            },
            distinct: true,
            attributes:['publicId','reactionType'],
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
            order: [['created_at', 'ASC']]
        });
        const data =rows;
        return { data, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } }

    }

    async createReaction(payload) {

        const observation =  await Observation.findOne({
                where: {
                    publicId: payload.observationId
                },
                attributes: ['id']
            });

        const user = await User.findOne({
                where: {
                    publicId: payload.userId
                },
                attributes: ['id']
            })

        if (!observation) {
            throw new Error('Observation not found');
        }

        if (!user) {
            throw new Error('User not found');
        }

        await Reaction.findOrCreate({
            where: {
                observationId: observation.id,
                userId: user.id
            },

            defaults: {
                reactionType: payload.reactionType,
            }
        });

        const [totalReaction, currentUserReaction] = await Promise.all([
            Reaction.count({
                where: {
                    observationId: observation.id
                }
            }),

            Reaction.findOne({
                where: {
                    observationId: observation.id,
                    userId: user.id
                },
                attributes: ['publicId'],
                raw: true
            })
        ]);
        return {
            observation: {
                publicId: payload.observationId,
                totalReaction,
                currentUserReaction
            }
        };
    }
}

module.exports = new ReactionService();