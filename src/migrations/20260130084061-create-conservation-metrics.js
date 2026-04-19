'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('conservation_metrics', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            metric_name : {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },

            metric_value : {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
            },
        });

    },

    async down(queryInterface) {
        await queryInterface.dropTable('conservation_metrics');
    }
};