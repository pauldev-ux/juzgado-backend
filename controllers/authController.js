const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const SECRET_KEY = 'mi_clave_secreta';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar administrador
    const result = await db.query('SELECT * FROM administradores WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }

    const admin = result.rows[0];

    // Comparar contraseñas (por ahora sin encriptación)
    if (admin.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, rol: 'administrador' },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: admin.id,
        nombre: admin.nombre,
        apellido: admin.apellido,
        rol: 'administrador'
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };



