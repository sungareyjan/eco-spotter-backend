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
        type: Sequelize.CHAR(36),
        allowNull: false,
        unique: true,
    },

    ecosystem_secondary_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        // Foreign key can be added later:
        // references: { model: 'ecosystem_type', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL',
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
