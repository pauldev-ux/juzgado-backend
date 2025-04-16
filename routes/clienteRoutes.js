const express = require('express');
const router = express.Router();
const { getClientes, crearCliente } = require('../controllers/clienteController');

router.get('/', getClientes);
router.post('/', crearCliente);

module.exports = router;
