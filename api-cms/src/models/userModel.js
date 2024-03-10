// src/models/userModel.js
const { pool } = require('../config/database');

// Função para criar um novo usuário
const createUser = async (name, email, telefone, coord_x, coord_y) => {
    const query = 'INSERT INTO users (name, email, telefone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, email, telefone, coord_x, coord_y];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Função para listar todos os usuários
const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    return rows;
};

// Função para buscar usuários por name, telefone ou email
const filterUsers = async ({ name, email, telefone }) => {
    try {
        const searchSQL = `
            SELECT * FROM users
            WHERE name ILIKE $1 OR email ILIKE $2 OR telefone ILIKE $3
        `;
        const values = [`%${name}%`, `%${email}%`, `%${telefone}%`];
        const { rows } = await pool.query(searchSQL, values);
        return rows;
    } catch (error) {
        throw new Error('Erro ao buscar usuários por critério de pesquisa: ' + error.message);
    }
};

// Função para obter um usuário por ID
const getUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Função para atualizar um usuário
const updateUser = async (userId, name, email, telefone, coord_x, coord_y) => {
    const query = 'UPDATE users SET name = $1, email = $2, telefone = $3, coord_x = $4, coord_y = $5 WHERE id = $6 RETURNING *';
    const values = [name, email, telefone, coord_x, coord_y, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Função para deletar um usuário
const deleteUser = async (userId) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

module.exports = { createUser, getAllUsers, filterUsers, getUserById, updateUser, deleteUser };
