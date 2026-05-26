'use strict';

module.exports = (sequelize, DataTypes) => {

    const Reaction = sequelize.define(
        'Reaction',
        {

            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            publicId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: 'public_id',
                allowNull: false,
                unique: true
            },

            observationId: {
                type: DataTypes.BIGINT,
                field: 'observation_id',
                allowNull: false
            },

            userId: {
                type: DataTypes.BIGINT,
                field: 'user_id',
                allowNull: false
            },

            reactionType: {
                type: DataTypes.ENUM(
                    'like',
                    'helpful',
                    'verified',
                    'concern',
                    'resolved',
                    'important'
                ),

                field: 'reaction_type',

                allowNull: false
            }

        },
        {

            tableName: 'reactions',
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    Reaction.associate = models => {
        Reaction.belongsTo(models.User, { foreignKey: 'userId',as: 'user'});
        Reaction.belongsTo(models.Observation, { foreignKey: 'observationId', as: 'observation'});
    };

    return Reaction;
};