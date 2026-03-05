const express = require('express');
const router = express.Router();
const EcosystemController = require('../controllers/ecosystem.controller');
/**
 * @swagger
 * tags:
 *   name: Ecosystem
 *   description: Ecosystem management endpoints
 */

/**
 * @swagger
 * /api/ecosystem/primary-types:
 *   get:
 *     summary: Get all primary ecosystem types
 *     tags: [Ecosystem]
 *     responses:
 *       200:
 *         description: List of primary types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 data:
 *                   type: array
 *                   description: Ecosystem primary types
 *                   items:
 *                     type: string
 *                     example: Terrestrial Ecosystem
 *               example:
 *                 status: success
 *                 code: 200
 *                 data:
 *                   - Terrestrial Ecosystem
 *                   - Aquatic Ecosystem
 */
router.get('/primary-types',EcosystemController.getEcosystemPrimaryType);

/**
 * @swagger
 * /api/ecosystem/{primary}/secondaries:
 *   get:
 *     summary: Get secondary ecosystem types for a primary ecosystem
 *     tags: [Ecosystem]
 *     parameters:
 *       - in: path
 *         name: primary
 *         required: true
 *         schema:
 *           type: string
 *         description: Primary ecosystem type
 *         example: TERRESTRIAL
 *     responses:
 *       200:
 *         description: List of secondary ecosystem types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 data:
 *                   type: array
 *                   description: Secondary ecosystem types for the given primary type
 *                   items:
 *                     type: string
 *               example:
 *                 status: success
 *                 code: 200
 *                 data:
 *                   - Forest
 *                   - Grassland
 *                   - Desert
 *                   - Tundra
 *                   - Mountain
 */
router.get('/:primary/secondaries',EcosystemController.getEcosystemSecondaryType);

/**
 * @swagger
 * /api/ecosystem/secondary/{secondary}/tertiary-types:
 *   get:
 *     summary: Get tertiary ecosystem types by secondary type
 *     tags: [Ecosystem]
 *     parameters:
 *       - in: path
 *         name: secondary
 *         required: true
 *         schema:
 *           type: string
 *         description: Secondary ecosystem type
 *         example: MARINE
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional search keyword
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of tertiary ecosystem types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 data:
 *                   type: array
 *                   description: Tertiary ecosystem type objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       publicId:
 *                         type: string
 *                         example: 5b7679ed-4cbb-44fc-8c88-d0245229f8b1
 *                       name:
 *                         type: string
 *                         example: Coral Reef
 *                       characteristics:
 *                         type: string
 *                         example: Shallow tropical waters, high biodiversity
 *                       ecosystemPrimaryType:
 *                         type: string
 *                         example: Aquatic
 *                       ecosystemSecondayType:
 *                         type: string
 *                         example: Marine
 *                 pagination:
 *                   type: object
 *                   description: Pagination info
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 5
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 */
router.get('/secondary/:secondary/tertiary-types',EcosystemController.getEcosystemTertiaryTypes);
/**
 * @swagger
 * /api/ecosystem/specific-types:
 *   get:
 *     summary: Get specific ecosystem types
 *     tags: [Ecosystem]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional search keyword
 *         example: Forest
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of specific ecosystem types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 data:
 *                   type: array
 *                   description: Array of specific ecosystem type objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       subtypeId:
 *                         type: string
 *                         example: 55436bc7-0486-463c-97b1-b988188e216c
 *                       name:
 *                         type: string
 *                         example: Deciduous Forest
 *                       characteristics:
 *                         type: string
 *                         example: Trees shed leaves seasonally
 *                       ecosystemPrimaryType:
 *                         type: string
 *                         example: Terrestrial
 *                       ecosystemSecondaryType:
 *                         type: string
 *                         example: Forest
 *                       ecosystemTertiaryTypeId:
 *                         type: string
 *                         example: c8b8348e-281c-4b3b-a5ad-9ad718629028
 *                       ecosystemTertiaryType:
 *                         type: string
 *                         example: Temperate Forest
 *                       ecosystemTertiaryCharacteristics:
 *                         type: string
 *                         example: Moderate climate, deciduous or evergreen trees
 *                 pagination:
 *                   type: object
 *                   description: Pagination info
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 12
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 */
router.get('/specific-types',EcosystemController.getEcosystemSpecificTypes);

module.exports = router;