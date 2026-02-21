'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('observations', {

            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            public_id: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                unique: true,
            },

            species_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },

            proposed_species_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },

            kingdom_group: {
                type: Sequelize.STRING(50), // NVARCHAR(50)
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            observed_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            latitude: {
                type: Sequelize.DECIMAL(10, 7),
                allowNull: false,
            },

            longitude: {
                type: Sequelize.DECIMAL(10, 7),
                allowNull: false,
            },

            location_name: {
                type: Sequelize.STRING(255), // NVARCHAR(255)
                allowNull: true,
            },

            confidence_level: {
                type: Sequelize.ENUM('Low', 'Medium', 'High'),
                allowNull: false,
                defaultValue: 'Low',
            },

            created_by: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },

            status: {
                type: Sequelize.ENUM('Pending', 'Verified', 'Rejected'),
                allowNull: false,
                defaultValue: 'Pending',
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
        await queryInterface.dropTable('observations');
    },
};
