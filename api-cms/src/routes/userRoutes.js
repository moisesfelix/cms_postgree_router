// src/routes/userRoutes.js
const express = require('express');
const { validateCreateUser } = require('../middlewares/validateInput');
const UserController = require('../controllers/userController');

const router = express.Router();

// Rotas para manipulação de usuários
router.post('/', validateCreateUser, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', validateCreateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
