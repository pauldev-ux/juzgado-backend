const db = require('../db');

// DEFINIR ESTA FUNCIÓN si no existe aún
const getAdministradores = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, email FROM administradores');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crearAdministrador = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    await db.query(
      'INSERT INTO administradores (nombre, apellido, email, password) VALUES ($1, $2, $3, $4)',
      [nombre, apellido, email, password]
    );
    res.status(201).json({ mensaje: 'Administrador creado correctamente' });
  } catch (error) {
    console.error('Error al crear administrador:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  getAdministradores,
  crearAdministrador
};
