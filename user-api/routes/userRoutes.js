const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for CRUD operations
router.post('/', userController.createUser);       // Create a new user
router.get('/:id', userController.getUser);       // Read user by ID
router.put('/:id', userController.updateUser);    // Update user by ID
router.delete('/:id', userController.deleteUser); // Delete user by ID

module.exports = router;
