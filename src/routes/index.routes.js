const express = require('express');
const router = express.Router();
const userExampleRoutes = require('./user-example.routes');
const userRoutes = require('./user.routes');

// example
router.use('/users-example', userExampleRoutes);

// API endpoints
// router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

module.exports = router;
