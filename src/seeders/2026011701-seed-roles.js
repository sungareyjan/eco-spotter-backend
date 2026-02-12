'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { v4: uuidv4 } = await import('uuid');

        const roles = [
            { name: 'admin', displayName: 'Administrator', description: 'Admin Users: manage user, manage report and restriction (like block a user when do some illegally or against the rule)' },
            { name: 'advance', displayName: 'Advanced Users', description: 'Advanced Users: Researchers, educators, NGOs, or policy makers analyzing aggregated data, Manage users, analyze trends, access aggregated observations' },
            { name: 'intermediate', displayName: 'Intermediate Users', description: 'Intermediate Users: Students, hobbyists, or nature enthusiasts contributing regularly, Enhanced Access: Search/filter maps, receive notifications, export data' },
            { name: 'casual', displayName: 'Casual User', description: 'Casual Users: General public interested in observing and learning about biodiversity, Basic Access: Submit and view personal observations' }
        ];

        // Map roles to DB format
        const rolesToInsert = roles.map(role => ({
            public_id: uuidv4(),
            name: role.name,
            display_name: role.displayName,
            description: role.description,
            created_at: new Date(),
            updated_at: new Date()
        }));

        await queryInterface.bulkInsert('roles', rolesToInsert);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
