// D:\JUZGADOSC\backendsc\index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡API funcionando correctamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const db = require('./db');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err);
  } else {
    console.log('Conexión exitosa a PostgreSQL. Fecha actual:', res.rows[0]);
  }
});


const adminRoutes = require('./routes/administradorRoutes');
app.use('/api/administradores', adminRoutes);

const clienteRoutes = require('./routes/clienteRoutes');
app.use('/api/clientes', clienteRoutes);

const abogadoRoutes = require('./routes/abogadoRoutes');
app.use('/api/abogados', abogadoRoutes);

const juezRoutes = require('./routes/juezRoutes');
app.use('/api/jueces', juezRoutes);

const expedienteRoutes = require('./routes/expedienteRoutes');
app.use('/api/expedientes', expedienteRoutes);






