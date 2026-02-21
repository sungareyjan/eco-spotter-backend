'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ecosystem_secondary_types', {

      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      public_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        unique: true,
      },

      name: {
        type: Sequelize.STRING(250), // NVARCHAR(20)
        allowNull: true,
      },
      ecosystem_primary_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('SYSDATETIMEOFFSET()'),
      },

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ecosystem_secondary_types');
  },
};
