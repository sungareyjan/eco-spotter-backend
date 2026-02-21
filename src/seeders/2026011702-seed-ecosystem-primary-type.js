'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('ecosystem_primary_types', [
      {
        public_id: uuidv4(),
        name: 'Terrestrial Ecosystems',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Aquatic Ecosystems',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ecosystem_primary_types', {
      name: [
        'Terrestrial Ecosystems',
        'Aquatic Ecosystems',
      ],
    });
  },
};