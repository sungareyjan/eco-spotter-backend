const express = require('express');
const router = express.Router();
const  ObservationController = require('../controllers/observation.controller');

router.get('/',ObservationController.getAllObservation);

module.exports = router;