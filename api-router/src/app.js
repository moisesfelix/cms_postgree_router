require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const routerRoutes = require('./routes/routerRoutes');
const app = express();

app.use(express.json()); // Parseia o corpo das solicitações JSON

app.use('/routers', routerRoutes);

module.exports = app;
