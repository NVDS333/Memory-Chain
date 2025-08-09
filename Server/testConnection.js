const sql = require('mssql');

const config = {
  user: 'NVDS\NVDS',
  password: 'PRIcole213075#',
  server: 'localhost',
  database: 'MemoryChainDB',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  port: 1433
};

(async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server!');
    await pool.close();
  } catch (err) {
    console.error('Connection failed:', err);
  }
})();