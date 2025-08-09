const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: process.env.DB_USER
    ? undefined
    : { type: 'ntlm', options: { domain: 'NVDS' } }, // for Windows Auth
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database connection failed:', err));

module.exports = { sql, poolPromise };