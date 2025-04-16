const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // tu usuario de PostgreSQL
  host: 'localhost',        // o el host de tu servidor
  database: 'juzgado',   // cambia por el nombre real de tu base
  password: '123456',  // tu contraseña real
  port: 5432,               // por defecto PostgreSQL usa este puerto
});

module.exports = pool;
