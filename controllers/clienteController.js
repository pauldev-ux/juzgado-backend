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
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};



// Obtener perfil del cliente y sus expedientes asociados
const getPerfilCliente = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar datos del cliente
    const clienteResult = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (clienteResult.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const cliente = clienteResult.rows[0];

    // Buscar expedientes donde el cliente es demandante o demandado
    const expedienteResult = await db.query(
      `SELECT * FROM expedientes 
       WHERE demandante_carnet = $1 OR demandado_carnet = $1`,
      [cliente.carnet_identidad]
    );

    res.json({
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        carnet_identidad: cliente.carnet_identidad,
        email: cliente.email,
      },
      expedientes: expedienteResult.rows
    });

  } catch (error) {
    console.error('Error en getPerfilCliente:', error);
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

// Actualizar un cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, carnet_identidad, email, password } = req.body;

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

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id } = req.params;

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
  getClienteById,
  getPerfilCliente, // <- NUEVO
  crearCliente,
  updateCliente,
  deleteCliente
};
