const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());  // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json());  // Permite que el servidor maneje JSON en las solicitudes

// Ruta raíz para verificar que la API esté funcionando
app.get('/', (req, res) => {
  res.send('¡API funcionando correctamente!');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/administradorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const abogadoRoutes = require('./routes/abogadoRoutes');
const juezRoutes = require('./routes/juezRoutes');
const expedienteRoutes = require('./routes/expedienteRoutes');

// Configuración de rutas
app.use('/api/auth', authRoutes);
app.use('/api/administradores', adminRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/abogados', abogadoRoutes);
app.use('/api/jueces', juezRoutes);
app.use('/api/expedientes', expedienteRoutes);

// Conexión a la base de datos PostgreSQL
const db = require('./db');

// Verificar la conexión a la base de datos
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err);
  } else {
    console.log('Conexión exitosa a PostgreSQL. Fecha actual:', res.rows[0]);
  }
});
