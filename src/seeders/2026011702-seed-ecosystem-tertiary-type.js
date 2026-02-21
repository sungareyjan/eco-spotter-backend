'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // First, get the Secondary types
    const secondaryTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM ecosystem_secondary_types WHERE name IN 
      ('Forest', 'Grassland', 'Desert', 'Tundra', 'Mountain', 'Freshwater', 'Marine');`
    );

    const secondaryMap = {};
    secondaryTypes[0].forEach(st => {
      secondaryMap[st.name] = st.id;
    });

      console.log('start secondary')
      console.log(secondaryMap)
      console.log('end secondary')
    // Insert Tertiary Types
    await queryInterface.bulkInsert('ecosystem_tertiary_types', [
      // Forest Subtypes
      {
        public_id: uuidv4(),
        name: 'Tropical Rainforest',
        ecosystem_secondary_type_id: secondaryMap['Forest'],
        key_characteristics: 'High biodiversity, dense tree canopy, heavy rainfall',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Temperate Forest',
        ecosystem_secondary_type_id: secondaryMap['Forest'],
        key_characteristics: 'Moderate climate, deciduous or evergreen trees',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Boreal Forest (Taiga)',
        ecosystem_secondary_type_id: secondaryMap['Forest'],
        key_characteristics: 'Cold climate, coniferous trees',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Mangrove Forest',
        ecosystem_secondary_type_id: secondaryMap['Forest'],
        key_characteristics: 'Coastal, salt-tolerant trees',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Montane Forest',
        ecosystem_secondary_type_id: secondaryMap['Forest'],
        key_characteristics: 'High elevation, cooler climate, cloud forests',
        created_at: now,
        updated_at: now,
      },

      // Grassland Subtypes
      {
        public_id: uuidv4(),
        name: 'Savanna',
        ecosystem_secondary_type_id: secondaryMap['Grassland'],
        key_characteristics: 'Tropical/subtropical, scattered trees, grasses dominate',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Prairie',
        ecosystem_secondary_type_id: secondaryMap['Grassland'],
        key_characteristics: 'Temperate, fertile soil, tall grasses',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Steppe',
        ecosystem_secondary_type_id: secondaryMap['Grassland'],
        key_characteristics: 'Semi-arid, grasses, few trees',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Meadow',
        ecosystem_secondary_type_id: secondaryMap['Grassland'],
        key_characteristics: 'Open, low grasses, often seasonal flowering plants',
        created_at: now,
        updated_at: now,
      },

      // Desert Subtypes
      {
        public_id: uuidv4(),
        name: 'Hot Desert',
        ecosystem_secondary_type_id: secondaryMap['Desert'],
        key_characteristics: 'Very low rainfall, sand dunes, sparse vegetation',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Cold Desert',
        ecosystem_secondary_type_id: secondaryMap['Desert'],
        key_characteristics: 'Low precipitation, cold, rocky terrain',
        created_at: now,
        updated_at: now,
      },

      // Tundra Subtypes
      {
        public_id: uuidv4(),
        name: 'Arctic Tundra',
        ecosystem_secondary_type_id: secondaryMap['Tundra'],
        key_characteristics: 'Extremely cold, permafrost, low vegetation',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Alpine Tundra',
        ecosystem_secondary_type_id: secondaryMap['Tundra'],
        key_characteristics: 'High mountain, cold, low-growing plants',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Antarctic Tundra',
        ecosystem_secondary_type_id: secondaryMap['Tundra'],
        key_characteristics: 'Cold desert-like, minimal flora',
        created_at: now,
        updated_at: now,
      },

      // Mountain Subtypes
      {
        public_id: uuidv4(),
        name: 'Montane Zone',
        ecosystem_secondary_type_id: secondaryMap['Mountain'],
        key_characteristics: 'Lower mountain slopes, mixed vegetation',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Subalpine Zone',
        ecosystem_secondary_type_id: secondaryMap['Mountain'],
        key_characteristics: 'Higher slopes, shrubs and meadows',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Alpine Zone',
        ecosystem_secondary_type_id: secondaryMap['Mountain'],
        key_characteristics: 'Above tree line, grass and herb vegetation',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Nival Zone',
        ecosystem_secondary_type_id: secondaryMap['Mountain'],
        key_characteristics: 'Permanent snow and ice, minimal life',
        created_at: now,
        updated_at: now,
      },

      // Freshwater Subtypes
      {
        public_id: uuidv4(),
        name: 'River',
        ecosystem_secondary_type_id: secondaryMap['Freshwater'],
        key_characteristics: 'Flowing freshwater, variable depth, high oxygen',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Stream',
        ecosystem_secondary_type_id: secondaryMap['Freshwater'],
        key_characteristics: 'Small, narrow, flowing freshwater',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Lake',
        ecosystem_secondary_type_id: secondaryMap['Freshwater'],
        key_characteristics: 'Standing water, variable size, aquatic plants',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Pond',
        ecosystem_secondary_type_id: secondaryMap['Freshwater'],
        key_characteristics: 'Small standing water, shallow',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Wetland',
        ecosystem_secondary_type_id: secondaryMap['Freshwater'],
        key_characteristics: 'Water-saturated soil, marshes, bogs, swamps',
        created_at: now,
        updated_at: now,
      },

      // Marine Subtypes
      {
        public_id: uuidv4(),
        name: 'Oceanic Zone',
        ecosystem_secondary_type_id: secondaryMap['Marine'],
        key_characteristics: 'Open sea, deep waters, pelagic life',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Coastal Zone',
        ecosystem_secondary_type_id: secondaryMap['Marine'],
        key_characteristics: 'Shallow waters near land, tidal influence',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Coral Reef',
        ecosystem_secondary_type_id: secondaryMap['Marine'],
        key_characteristics: 'Shallow tropical waters, high biodiversity',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Estuary',
        ecosystem_secondary_type_id: secondaryMap['Marine'],
        key_characteristics: 'Mix of freshwater and seawater, nutrient-rich',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Mangrove Swamp',
        ecosystem_secondary_type_id: secondaryMap['Marine'],
        key_characteristics: 'Coastal, salt-tolerant, tidal influence',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ecosystem_tertiary_types', null, {});
  },
};