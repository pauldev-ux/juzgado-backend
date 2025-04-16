const db = require('../db');

const getClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crearCliente = async (req, res) => {
  const { nombre, apellido, carnet_identidad, email, password } = req.body;

  try {
    await db.query(
      'INSERT INTO clientes (nombre, apellido, carnet_identidad, email, password) VALUES ($1, $2, $3, $4, $5)',
      [nombre, apellido, carnet_identidad, email, password]
    );
    res.status(201).json({ mensaje: 'Cliente creado correctamente' });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  getClientes,
  crearCliente
};
