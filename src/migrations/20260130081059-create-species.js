    'use strict';

    module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('species', {
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

        name: {
            type: Sequelize.STRING(20), // NVARCHAR(20)
            allowNull: true,
        },

        scientific_name: {
            type: Sequelize.STRING(255), // NVARCHAR(255)
            allowNull: false,
        },

        ecosystem_specific_type_id: {
            type: Sequelize.BIGINT,
            allowNull: true,
            // FK can be added later
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('species');
    },
    };
