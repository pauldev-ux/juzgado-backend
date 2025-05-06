// index.js
// ─────────────────────────────────────────────────────────────────────────────
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.local'
});

const express = require('express');
const cors = require('cors');
const db = require('./db');          // tu pool de pg ya configurado para leer env
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Puerto
const PORT = parseInt(process.env.PORT, 10) || 3001;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡API funcionando correctamente!');
});

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/administradores', require('./routes/administradorRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/abogados', require('./routes/abogadoRoutes'));
app.use('/api/jueces', require('./routes/juezRoutes'));
app.use('/api/expedientes', require('./routes/expedienteRoutes'));

// Verificamos conexión a la DB y luego levantamos el servidor
db.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err);
    process.exit(1);
  }
  console.log('✅ Conexión exitosa a PostgreSQL. Fecha actual:', result.rows[0].now);
  app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT} (env: ${process.env.NODE_ENV})`);
  });
});
