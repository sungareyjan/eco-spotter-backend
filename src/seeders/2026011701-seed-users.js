'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
        {
            username: 'juan_dela_cruz',
            email: 'juandelacruz@gmail.com',
            password: 'samplepassword',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: 'pedro',
            email: 'pendro@gmail.com',
            password: 'samplepassword',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};