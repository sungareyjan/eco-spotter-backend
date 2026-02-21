const express = require('express');
const router = express.Router();
const SpeciesController = require('../controllers/species.controller')

router.get('/',SpeciesController.getAllSpecies);

module.exports = router;