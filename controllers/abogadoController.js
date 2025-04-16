const db = require('../db');

const getAbogados = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM abogados');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener abogados:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crearAbogado = async (req, res) => {
  const { nombre, apellido, carnet_identidad, email, password } = req.body;

  try {
    await db.query(
      'INSERT INTO abogados (nombre, apellido, carnet_identidad, email, password) VALUES ($1, $2, $3, $4, $5)',
      [nombre, apellido, carnet_identidad, email, password]
    );
    res.status(201).json({ mensaje: 'Abogado creado correctamente' });
  } catch (error) {
    console.error('Error al crear abogado:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  getAbogados,
  crearAbogado
};
