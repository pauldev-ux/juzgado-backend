const db = require('../db');

// Obtener lista de abogados
const getAbogados = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM abogados');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener abogados:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener abogado por ID
const getAbogadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM abogados WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el abogado:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear abogado
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

// Actualizar abogado
const updateAbogado = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, carnet_identidad, email, password } = req.body;
  try {
    const result = await db.query(
      `UPDATE abogados SET nombre = $1, apellido = $2, carnet_identidad = $3, email = $4, password = $5
       WHERE id = $6 RETURNING *`,
      [nombre, apellido, carnet_identidad, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }

    res.status(200).json({ mensaje: 'Abogado actualizado correctamente', abogado: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el abogado:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el abogado' });
  }
};

// Eliminar abogado
const deleteAbogado = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM abogados WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Abogado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el abogado:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el abogado' });
  }
};

module.exports = {
  getAbogados,
  getAbogadoById,
  crearAbogado,
  updateAbogado,
  deleteAbogado
};
