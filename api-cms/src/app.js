require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { createDBAndTable } = require('./config/database'); // Importa o arquivo de configuração do banco de dadosr

const app = express();

app.use(express.json()); // Parseia o corpo das solicitações JSON

app.use('/users', userRoutes);

createDBAndTable(); // Chama a função para criar o banco de dados e a tabela
module.exports = app;
