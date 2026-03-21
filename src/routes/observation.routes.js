const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const  ObservationController = require('../controllers/observation.controller');
/**
 * @swagger
 * tags:
 *   name: Observations
 *   description: Observation management endpoints
 */
/**
 * @swagger
 * /api/observations:
 *   get:
 *     summary: Get all observations
 *     description: Returns a paginated list of observations with species, location, observer, and images details.
 *     tags: [Observations]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 100
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all observations with details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       publicId:
 *                         type: string
 *                         example: 1bde0b24-f6ad-4f76-98ad-ab8a5cc17507
 *                       observation:
 *                         type: object
 *                         properties:
 *                           kingdomGroup:
 *                             type: string
 *                             example: Fungi
 *                           description:
 *                             type: string
 *                             example: Spotted mushrooms growing in damp soil.
 *                           observedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-02-10T02:00:00.000Z
 *                           status:
 *                             type: string
 *                             example: Rejected
 *                       location:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Forest Reserve, Bicol Region
 *                           coordinates:
 *                             type: object
 *                             properties:
 *                               latitude:
 *                                 type: number
 *                                 example: 12.3456789
 *                               longitude:
 *                                 type: number
 *                                 example: 120.456789
 *                       species:
 *                         type: object
 *                         properties:
 *                           publicId:
 *                             type: string
 *                             example: 1bde0b24-f6ad-4f76-98ad-ab8a5cc17507
 *                           commonName:
 *                             type: string
 *                             example: Clouded Leopard
 *                           ecosystem:
 *                             type: object
 *                             properties:
 *                               primaryType:
 *                                 type: string
 *                                 example: Terrestrial
 *                               secondaryType:
 *                                 type: string
 *                                 example: Forest
 *                               tertiaryType:
 *                                 type: string
 *                                 example: Tropical Rainforest
 *                               specificType:
 *                                 type: string
 *                                 example: Montane Rainforest
 *                       observer:
 *                         type: object
 *                         properties:
 *                           publicId:
 *                             type: string
 *                             example: 1e6cd206-4cfc-46df-b678-49cc36ccdbfc
 *                           username:
 *                             type: string
 *                             example: pedro
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: uri
 *                           example: https://example.com/image1.jpg
 *                       timestamps:
 *                         type: object
 *                         properties:
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-03-05T00:55:40.544Z
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 */
router.get('/',ObservationController.getAllObservation);
router.post('/',upload.single('image'),ObservationController.postObservation);

module.exports = router;