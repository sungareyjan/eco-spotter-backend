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
    username: {
    type: DataTypes.STRING(100),
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
    gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: true
    },
    birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true
    },
    status: {
    type: DataTypes.ENUM('active', 'suspended', 'deleted'),
    allowNull: false,
    defaultValue: 'active'
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
    paranoid: true // enables soft deletes using deletedAt
});

User.associate = models => {
    User.hasMany(models.RoleUser, { as: 'role_users', foreignKey: 'user_id' });
    User.hasOne(models.UserProfile, { foreignKey: 'user_id', as: 'profile' });
};

return User;
};
