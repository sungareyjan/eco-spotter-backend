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
    publicId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'public_id',
        unique: true
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'first_name'
    },
    middleName: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'middle_name'
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'last_name'
    },
    extensionName: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'extension_name'
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
    gender: {
        type: Sequelize.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
        allowNull: true
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM('active', 'suspended', 'deleted'),
        allowNull: false,
        defaultValue: 'active'
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at'
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
},

async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
}
};
