'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {
        const { v4: uuidv4 } = await import('uuid');
        const observations = [
            {
                public_id: uuidv4(),
                species_id: 1,
                proposed_species_id: null,
                kingdom_group: 'Animalia',
                description: 'Saw a colorful bird near the river.',
                observed_at: new Date('2026-02-12T08:30:00'),
                latitude: 14.6789012,
                longitude: 120.9876543,
                location_name: 'Riverside Park, Central Luzon',
                confidence_level: 'High',
                created_by: 1,
                status: 'Verified',
                created_at: new Date(),
            },
            {
                public_id: uuidv4(),
                species_id: 2,
                proposed_species_id: 3,
                kingdom_group: 'Plantae',
                description: 'Observed a rare flowering tree.',
                observed_at: new Date('2026-02-11T15:20:00'),
                latitude: 13.1234567,
                longitude: 121.2345678,
                location_name: 'Mountain Trail, Calabarzon',
                confidence_level: 'Medium',
                created_by: 2,
                status: 'Pending',
                created_at: new Date(),
            },
            {
                public_id: uuidv4(),
                species_id: 3,
                proposed_species_id: null,
                kingdom_group: 'Fungi',
                description: 'Spotted mushrooms growing in damp soil.',
                observed_at: new Date('2026-02-10T10:00:00'),
                latitude: 12.3456789,
                longitude: 120.4567890,
                location_name: 'Forest Reserve, Bicol Region',
                confidence_level: 'Low',
                created_by: 3,
                status: 'Rejected',
                created_at: new Date(),
            },
        ];

        await queryInterface.bulkInsert('observations', observations);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('observations', null, {});
    },
};
