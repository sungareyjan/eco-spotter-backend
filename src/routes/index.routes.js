const express = require('express');
const router = express.Router();
const userExampleRoutes = require('./user-example.routes');
const authenticateJWT = require('../middlewares/authentication');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');
const observationRouter = require('./observation.routes');
const speciesRouter = require('./species.routes')
const ecosystemRouter = require('./ecosystem.routes');
// example
router.use('/user-examples', userExampleRoutes);

// API endpoints
router.use('/', authRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

// router.use('/users', authenticateJWT,userRoutes); //With auth
router.use('/observations', observationRouter);
router.use('/species',speciesRouter)
router.use('/ecosystem',ecosystemRouter);

module.exports = router;
