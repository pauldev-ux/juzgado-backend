const express = require('express');
const router = express.Router();
const { getAbogados, crearAbogado } = require('../controllers/abogadoController');

router.get('/', getAbogados);
router.post('/', crearAbogado);

module.exports = router;
