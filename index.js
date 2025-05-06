// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');   // aquí ya se cargan tus env vars

// Opcional: verificar que las envs llegan bien
console.log({
  NODE_ENV:   process.env.NODE_ENV,
  PORT:       process.env.PORT,
  PGHOST:     process.env.PGHOST,
  PGUSER:     process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT:     process.env.PGPORT,
});

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.send('¡API funcionando correctamente!'));
app.use('/api/auth',          require('./routes/authRoutes'));
app.use('/api/administradores',require('./routes/administradorRoutes'));
app.use('/api/clientes',      require('./routes/clienteRoutes'));
app.use('/api/abogados',      require('./routes/abogadoRoutes'));
app.use('/api/jueces',        require('./routes/juezRoutes'));
app.use('/api/expedientes',   require('./routes/expedienteRoutes'));

// Arranca el servidor **sólo** después de comprobar la DB
const PORT = Number(process.env.PORT) || 3001;
db.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err);
    process.exit(1);
  }
  console.log('✅ Conexión a PostgreSQL OK. Fecha:', result.rows[0].now);
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT} (env: ${process.env.NODE_ENV})`);
  });
});
