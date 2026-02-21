/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_users', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 4
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        });

        // Add constraints separately
        await queryInterface.addConstraint('role_users', {
            fields: ['role_id'],
            type: 'foreign key',
            name: 'FK_role_users_role',
            references: {
                table: 'roles',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addConstraint('role_users', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'FK_role_users_user',
            references: {
                table: 'users',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('role_users', 'FK_role_users_role');
        await queryInterface.removeConstraint('role_users', 'FK_role_users_user');
        await queryInterface.dropTable('role_users');
    }
};
