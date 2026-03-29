'use strict';

module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ecosystem_tertiary_types', {

    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },

    public_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.literal('NEWID()'),
    },

    ecosystem_primary_type:{
        type:Sequelize.STRING(250),
        allowNull: false,
    },

    ecosystem_secondary_type:{
        type:Sequelize.STRING(250),
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING(250), // NVARCHAR(150)
        allowNull: false,
    },

    key_characteristics: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('ecosystem_tertiary_types');
},
};
