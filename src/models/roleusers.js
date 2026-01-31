'use strict';

module.exports = (sequelize, DataTypes) => {
const RoleUser = sequelize.define('RoleUser', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.BIGINT, field: 'user_id' },
    roleId: { type: DataTypes.BIGINT, field: 'role_id' }
}, {
    tableName: 'role_users',
    underscored: true,
    timestamps: true
});

RoleUser.associate = models => {
    RoleUser.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    RoleUser.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
};

return RoleUser;
};
