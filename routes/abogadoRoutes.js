const express = require('express');
const router = express.Router();
const {
  getAbogados,
  getAbogadoById,
  crearAbogado,
  updateAbogado,
  deleteAbogado
} = require('../controllers/abogadoController');

// Obtener todos los abogados
router.get('/', getAbogados);

// Obtener un abogado por ID
router.get('/:id', getAbogadoById);

// Crear un nuevo abogado
router.post('/', crearAbogado);

// Actualizar un abogado existente
router.put('/update/:id', updateAbogado);

// Eliminar un abogado
router.delete('/delete/:id', deleteAbogado);

module.exports = router;
