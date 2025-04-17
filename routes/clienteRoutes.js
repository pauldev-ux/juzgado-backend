const express = require('express');
const router = express.Router();
const { getClientes, getClienteById, crearCliente, updateCliente, deleteCliente } = require('../controllers/clienteController');

// Ruta para obtener la lista de clientes
router.get('/', getClientes);

// Ruta para obtener un cliente por ID
router.get('/:id', getClienteById);  // Agregamos la ruta para obtener el cliente por ID

// Ruta para crear un nuevo cliente
router.post('/', crearCliente);

// Ruta para actualizar un cliente por ID
router.put('/update/:id', updateCliente);  // Ruta PUT para actualizar el cliente por ID

// Ruta para eliminar un cliente por ID
router.delete('/delete/:id', deleteCliente);

module.exports = router;
