// db.js
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.local'
});

const { Pool } = require('pg');

const pool = new Pool({
  // si tienes DATABASE_URL en producción, pg lo detecta solo:
  connectionString: process.env.DATABASE_URL,
  // para local puedes seguir usando las variables sueltas:
  user:     process.env.PGUSER,
  host:     process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port:     parseInt(process.env.PGPORT, 10),
  // si Railway te exige SSL:
  // ssl: { rejectUnauthorized: false }
});

module.exports = pool;
