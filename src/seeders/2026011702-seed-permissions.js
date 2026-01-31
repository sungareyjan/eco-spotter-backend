'use strict';

module.exports = {
async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('permissions', [
    // Basic Access
    { name: 'submit_observation', display_name: 'Submit Observation', description: 'Allows submitting personal observations', created_at: now, updated_at: now },
    { name: 'view_own_observations', display_name: 'View Own Observations', description: 'Allows viewing own observations', created_at: now, updated_at: now },

    // Enhanced Access
    { name: 'search_observations', display_name: 'Search Observations', description: 'Allows searching and filtering observations', created_at: now, updated_at: now },
    { name: 'receive_notifications', display_name: 'Receive Notifications', description: 'Allows receiving system notifications', created_at: now, updated_at: now },
    { name: 'export_data', display_name: 'Export Data', description: 'Allows exporting observation data', created_at: now, updated_at: now },

    // Administrative Access
    { name: 'manage_users', display_name: 'Manage Users', description: 'Allows managing other users', created_at: now, updated_at: now },
    { name: 'analyze_trends', display_name: 'Analyze Trends', description: 'Allows analyzing aggregated data trends', created_at: now, updated_at: now },
    { name: 'view_aggregated_observations', display_name: 'View Aggregated Observations', description: 'Allows viewing aggregated observation data', created_at: now, updated_at: now }
    ]);
},

async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
}
};
