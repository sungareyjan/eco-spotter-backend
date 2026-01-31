const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// GET all users with roles + permissions
router.get('/', usersController.getAllUsersAccess);
router.get('/:publicId', usersController.getAllUserByPublicId);

module.exports = router;
