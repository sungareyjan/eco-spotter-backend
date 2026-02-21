const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

// GET all users with roles + permissions
router.get('', UserController.getAllUsersAccess);

// GET all users by public id
router.get('/:publicId', UserController.getAllUserByPublicId);

module.exports = router;
