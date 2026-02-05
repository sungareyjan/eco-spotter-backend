'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('role_users', [
            {
                role_id: 1, // Admin
                user_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                role_id: 2, // advance
                user_id: 4,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                role_id: 3, // intermediate
                user_id: 3,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                role_id: 4, // casual
                user_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_users', null, {});
    },
};
