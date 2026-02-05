'use strict';

module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert('permissions', [
            // BASIC ACCESS
            {
                name        : 'submit_observation',
                display_name: 'Submit Observation',
                description : 'Allows submitting personal observations',
                created_at  : now,
            },
            {
                name        : 'view_own_observations',
                display_name: 'View Own Observations',
                description : 'Allows viewing own observations',
                created_at  : now,
            },

              // ENHANCED ACCESS
            {
                name        : 'search_observations',
                display_name: 'Search Observations',
                description : 'Allows searching and filtering observations',
                created_at  : now,
            },
            {
                name        : 'receive_notifications',
                display_name: 'Receive Notifications',
                description : 'Allows receiving system notifications',
                created_at  : now,
            },
            {
                name        : 'export_data',
                display_name: 'Export Data',
                description : 'Allows exporting observation data',
                created_at  : now,
            },

              // ADVANCED / RESEARCH ACCESS
            {
                name        : 'view_aggregated_observations',
                display_name: 'View Aggregated Observations',
                description : 'Allows viewing anonymized and aggregated observation data',
                created_at  : now,
            },
            {
                name        : 'analyze_trends',
                display_name: 'Analyze Trends',
                description : 'Allows analyzing biodiversity trends and statistics',
                created_at  : now,
            },

              // ADMIN / MODERATION ACCESS
            {
                name        : 'manage_users',
                display_name: 'Manage Users',
                description : 'Allows creating, editing, and managing user accounts',
                created_at  : now,
            },
            {
                name        : 'moderate_observations',
                display_name: 'Moderate Observations',
                description : 'Allows reviewing, approving, rejecting, or flagging observations',
                created_at  : now,
            },
            {
                name        : 'block_users',
                display_name: 'Block or Restrict Users',
                description : 'Allows blocking or restricting users who violate platform rules',
                created_at  : now,
            },
            {
                name        : 'manage_roles',
                display_name: 'Manage Roles',
                description : 'Allows assigning and managing user roles',
                created_at  : now,
            },
            {
                name        : 'manage_permissions',
                display_name: 'Manage Permissions',
                description : 'Allows managing system permissions',
                created_at  : now,
            },
            {
                name        : 'system_settings',
                display_name: 'System Settings',
                description : 'Allows managing global system settings',
                created_at  : now,
            }
        ]);

    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
