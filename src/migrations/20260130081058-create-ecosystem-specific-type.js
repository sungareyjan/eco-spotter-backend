'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ecosystem_specific_types', {

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

      ecosystem_tertiary_type_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        // FK can be added later:
        // references: { model: 'ecosystem_subtypes', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL',
      },

      name: {
        type: Sequelize.STRING(250), // NVARCHAR(150)
        allowNull: false,
      },

      key_characteristics: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      example_species: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('ecosystem_specific_types');
  },
};
