'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_permissions', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            roleId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                field: 'role_id',
            },
            permissionId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                field: 'permission_id'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'updated_at'
            }
        });

        // Explicit foreign key constraints with custom names
        await queryInterface.addConstraint('role_permissions', {
            fields: ['role_id'],
            type: 'foreign key',
            name: 'FK_role_permissions_role',
            references: {
                table: 'roles',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('role_permissions', {
            fields: ['permission_id'],
            type: 'foreign key',
            name: 'FK_role_permissions_permission',
            references: {
                table: 'permissions',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove constraints first before dropping table
        await queryInterface.removeConstraint('role_permissions', 'FK_role_permissions_role');
        await queryInterface.removeConstraint('role_permissions', 'FK_role_permissions_permission');
        await queryInterface.dropTable('role_permissions');
    }
};
