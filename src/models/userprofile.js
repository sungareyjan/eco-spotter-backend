'use strict';

module.exports = (sequelize, DataTypes) => {
const UserProfile = sequelize.define(
    'UserProfile',
    {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: DataTypes.BIGINT,
        field: 'user_id',
        allowNull: false,
        unique: true,
    },

    bio: {
        type: DataTypes.TEXT,
    },

    homeRegion: {
        type: DataTypes.STRING,
        field: 'home_region',
    },

    profilePictureUrl: {
        type: DataTypes.STRING,
        field: 'profile_picture_url',
    },
    },
    {
    tableName: 'user_profiles',
    underscored: true,
    timestamps: true,
    }
);

UserProfile.associate = models => {
    UserProfile.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
};

return UserProfile;
};
