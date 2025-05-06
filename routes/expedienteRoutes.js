const express = require('express');
const router = express.Router();
const { getExpedientes, crearExpediente, getClientes, getAbogados, getJueces,  deleteExpediente, updateExpediente, getExpedientesByAbogado, getExpedientesByJuez } = require('../controllers/expedienteController');


router.get('/', getExpedientes);
router.post('/', crearExpediente);

// Rutas para obtener los datos de clientes, abogados y jueces
router.get('/clientes', getClientes);
router.get('/abogados', getAbogados);
router.get('/jueces', getJueces);

// Rutas para eliminar y editar expedientes
router.delete('/delete/:id', deleteExpediente);  // Eliminar expediente
router.put('/update/:id', updateExpediente);  // Actualizar expediente

router.get('/abogado/:carnet', getExpedientesByAbogado);
router.get('/juez/:carnet', getExpedientesByJuez);

module.exports = router;
