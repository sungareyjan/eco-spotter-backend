const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/role.controller');
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles management endpoints
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     description: Returns a list of roles with their display names and descriptions.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles with details
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
 *                 message:
 *                   type: string
 *                   example: Roles fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: admin
 *                       display_name:
 *                         type: string
 *                         example: Administrator
 *                       description:
 *                         type: string
 *                         example: "Admin Users: manage user, manage report and restriction (like block a user when do some illegally or against the rule)"
 */
router.get('/',RolesController.getAllRoles);

module.exports = router;

