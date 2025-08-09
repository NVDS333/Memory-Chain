const express = require('express');
const sql = require('mssql');
const router = express.Router();

const config = {
  user: 'NVDS\NVDS',
  password: 'PRIcole213075#',
  server: 'localhost',
  database: 'MemoryChainDB',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

router.post('/', async (req, res) => {
  const { amount, storyId, donorName } = req.body;

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Donations (Amount, StoryId, DonorName, Timestamp)
      VALUES (${amount}, ${storyId}, ${donorName}, GETDATE());
    `;

    res.status(201).json({ message: 'Donation recorded successfully' });
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ message: 'Error saving donation' });
  }
});

router.get('/:storyId', async (req, res) => {
  const { storyId } = req.params;

  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT * FROM Donations WHERE StoryId = ${storyId}
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

module.exports = router;