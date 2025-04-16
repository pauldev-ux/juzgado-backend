const express = require('express');
const router = express.Router();
const { getJueces, crearJuez } = require('../controllers/juezController');

router.get('/', getJueces);
router.post('/', crearJuez);



module.exports = router;
