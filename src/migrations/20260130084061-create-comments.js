'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comments', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            public_id: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: true
            },
            observation_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'observations',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            is_expert_comment: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        await queryInterface.dropTable('comments');
    }
};