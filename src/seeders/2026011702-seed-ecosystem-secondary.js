'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // First, get the Primary types
    const primaryTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM ecosystem_primary_types WHERE name IN ('Terrestrial Ecosystems', 'Aquatic Ecosystems');`
    );

    const primaryMap = {};
    primaryTypes[0].forEach(pt => {
      primaryMap[pt.name] = pt.id;
    });

    // Insert Secondary Types
    await queryInterface.bulkInsert('ecosystem_secondary_types', [
      // Terrestrial Secondary Types
      {
        public_id: uuidv4(),
        name: 'Forest',
        ecosystem_primary_type_id: primaryMap['Terrestrial Ecosystems'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Grassland',
        ecosystem_primary_type_id: primaryMap['Terrestrial Ecosystems'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Desert',
        ecosystem_primary_type_id: primaryMap['Terrestrial Ecosystems'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Tundra',
        ecosystem_primary_type_id: primaryMap['Terrestrial Ecosystems'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Mountain',
        ecosystem_primary_type_id: primaryMap['Terrestrial Ecosystems'],
        created_at: now,
        updated_at: now,
      },

      // Aquatic Secondary Types
      {
        public_id: uuidv4(),
        name: 'Freshwater',
        ecosystem_primary_type_id: primaryMap['Aquatic Ecosystems'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Marine',
        ecosystem_primary_type_id: primaryMap['Aquatic Ecosystems'],
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ecosystem_secondary_types', {
      name: [
        'Forest', 'Grassland', 'Desert', 'Tundra', 'Mountain',
        'Freshwater', 'Marine',
      ],
    });
  },
};