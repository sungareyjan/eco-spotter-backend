const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

const rateLimitMiddleware = require('../middlewares/rate-limiter.middleware');
const { authLimiter, refreshLimiter,logoutLimiter } = require('../config/rate-limiter');
const { doubleCsrfProtection } = require('../middlewares/csrf.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juandelacruz@gmail.com
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     tokenType:
 *                       type: string
 *                       example: Bearer
 *                     expiresIn:
 *                       type: string
 *                       example: 3600m
 *                 user:
 *                   type: object
 *                   properties:
 *                     publicId:
 *                       type: string
 *                       example: 1ce8066a-6ce0-4a54-ad4f-2545078d7e22
 *                     email:
 *                       type: string
 *                       example: juandelacruz@gmail.com
 *                     username:
 *                       type: string
 *                       example: juan_dela_cruz
 *       400:
 *         description: Validation error (missing/invalid fields)
 *       401:
 *         description: Unauthorized (invalid email or password)
 */
router.post('/login', rateLimitMiddleware(authLimiter), doubleCsrfProtection, AuthController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cruz@example.com
 *               password:
 *                 type: string
 *                 example: MyStrongPassword123
 *               username:
 *                 type: string
 *                 example: cruz
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                         refreshToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                         tokenType:
 *                           type: string
 *                           example: Bearer
 *                         expiresIn:
 *                           type: string
 *                           example: 3600m
 *                     user:
 *                       type: object
 *                       properties:
 *                         publicId:
 *                           type: string
 *                           example: e680d573-7bc1-4b45-b82f-d6df8964ee0c
 *                         username:
 *                           type: string
 *                           example: cruz
 *                         email:
 *                           type: string
 *                           example: cruz@example.com
 *                         status:
 *                           type: string
 *                           example: active
 *       400:
 *         description: Missing or invalid fields
 */

router.post('/register', rateLimitMiddleware(authLimiter), doubleCsrfProtection, AuthController.register);

router.post('/refresh',  rateLimitMiddleware(refreshLimiter),doubleCsrfProtection, AuthController.refreshToken);

router.post('/logout',rateLimitMiddleware(logoutLimiter),doubleCsrfProtection, AuthController.logout);


module.exports = router;
