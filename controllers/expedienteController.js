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

module.exports = {
  getExpedientes,
  crearExpediente
};
