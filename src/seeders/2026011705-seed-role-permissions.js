'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const [roles] = await queryInterface.sequelize.query(`SELECT id, name FROM roles;`);
        const [permissions] = await queryInterface.sequelize.query(`SELECT id, name FROM permissions;`);

        const roleMap = {};
        roles.forEach(r => roleMap[r.name] = r.id);

        const permissionMap = {};
        permissions.forEach(p => permissionMap[p.name] = p.id);

        const rolePermissions = [
            // CASUAL USERS – Basic Access
            { role_id: roleMap['casual'], permission_id: permissionMap['view_own_observations'] },
            { role_id: roleMap['casual'], permission_id: permissionMap['submit_observation'] },

            // INTERMEDIATE USERS – Enhanced Access
            { role_id: roleMap['intermediate'], permission_id: permissionMap['view_own_observations'] },
            { role_id: roleMap['intermediate'], permission_id: permissionMap['submit_observation'] },
            { role_id: roleMap['intermediate'], permission_id: permissionMap['search_observations'] },
            { role_id: roleMap['intermediate'], permission_id: permissionMap['receive_notifications'] },
            { role_id: roleMap['intermediate'], permission_id: permissionMap['export_data'] },

            // ADVANCED USERS – Research & Management
            { role_id: roleMap['advance'], permission_id: permissionMap['view_own_observations'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['submit_observation'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['search_observations'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['receive_notifications'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['export_data'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['manage_users'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['analyze_trends'] },
            { role_id: roleMap['advance'], permission_id: permissionMap['view_aggregated_observations'] },

            // ADMIN – Full System Control
            { role_id: roleMap['admin'], permission_id: permissionMap['view_own_observations'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['submit_observation'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['search_observations'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['receive_notifications'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['export_data'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['view_aggregated_observations'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['analyze_trends'] },

            // Admin-only powers
            { role_id: roleMap['admin'], permission_id: permissionMap['manage_users'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['manage_roles'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['manage_permissions'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['moderate_observations'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['block_users'] },
            { role_id: roleMap['admin'], permission_id: permissionMap['system_settings'] }
        ];

        const now = new Date();

        await queryInterface.bulkInsert(
            'role_permissions',
            rolePermissions.map(rp => ({ ...rp, created_at: now, updated_at: now }))
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_permissions', null, {});
    }
};
