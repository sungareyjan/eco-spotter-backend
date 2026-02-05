'use strict';

module.exports = {
    async up(queryInterface) {
        // Get the first 4 users
        const users = await queryInterface.sequelize.query(
            `SELECT TOP (4) id FROM users ORDER BY id`,
            {
                type: queryInterface.sequelize.QueryTypes.SELECT,
            }
        );

        if (!users.length) return;

        // Create profiles for each user
        const profilesToInsert = users.map((user, index) => {
            const bios = [
                'Nature enthusiast, loves birds',
                'Botany student and tree lover',
                'Passionate about wildlife photography',
                'Passionate about wildlife photography',
            ];

            const regions = [
                'Central Luzon',
                'Calabarzon',
                'Bicol Region',
                'Bicol Region',
            ];

            const pictures = [
                'https://ecospotter.com/app/avatar1.png',
                'https://ecospotter.com/app/avatar2.png',
                'https://ecospotter.com/app/avatar3.png',
                'https://ecospotter.com/app/avatar4.png',
            ];

            const firstName = [
                'Admin',
                'Juan',
                'Pedro',
                'Maria',
            ];

            const lastName = [
                'Admin',
                'Dela cruz',
                'Penduko',
                'Clara',
            ];

            return {
                user_id            : user.id,
                first_name         : firstName[index],
                last_name          : lastName[index],
                bio                : bios[index] || 'Nature enthusiast',
                home_region        : regions[index] || 'Central Luzon',
                profile_picture_url: pictures[index] || 'https://ecospotter.com/app/default.png',
                created_at         : new Date(),
                updated_at         : new Date(),
            };
        });

        await queryInterface.bulkInsert('user_profiles', profilesToInsert);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user_profiles', null, {});
    },
};
