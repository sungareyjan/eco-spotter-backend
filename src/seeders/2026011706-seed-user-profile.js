'use strict';

module.exports = {
    async up(queryInterface) {
        const users = await queryInterface.sequelize.query(
            `SELECT TOP (4) id FROM users ORDER BY id`,
            {
                type: queryInterface.sequelize.QueryTypes.SELECT,
            }
        );

        if (!users.length) return;

        const profilesToInsert = users.map((user, index) => {
            const firstNames = ['Admin', 'Juan', 'Pedro', 'Maria'];
            const middleNames = [null, 'Santos', null, 'Reyes'];
            const lastNames = ['Admin', 'Dela Cruz', 'Penduko', 'Clara'];
            const extensionNames = [null, null, 'Jr.', null];

            const birthdays = [
                '1990-01-15',
                '1995-06-20',
                '1993-09-10',
                '1998-12-05',
            ];

            const genders = ['Male', 'Male', 'Male', 'Female'];

            const bios = [
                'Nature enthusiast, loves birds',
                'Botany student and tree lover',
                'Passionate about wildlife photography',
                'Marine biodiversity advocate',
            ];

            const regions = [
                'Central Luzon',
                'Calabarzon',
                'Bicol Region',
                'Ilocos Region',
            ];

            const pictures = [
                'https://ecospotter.com/app/avatar1.png',
                'https://ecospotter.com/app/avatar2.png',
                'https://ecospotter.com/app/avatar3.png',
                'https://ecospotter.com/app/avatar4.png',
            ];

            return {
                user_id: user.id,
                first_name: firstNames[index],
                middle_name: middleNames[index],     // some null
                last_name: lastNames[index],
                extension_name: extensionNames[index], // some null
                birthday: birthdays[index],
                gender: genders[index],
                bio: bios[index],
                home_region: regions[index],
                profile_picture_url: pictures[index],
                created_at: new Date(),
                updated_at: new Date(),
            };
        });

        await queryInterface.bulkInsert('user_profiles', profilesToInsert);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user_profiles', null, {});
    },
};
