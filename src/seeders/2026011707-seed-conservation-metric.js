'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const observations = 1500;
    const species = 320;
    const verified = 980;
    const hikers = 120;

    // base line max targets (adjust these base on actual data)
    const max = {
      observations: 2000,
      species: 500,
      verified: 1000,
      hikers: 200
    };

    // normalize
    const obsPct = observations / max.observations;
    const speciesPct = species / max.species;
    const verifiedPct = verified / max.verified;
    const hikersPct = hikers / max.hikers;

    // compute %
    const impact =
      (obsPct * 0.3) +
      (speciesPct * 0.3) +
      (verifiedPct * 0.2) +
      (hikersPct * 0.2);

    const impactPercent = (impact * 100).toFixed(2);

    await queryInterface.bulkInsert('conservation_metrics', [
      {
        metric_name: 'Total Observation',
        metric_value: observations,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        metric_name: 'Species Identified',
        metric_value: species,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        metric_name: 'Verified Naturalist',
        metric_value: verified,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        metric_name: 'New Hikers',
        metric_value: hikers,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        metric_name: 'Conservation Impact (%)',
        metric_value: Math.round(impactPercent), // store as DECIMAL
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('conservation_metrics', null, {});
  }
};