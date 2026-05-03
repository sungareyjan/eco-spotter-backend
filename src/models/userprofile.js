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
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: 'first_name'
            },
            middleName: {
                type: DataTypes.STRING(50),
                allowNull: true,
                field: 'middle_name'
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: 'last_name'
            },
            extensionName: {
                type: DataTypes.STRING(50),
                allowNull: true,
                field: 'extension_name'
            },
            gender: {
                type: DataTypes.ENUM('Male', 'Female', 'Other', 'Prefer_not_to_say'),
                allowNull: true
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: true
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
        UserProfile.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    };

    return UserProfile;
};
