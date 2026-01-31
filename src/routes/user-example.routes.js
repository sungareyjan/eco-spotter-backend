const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-example.controller');

// Get all users
router.get('/', userController.getAllUsers);

// Get single user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update entire user (PUT)
router.put('/:id', userController.updateUser);

// Partial update (PATCH)
router.patch('/:id', userController.patchUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
