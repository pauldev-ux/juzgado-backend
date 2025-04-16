const db = require('../db');

const getJueces = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM jueces');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener jueces:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crearJuez = async (req, res) => {
  const { nombre, apellido, carnet_identidad, email, password } = req.body;

  try {
    await db.query(
      'INSERT INTO jueces (nombre, apellido, carnet_identidad, email, password) VALUES ($1, $2, $3, $4, $5)',
      [nombre, apellido, carnet_identidad, email, password]
    );
    res.status(201).json({ mensaje: 'Juez creado correctamente' });
  } catch (error) {
    console.error('Error al crear juez:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  getJueces,
  crearJuez
};
