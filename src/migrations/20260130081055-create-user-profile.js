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
            gender: {
                type: Sequelize.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
                allowNull: true
            },
            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: true
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
