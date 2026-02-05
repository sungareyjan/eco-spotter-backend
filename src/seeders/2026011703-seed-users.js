'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordPlain = 'password123'; // default password for seeding
        const passwordHash = await bcrypt.hash(passwordPlain, 10);

        const users = [
            {
                username     : 'admin',
                email        : 'admin@gmail.com',
            },
            {
                username     : 'juan_dela_cruz',
                email        : 'juandelacruz@gmail.com',
            },
            {
                username     : 'pedro',
                email        : 'pedro@gmail.com',
            },
            {
                username     : 'maria',
                email        : 'maria@gmail.com',
            }
        ];

        // Map users to DB format
        const usersToInsert = users.map(user => ({
            public_id     : uuidv4(),
            username      : user.username,
            email         : user.email,
            password      : passwordHash,
            deleted_at    : null,
            created_at    : new Date(),
            updated_at    : new Date()
        }));

        await queryInterface.bulkInsert('users', usersToInsert);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
