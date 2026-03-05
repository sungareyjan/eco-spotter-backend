const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with roles and permissions
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users with roles and permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   publicId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 */
// GET all users with roles + permissions
router.get('', UserController.getAllUsersAccess);


/**
 * @swagger
 * /api/users/{publicId}:
 *   get:
 *     summary: Get a single user by public ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Public ID of the user
 *     responses:
 *       200:
 *         description: User object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publicId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
 */
// GET all users by public id
router.get('/:publicId', UserController.getAllUserByPublicId);

module.exports = router;
