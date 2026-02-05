'use strict';

module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        roleId: { type: DataTypes.BIGINT, field: 'role_id' },
        permissionId: { type: DataTypes.BIGINT, field: 'permission_id' }
    }, {
        tableName: 'role_permissions',
        underscored: true,
        timestamps: true
    });

    RolePermission.associate = models => {
        RolePermission.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
        RolePermission.belongsTo(models.Permission, { as: 'permission', foreignKey: 'permission_id' });
    };

    return RolePermission;
};
