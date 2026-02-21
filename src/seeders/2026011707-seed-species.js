'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Get all specific ecosystem types
    const specificTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM ecosystem_specific_types;`
    );

    const specificMap = {};
    specificTypes[0].forEach(st => {
      specificMap[st.name] = st.id;
    });

    await queryInterface.bulkInsert('species', [

      //  Lowland Rainforest
      {
        public_id: uuidv4(),
        name: 'Bornean Orangutan',
        scientific_name: 'Pongo pygmaeus',
        ecosystem_specific_type_id: specificMap['Lowland Rainforest'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'Scarlet Macaw',
        scientific_name: 'Ara macao',
        ecosystem_specific_type_id: specificMap['Lowland Rainforest'],
        created_at: now,
        updated_at: now,
      },

      // Montane Rainforest
      {
        public_id: uuidv4(),
        name: 'Clouded Leopard',
        scientific_name: 'Neofelis nebulosa',
        ecosystem_specific_type_id: specificMap['Montane Rainforest'],
        created_at: now,
        updated_at: now,
      },

      // Deciduous Forest
      {
        public_id: uuidv4(),
        name: 'White-tailed Deer',
        scientific_name: 'Odocoileus virginianus',
        ecosystem_specific_type_id: specificMap['Deciduous Forest'],
        created_at: now,
        updated_at: now,
      },

      // Evergreen Forest
      {
        public_id: uuidv4(),
        name: 'Brown Bear',
        scientific_name: 'Ursus arctos',
        ecosystem_specific_type_id: specificMap['Evergreen Forest'],
        created_at: now,
        updated_at: now,
      },

      // Tropical Savanna
      {
        public_id: uuidv4(),
        name: 'African Lion',
        scientific_name: 'Panthera leo',
        ecosystem_specific_type_id: specificMap['Tropical Savanna'],
        created_at: now,
        updated_at: now,
      },
      {
        public_id: uuidv4(),
        name: 'African Elephant',
        scientific_name: 'Loxodonta africana',
        ecosystem_specific_type_id: specificMap['Tropical Savanna'],
        created_at: now,
        updated_at: now,
      },

      // Sandy Desert
      {
        public_id: uuidv4(),
        name: 'Dromedary Camel',
        scientific_name: 'Camelus dromedarius',
        ecosystem_specific_type_id: specificMap['Sandy Desert'],
        created_at: now,
        updated_at: now,
      },

      // Permafrost Tundra
      {
        public_id: uuidv4(),
        name: 'Arctic Fox',
        scientific_name: 'Vulpes lagopus',
        ecosystem_specific_type_id: specificMap['Permafrost Tundra'],
        created_at: now,
        updated_at: now,
      },

      // High Alpine Meadow
      {
        public_id: uuidv4(),
        name: 'Mountain Goat',
        scientific_name: 'Oreamnos americanus',
        ecosystem_specific_type_id: specificMap['High Alpine Meadow'],
        created_at: now,
        updated_at: now,
      },

      // Fringing Reef
      {
        public_id: uuidv4(),
        name: 'Clownfish',
        scientific_name: 'Amphiprion ocellaris',
        ecosystem_specific_type_id: specificMap['Fringing Reef'],
        created_at: now,
        updated_at: now,
      },

      // River Mouth Estuary
      {
        public_id: uuidv4(),
        name: 'Mangrove Crab',
        scientific_name: 'Scylla serrata',
        ecosystem_specific_type_id: specificMap['River Mouth Estuary'],
        created_at: now,
        updated_at: now,
      },

      // Fast-flowing River
      {
        public_id: uuidv4(),
        name: 'Rainbow Trout',
        scientific_name: 'Oncorhynchus mykiss',
        ecosystem_specific_type_id: specificMap['Fast-flowing River'],
        created_at: now,
        updated_at: now,
      },

      // Freshwater Lake
      {
        public_id: uuidv4(),
        name: 'Nile Tilapia',
        scientific_name: 'Oreochromis niloticus',
        ecosystem_specific_type_id: specificMap['Freshwater Lake'],
        created_at: now,
        updated_at: now,
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('species', null, {});
  }
};