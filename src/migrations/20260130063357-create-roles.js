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
    displayName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: 'display_name'
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
    }
    });
},

async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
}
};
