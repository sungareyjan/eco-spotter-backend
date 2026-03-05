const express = require('express');
const router = express.Router();
const SpeciesController = require('../controllers/species.controller')
/**
 * @swagger
 * tags:
 *   name: Species
 *   description: Species management endpoints
 */

/**
 * @swagger
 * /api/species:
 *   get:
 *     summary: Get all species
 *     description: |
 *       Returns a paginated list of species along with their ecosystem details.
 *       Each species includes its scientific name, subtype, and associated ecosystems.
 *     tags: [Species]
 *     responses:
 *       200:
 *         description: List of all species with ecosystems
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
 *                   description: List of species
 *                   items:
 *                     type: object
 *                     properties:
 *                       speciesId:
 *                         type: string
 *                         description: Unique ID of the species
 *                         example: 2816cb4b-a178-4d87-8ab3-3a5eb87a9041
 *                       name:
 *                         type: string
 *                         description: Common name of the species
 *                         example: White-tailed Deer
 *                       scientificName:
 *                         type: string
 *                         description: Scientific (Latin) name
 *                         example: Odocoileus virginianus
 *                       subtypeId:
 *                         type: string
 *                         description: ID of the species subtype
 *                         example: 55436bc7-0486-463c-97b1-b988188e216c
 *                       ecosystems:
 *                         type: array
 *                         description: Ecosystems where this species is found
 *                         items:
 *                           type: object
 *                           properties:
 *                             subtypeCharacteristics:
 *                               type: string
 *                               description: Characteristics of the ecosystem subtype
 *                               example: Trees shed leaves seasonally
 *                             subtypeName:
 *                               type: string
 *                               description: Name of the ecosystem subtype
 *                               example: Deciduous Forest
 *                             primaryType:
 *                               type: string
 *                               description: Primary ecosystem type
 *                               example: Terrestrial
 *                             secondaryType:
 *                               type: string
 *                               description: Secondary ecosystem type
 *                               example: Forest
 *                             tertiaryTypeCharacteristic:
 *                               type: string
 *                               description: Tertiary type characteristics
 *                               example: Moderate climate, deciduous or evergreen trees
 *                             tertiaryTypeId:
 *                               type: string
 *                               description: ID of the tertiary ecosystem type
 *                               example: c8b8348e-281c-4b3b-a5ad-9ad718629028
 *                             specificTypeName:
 *                               type: string
 *                               description: Specific ecosystem type name
 *                               example: Temperate Forest
 *                 pagination:
 *                   type: object
 *                   description: Pagination details
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of species
 *                       example: 1
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       description: Number of species per page
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 1
 */
router.get('/',SpeciesController.getAllSpecies);

module.exports = router;