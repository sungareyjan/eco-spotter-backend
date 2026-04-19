const express = require('express');
const router = express.Router();
const dashBoardController = require('../controllers/dashboard.controller');

router.get('/conservation-metrics',dashBoardController.getConversationMetric);

module.exports = router;