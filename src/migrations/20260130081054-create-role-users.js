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
    roleId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'role_id'
    },
    userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'user_id'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
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
