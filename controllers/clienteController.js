const db = require('../db');

// Obtener lista de clientes
const getClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, apellido, carnet_identidad, email FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener cliente por ID
const getClienteById = async (req, res) => {
  const { id } = req.params;  // Obtener el id del cliente desde los parámetros de la URL
  try {
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);  // Devolver el cliente encontrado
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear un nuevo cliente
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

// Actualizar un cliente por ID
const updateCliente = async (req, res) => {
  const { id } = req.params;  // Obtener el id del cliente desde los parámetros de la URL
  const { nombre, apellido, carnet_identidad, email, password } = req.body;  // Datos del cliente a actualizar

  try {
    const result = await db.query(
      `UPDATE clientes SET nombre = $1, apellido = $2, carnet_identidad = $3, email = $4, password = $5
       WHERE id = $6 RETURNING *`,
      [nombre, apellido, carnet_identidad, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente actualizado correctamente', cliente: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente por ID
const deleteCliente = async (req, res) => {
  const { id } = req.params;  // Obtenemos el id del cliente desde los parámetros de la URL

  try {
    const result = await db.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });

  } catch (err) {
    console.error('Error al eliminar el cliente:', err);
    res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
  }
};

module.exports = {
  getClientes,
  getClienteById,  // Nueva función para obtener el cliente por ID
  crearCliente,
  updateCliente,  
  deleteCliente
};
