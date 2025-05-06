// db.js
require('dotenv').config({
  path: process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.local',
    override: true
});

const { Pool } = require('pg');
const isProd = process.env.NODE_ENV === 'production';

const config = isProd
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      user:     process.env.PGUSER,
      host:     process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port:     Number(process.env.PGPORT),
    };

const pool = new Pool(config);
module.exports = pool;
