'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('roles', {
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
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            },
            display_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
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
        await queryInterface.dropTable('roles');
    }
};
