'use strict';

module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true },
        name: {
            type: DataTypes.STRING
        },
        displayName: {
            type: DataTypes.STRING,
            field: 'display_name'
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'permissions',
        underscored: true,
        timestamps: true
    });

    Permission.associate = models => {
        Permission.hasMany(models.RolePermission, { as: 'role_permissions', foreignKey: 'permission_id' });
    };

    return Permission;
};
