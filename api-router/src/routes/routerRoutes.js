// src/routes/routerRoutes.js
const express = require('express');
const { validateCreateRouter } = require('../middlewares/validateInput');
const RouterController = require('../controllers/routerController');

const router = express.Router();

router.post('/', RouterController.getTheBestRoutes);

module.exports = router;
