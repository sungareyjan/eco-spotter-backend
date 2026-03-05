'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('ecosystem_tertiary_types', [
      // TERRESTRIAL - Forest
      {
        public_id: uuidv4(),
        name: 'Tropical Rainforest',
        ecosystem_secondary_type: 'Forest',
        ecosystem_primary_type: 'Terrestrial', // Capitalized
        key_characteristics: 'High biodiversity, dense tree canopy, heavy rainfall',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Temperate Forest',
        ecosystem_secondary_type: 'Forest',
        ecosystem_primary_type: 'Terrestrial',
        key_characteristics: 'Moderate climate, deciduous or evergreen trees',
        created_at: now,
        updated_at: now,
      },

      // TERRESTRIAL - Grassland
      {
        public_id: uuidv4(),
        name: 'Savanna',
        ecosystem_secondary_type: 'Grassland',
        ecosystem_primary_type: 'Terrestrial',
        key_characteristics: 'Tropical/subtropical, scattered trees, grasses dominate',
        created_at: now,
        updated_at: now,
      },

      // AQUATIC - Freshwater
      {
        public_id: uuidv4(),
        name: 'River',
        ecosystem_secondary_type: 'Freshwater',
        ecosystem_primary_type: 'Aquatic', // Capitalized
        key_characteristics: 'Flowing freshwater, variable depth, high oxygen',
        created_at: now,
        updated_at: now,
      },

      // AQUATIC - Marine
      {
        public_id: uuidv4(),
        name: 'Coral Reef',
        ecosystem_secondary_type: 'Marine',
        ecosystem_primary_type: 'Aquatic',
        key_characteristics: 'Shallow tropical waters, high biodiversity',
        created_at: now,
        updated_at: now,
      },

      // … continue for all other subtypes
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ecosystem_tertiary_types', null, {});
  },
};