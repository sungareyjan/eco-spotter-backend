'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        publicId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, field: 'public_id', allowNull: false, unique: true },
        name: { type: DataTypes.STRING },
        displayName: { type: DataTypes.STRING, field: 'display_name' },
        description: { type: DataTypes.STRING }
    }, {
        tableName: 'roles',
        underscored: true,
        timestamps: true
    });

    Role.associate = models => {
        Role.hasMany(models.RolePermission, { as: 'role_permissions', foreignKey: 'role_id' });
        Role.hasMany(models.RoleUser, { as: 'role_users', foreignKey: 'role_id' });
    };

    return Role;
};
