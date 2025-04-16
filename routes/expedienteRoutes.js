const express = require('express');
const router = express.Router();
const { getExpedientes, crearExpediente } = require('../controllers/expedienteController');

router.get('/', getExpedientes);
router.post('/', crearExpediente);


module.exports = router;
