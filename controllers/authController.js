const jwt = require('jsonwebtoken');
const db = require('../db');

const SECRET_KEY = 'mi_clave_secreta';

const login = async (req, res) => {
  const { email, password } = req.body;

  // Definir las tablas y redirecciones por rol
  const usuarios = [
    { tabla: 'administradores', rol: 'administrador', redirect: '/admin/dashboard' },
    { tabla: 'clientes', rol: 'cliente', redirect: '/cliente/dashboard' },
    { tabla: 'abogados', rol: 'abogado', redirect: '/abogado/dashboard' },
    { tabla: 'jueces', rol: 'juez', redirect: '/juez/dashboard' },
  ];

  try {
    for (const usuario of usuarios) {
      const result = await db.query(`SELECT * FROM ${usuario.tabla} WHERE email = $1`, [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];

        // Verificación simple (ajusta si usas bcrypt)
        if (user.password !== password) {
          return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Crear token
        const token = jwt.sign(
          { id: user.id, email: user.email, rol: usuario.rol },
          SECRET_KEY,
          { expiresIn: '2h' }
        );

        return res.json({
          mensaje: 'Login exitoso',
          token,
          usuario: {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            carnet_identidad: user.carnet_identidad,
            rol: usuario.rol
          },
          redirect: usuario.redirect
        });
      }
    }

    // Si no se encuentra en ninguna tabla
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
