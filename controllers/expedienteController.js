const db = require('../db');

const getExpedientes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM expedientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener expedientes:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crearExpediente = async (req, res) => {
  const {
    demandante_carnet,
    demandado_carnet,
    abogado_demandante_carnet,
    abogado_demandado_carnet,
    juez_carnet,
    contenido
  } = req.body;

  try {
    await db.query(
      `INSERT INTO expedientes 
        (demandante_carnet, demandado_carnet, abogado_demandante_carnet, abogado_demandado_carnet, juez_carnet, contenido)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [demandante_carnet, demandado_carnet, abogado_demandante_carnet, abogado_demandado_carnet, juez_carnet, contenido]
    );
    res.status(201).json({ mensaje: 'Expediente creado correctamente' });
  } catch (error) {
    console.error('Error al crear expediente:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


// Obtener clientes
const getClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, carnet_identidad FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener abogados
const getAbogados = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, carnet_identidad FROM abogados');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener abogados:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener jueces
const getJueces = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, carnet_identidad FROM jueces');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener jueces:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


// Eliminar un expediente por ID
const deleteExpediente = async (req, res) => {
  const { id } = req.params;  // Obtenemos el id del expediente desde los parámetros de la URL

  try {
    const result = await db.query('DELETE FROM expedientes WHERE numero_expediente = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Expediente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Expediente eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el expediente:', err);
    res.status(500).json({ mensaje: 'Error al eliminar el expediente' });
  }
};

// Editar un expediente por ID
const updateExpediente = async (req, res) => {
  const { id } = req.params;  // Obtenemos el id del expediente desde los parámetros de la URL
  const { demandante_carnet, demandado_carnet, abogado_demandante_carnet, abogado_demandado_carnet, juez_carnet, contenido } = req.body;

  try {
    // Verificar si el expediente existe antes de intentar actualizarlo
    const checkExpediente = await db.query('SELECT * FROM expedientes WHERE numero_expediente = $1', [id]);

    if (checkExpediente.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Expediente no encontrado' });
    }

    // Consulta SQL para actualizar el expediente
    const result = await db.query(
      `UPDATE expedientes SET 
         demandante_carnet = $1, 
         demandado_carnet = $2, 
         abogado_demandante_carnet = $3, 
         abogado_demandado_carnet = $4, 
         juez_carnet = $5, 
         contenido = $6
       WHERE numero_expediente = $7 RETURNING *`,
      [demandante_carnet, demandado_carnet, abogado_demandante_carnet, abogado_demandado_carnet, juez_carnet, contenido, id]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ mensaje: 'Expediente actualizado exitosamente', expediente: result.rows[0] });
    } else {
      res.status(500).json({ mensaje: 'Error al actualizar el expediente' });
    }
  } catch (err) {
    console.error('Error al actualizar el expediente:', err);
    res.status(500).json({ mensaje: 'Error al actualizar el expediente' });
  }
};



module.exports = {
  getExpedientes,
  crearExpediente,
  getClientes,
  getAbogados,
  getJueces,
  deleteExpediente,
  updateExpediente,
};
