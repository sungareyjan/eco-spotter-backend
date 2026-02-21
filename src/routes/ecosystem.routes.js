const express = require('express');
const router = express.Router();
const EcosystemPrimaryTypeController = require('../controllers/ecosystems/ecosystem-primary-type.controller');
const EcosystemSecondaryTypeController = require('../controllers/ecosystems/ecosystem-secondary-type.controller');
const EcosystemTertiaryTypeController = require('../controllers/ecosystems/ecosystem-tertiary-type.controller');
const EcosystemSpecificTypeController = require('../controllers/ecosystems/ecosystem-specific-type.controller');

router.get('/primary-types',EcosystemPrimaryTypeController.getEcosystemPrimaryType);
router.get('/secondary-types',EcosystemSecondaryTypeController.getEcosystemSecondaryType);
router.get('/tertiary-types',EcosystemTertiaryTypeController.getEcosystemTertiaryTypes);
router.get('/specific-types',EcosystemSpecificTypeController.getEcosystemSpecificTypes);

module.exports = router;