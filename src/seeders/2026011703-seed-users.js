'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordPlain = 'password123'; // default password for seeding
        const passwordHash = await bcrypt.hash(passwordPlain, 10);

        const users = [
            {
                firstName: 'Juan',
                middleName: 'Juan',
                lastName: 'Dela Cruz',
                extensionName: null,
                username: 'juan_dela_cruz',
                email: 'juandelacruz@gmail.com',
                gender: 'male',
                birthday: '1990-05-15',
                status: 'active'
            },
            {
                firstName: 'Pedro',
                middleName: 'Abad',
                lastName: 'Santos',
                extensionName: null,
                username: 'pedro',
                email: 'pedro@gmail.com',
                gender: 'male',
                birthday: '1985-10-20',
                status: 'active'
            },
            {
                firstName: 'Maria Clara',
                middleName: 'de los',
                lastName: 'Santos',
                extensionName: null,
                username: 'maria',
                email: 'maria@gmail.com',
                gender: 'female',
                birthday: '1992-07-12',
                status: 'active'
            }
        ];

        // Map users to DB format
        const usersToInsert = users.map(user => ({
            public_id: uuidv4(),
            first_name: user.firstName,
            middle_name: user.middleName,
            last_name: user.lastName,
            extension_name: user.extensionName,
            username: user.username,
            email: user.email,
            password: passwordHash,
            gender: user.gender,
            birthday: user.birthday,
            status: user.status,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date()
        }));

        await queryInterface.bulkInsert('users', usersToInsert);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
