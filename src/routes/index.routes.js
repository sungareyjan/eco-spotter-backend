const express = require('express');
const router = express.Router();
const userExampleRoutes = require('./user-example.routes');
const authenticateJWT = require('../middlewares/authentication');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');

// example
router.use('/user-examples', userExampleRoutes);

// API endpoints
router.use('/', authRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
// router.use('/users', authenticateJWT,userRoutes); //With auth

module.exports = router;
