const express = require('express');
const router = express.Router();
const EcosystemController = require('../controllers/ecosystem.controller');

router.get('/primary-types',EcosystemController.getEcosystemPrimaryType);
router.get('/:primary/secondaries',EcosystemController.getEcosystemSecondaryType);
router.get('/secondary/:secodary/tertiary-types',EcosystemController.getEcosystemTertiaryTypes);
router.get('/specific-types',EcosystemController.getEcosystemSpecificTypes);

module.exports = router;