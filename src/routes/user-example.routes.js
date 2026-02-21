const express = require('express');
const router = express.Router();
const UserExampleController = require('../controllers/user-example.controller');


// Get all users
router.get('/', UserExampleController.getAllUsers);

// Get single user by ID
router.get('/:id', UserExampleController.getUserById);

// Create a new user
router.post('/', UserExampleController.createUser);

// Update entire user (PUT)
router.put('/:id', UserExampleController.updateUser);

// Partial update (PATCH)
router.patch('/:id', UserExampleController.patchUser);

// Delete user
router.delete('/:id', UserExampleController.deleteUser);

module.exports = router;
