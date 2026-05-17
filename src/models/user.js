'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'suspended', 'deleted'),
            allowNull: false,
            defaultValue: 'active',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false,
            field: 'is_verified',
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at'
        }
    }, {
        tableName: 'users',
        underscored: true,
        timestamps: true,
        paranoid: false // enables soft deletes using deletedAt
    });

    User.associate = models => {
        User.hasMany(models.RoleUser, { as: 'role_users', foreignKey: 'userId' });
        User.hasOne(models.UserProfile, { foreignKey: 'userId', as: 'profile' });
        User.hasMany(models.Observation,{foreignKey:'createdBy', as:'observation'});
        User.hasMany(models.Comment, {foreignKey: 'userId', as: 'comments'});
    };

    return User;
};
