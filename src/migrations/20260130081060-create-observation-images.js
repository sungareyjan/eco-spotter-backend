'use strict';

module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('observation_images', {

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

    observation_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        // FK can be added later:
        // references: { model: 'observations', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
    },

    image_path: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },

    thumbnail_path: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },

    mime_type: {
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('observation_images');
},
};
