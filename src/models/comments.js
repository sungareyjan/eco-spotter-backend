'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
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

            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            isExpertComment: {
                type: DataTypes.BOOLEAN,
                field: 'is_expert_comment',
                defaultValue: false
            }
        },
        {
            tableName: 'comments',
            underscored: true,
            timestamps: true
        }
    );

    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
        Comment.belongsTo(models.Observation, {    foreignKey: 'observationId', as: 'observation' });
    };

    return Comment;
};