'use strict';

module.exports = {
async up(queryInterface) {
    // Get the first 3 users
    const users = await queryInterface.sequelize.query(
    `SELECT TOP (3) id FROM users ORDER BY id`,
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
        'Passionate about wildlife photography'
    ];

    const regions = [
        'Central Luzon',
        'Calabarzon',
        'Bicol Region'
    ];

    const pictures = [
        'https://ecospotter.com/app/avatar1.png',
        'https://ecospotter.com/app/avatar2.png',
        'https://ecospotter.com/app/avatar3.png'
    ];

    return {
        user_id: user.id,
        bio: bios[index] || 'Nature enthusiast',
        home_region: regions[index] || 'Central Luzon',
        profile_picture_url: pictures[index] || 'https://ecospotter.com/app/default.png',
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
