// src/controllers/userController.js
const UserModel = require('../models/userModel');

// Função para criar um novo usuário
const createUser = async (req, res) => {
    try {
        const { name, email, telefone, coord_x, coord_y } = req.body;
        const user = await UserModel.createUser(name, email, telefone, coord_x, coord_y);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para buscar todos os usuários ou filtrar por name, telefone ou email
const getAllUsers = async (req, res) => {
    try {
        const { email, telefone, name } = req.query; // Obtém os parâmetros de consulta da URL

        // Verifica se há parâmetros de consulta
        if (email || telefone || name) {
            // Chama a função de modelo para filtrar os usuários com base nos parâmetros de consulta
            const filteredUsers = await UserModel.filterUsers({ email, telefone, name });
            res.json(filteredUsers);
        } else {
            // Se não houver parâmetros de consulta, busca todos os usuários
            const allUsers = await UserModel.getAllUsers();
            res.json(allUsers);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para obter um usuário por ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, telefone, coord_x, coord_y } = req.body;
        const user = await UserModel.updateUser(userId, name, email, telefone, coord_x, coord_y);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.deleteUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
