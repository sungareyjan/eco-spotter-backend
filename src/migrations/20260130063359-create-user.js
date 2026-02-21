'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            public_id: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: true
            },
            username: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('active', 'suspended', 'deleted'),
                allowNull: false,
                defaultValue: 'active'
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};
