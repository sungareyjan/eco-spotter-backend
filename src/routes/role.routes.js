const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/role.controller');

router.get('/',RolesController.getAllRoles);

module.exports = router;

