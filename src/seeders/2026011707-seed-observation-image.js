'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('observation_images', [
            {
                public_id: uuidv4(),
                observation_id: 1, // make sure this exists
                image_path: 'uploads/observations/obs1-image1.jpg',
                thumbnail_path: 'uploads/observations/thumb-obs1-image1.jpg',
                mime_type: 'image/jpeg',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                public_id: uuidv4(),
                observation_id: 1,
                image_path: 'uploads/observations/obs1-image2.jpg',
                thumbnail_path: null,
                mime_type: 'image/png',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('observation_images', null, {});
    }
};
