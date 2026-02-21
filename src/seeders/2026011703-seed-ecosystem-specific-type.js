'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Get all tertiary types inserted earlier
    const tertiaryTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM ecosystem_tertiary_types;`
    );

    const tertiaryMap = {};
    tertiaryTypes[0].forEach(tt => {
      tertiaryMap[tt.name] = tt.id;
    });

    await queryInterface.bulkInsert('ecosystem_specific_types', [

      // Tropical Rainforest
      {
        public_id: uuidv4(),
        name: 'Lowland Rainforest',
        ecosystem_tertiary_type_id: tertiaryMap['Tropical Rainforest'],
        key_characteristics: 'Dense canopy, very high rainfall, rich biodiversity',
        example_species: 'Orangutan, Jaguar, Parrots',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Montane Rainforest',
        ecosystem_tertiary_type_id: tertiaryMap['Tropical Rainforest'],
        key_characteristics: 'High elevation, cooler temperatures, cloud cover',
        example_species: 'Tree Ferns, Hornbills',
        created_at: now,
        updated_at: now,
      },

      // Temperate Forest
      {
        public_id: uuidv4(),
        name: 'Deciduous Forest',
        ecosystem_tertiary_type_id: tertiaryMap['Temperate Forest'],
        key_characteristics: 'Trees shed leaves seasonally',
        example_species: 'Deer, Oak Trees',
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Evergreen Forest',
        ecosystem_tertiary_type_id: tertiaryMap['Temperate Forest'],
        key_characteristics: 'Needle-leaf trees, moderate climate',
        example_species: 'Pine, Bears',
        created_at: now,
        updated_at: now,
      },

      // Savanna
      {
        public_id: uuidv4(),
        name: 'Tropical Savanna',
        ecosystem_tertiary_type_id: tertiaryMap['Savanna'],
        key_characteristics: 'Grass-dominated with scattered trees',
        example_species: 'Lion, Elephant',
        created_at: now,
        updated_at: now,
      },

      //  Hot Desert
      {
        public_id: uuidv4(),
        name: 'Sandy Desert',
        ecosystem_tertiary_type_id: tertiaryMap['Hot Desert'],
        key_characteristics: 'Sand dunes, extreme heat',
        example_species: 'Camel, Cactus',
        created_at: now,
        updated_at: now,
      },

      // Arctic Tundra
      {
        public_id: uuidv4(),
        name: 'Permafrost Tundra',
        ecosystem_tertiary_type_id: tertiaryMap['Arctic Tundra'],
        key_characteristics: 'Frozen soil, very short growing season',
        example_species: 'Arctic Fox, Moss',
        created_at: now,
        updated_at: now,
      },

      // Alpine Zone
      {
        public_id: uuidv4(),
        name: 'High Alpine Meadow',
        ecosystem_tertiary_type_id: tertiaryMap['Alpine Zone'],
        key_characteristics: 'Above tree line, strong winds',
        example_species: 'Mountain Goat, Alpine Flowers',
        created_at: now,
        updated_at: now,
      },

      // Coral Reef
      {
        public_id: uuidv4(),
        name: 'Fringing Reef',
        ecosystem_tertiary_type_id: tertiaryMap['Coral Reef'],
        key_characteristics: 'Near shore coral formations',
        example_species: 'Clownfish, Sea Anemone',
        created_at: now,
        updated_at: now,
      },

      // Estuary
      {
        public_id: uuidv4(),
        name: 'River Mouth Estuary',
        ecosystem_tertiary_type_id: tertiaryMap['Estuary'],
        key_characteristics: 'Mix of freshwater and seawater',
        example_species: 'Mangrove Crab, Eel',
        created_at: now,
        updated_at: now,
      },

      // River
      {
        public_id: uuidv4(),
        name: 'Fast-flowing River',
        ecosystem_tertiary_type_id: tertiaryMap['River'],
        key_characteristics: 'High oxygen, rocky bed',
        example_species: 'Trout, Mayfly',
        created_at: now,
        updated_at: now,
      },

      // Lake
      {
        public_id: uuidv4(),
        name: 'Freshwater Lake',
        ecosystem_tertiary_type_id: tertiaryMap['Lake'],
        key_characteristics: 'Standing freshwater body',
        example_species: 'Tilapia, Water Lily',
        created_at: now,
        updated_at: now,
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ecosystem_specific_types', null, {});
  },
};