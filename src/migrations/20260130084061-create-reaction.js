'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('reactions', {

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


            reaction_type: {
                type: Sequelize.STRING(20),
                allowNull: false
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

        // Prevent duplicate reactions
        await queryInterface.addIndex(
            'reactions',
            [
                'observation_id',
                'user_id',
                'reaction_type'
            ],
            {
                unique: true,
                name: 'uq_reactions_user'
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('reactions');
    }
};