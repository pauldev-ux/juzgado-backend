const express = require('express');
const router = express.Router();
const { getAdministradores, crearAdministrador } = require('../controllers/administradorController');

router.get('/', getAdministradores);
router.post('/', crearAdministrador);


module.exports = router;
