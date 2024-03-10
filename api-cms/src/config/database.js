// dbSetup.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.API_CMS_DB_CONNECTION,
  ssl: {
    rejectUnauthorized: false
  }
});

// Comandos SQL para criar o banco de dados
const createDBQuery = `CREATE DATABASE "postgresql-cms";`;

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefone VARCHAR(100) NOT NULL,
  coord_x NUMERIC,
  coord_y NUMERIC
);

`;

// Função para verificar se o banco de dados já existe
async function checkDBExistence() {
  try {
    const result = await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'postgresql-cms';`);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Erro ao verificar a existência do banco de dados:', error);
    return false;
  }
}

// Função para criar o banco de dados
async function createDB() {
  try {
    const dbExists = await checkDBExistence();
    if (!dbExists) {
      await pool.query(createDBQuery);
      console.log('Banco de dados criado com sucesso.');
    } else {
      console.log('O banco de dados já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar banco de dados:', error);
  }
}

// Função para criar a tabela de usuários
const createDBAndTable = async () => {
  try {
    await createDB(); // Verifica e cria o banco de dados, se necessário
    await pool.query(createTableQuery);
    console.log('Tabela de usuários criada com sucesso.');
    return; // Retorna após a criação da tabela
  } catch (error) {
    console.error('Erro ao criar tabela de usuários:', error);
    throw error; // Lança o erro para ser tratado pelo código que chamou esta função
  }
}

module.exports = { createDBAndTable, pool };

