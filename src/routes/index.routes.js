const express = require('express');
const router = express.Router();
const userExampleRoutes = require('./user-example.routes');
const authenticateJWT = require('../middlewares/authentication.middleware');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');
const observationRouter = require('./observation.routes');
const speciesRouter = require('./species.routes');
const ecosystemRouter = require('./ecosystem.routes');
const dashboardRouter = require('./dashboard.routes');
const commentRouter = require('./comment.routes');
const reactionRouter =  require('./reaction.routes');
const controller = require('../controllers/csrf.controller');
router.get('/csrf-token', controller.getCsrfToken);

// example
router.use('/user-examples', userExampleRoutes);

// API endpoints
router.use('/', authRoutes);
router.use('/roles', roleRoutes);
// router.use('/users', userRoutes);

router.use('/users', authenticateJWT,userRoutes); //With auth
router.use('/observations', observationRouter);
router.use('/species',speciesRouter)
router.use('/ecosystem',ecosystemRouter);
router.use('/dashboard',dashboardRouter);
router.use('/comments',commentRouter);
router.use('/reactions',reactionRouter);

module.exports = router;
