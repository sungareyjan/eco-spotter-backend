'use strict';

module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
        model: 'users',
        key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },

    bio: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

    home_region: {
        type: Sequelize.STRING(150),
        allowNull: true,
    },

    profile_picture_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },

    created_at: {
        allowNull: false,
        type: Sequelize.DATE,
    },

    updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    });
},

async down(queryInterface) {
    await queryInterface.dropTable('user_profiles');
},
};
