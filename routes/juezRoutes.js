const express = require('express');
const router = express.Router();
const {
  getJueces,
  getJuezById,
  crearJuez,
  updateJuez,
  deleteJuez
} = require('../controllers/juezController');

// Obtener todos los jueces
router.get('/', getJueces);

// Obtener un juez por ID
router.get('/:id', getJuezById);

// Crear un nuevo juez
router.post('/', crearJuez);

// Actualizar un juez existente
router.put('/update/:id', updateJuez);

// Eliminar un juez
router.delete('/delete/:id', deleteJuez);

module.exports = router;
