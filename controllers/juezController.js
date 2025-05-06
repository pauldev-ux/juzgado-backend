const db = require('../db');

// Obtener lista de jueces
const getJueces = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM jueces');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener jueces:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener juez por ID
const getJuezById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM jueces WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Juez no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el juez:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear juez
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

// Actualizar juez
const updateJuez = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, carnet_identidad, email, password } = req.body;
  try {
    const result = await db.query(
      `UPDATE jueces SET nombre = $1, apellido = $2, carnet_identidad = $3, email = $4, password = $5
       WHERE id = $6 RETURNING *`,
      [nombre, apellido, carnet_identidad, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Juez no encontrado' });
    }

    res.status(200).json({ mensaje: 'Juez actualizado correctamente', juez: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el juez:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el juez' });
  }
};

// Eliminar juez
const deleteJuez = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM jueces WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Juez no encontrado' });
    }
    res.status(200).json({ mensaje: 'Juez eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el juez:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el juez' });
  }
};


// Obtener perfil del juez por carnet de identidad
const getPerfilJuez = async (req, res) => {
  const { carnet } = req.params;
  try {
    const result = await db.query('SELECT * FROM jueces WHERE carnet_identidad = $1', [carnet]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Juez no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil del juez:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};



module.exports = {
  getJueces,
  getJuezById,
  crearJuez,
  updateJuez,
  deleteJuez,
  getPerfilJuez  // 
};
