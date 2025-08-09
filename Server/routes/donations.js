const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.post('/submit-donation', async (req, res) => {
  const { donorName, amount, purpose, message } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('DonorName', sql.NVarChar, donorName)
      .input('Amount', sql.Decimal(10, 2), amount)
      .input('Purpose', sql.NVarChar, purpose)
      .input('Message', sql.NVarChar, message)
      .query(`
        INSERT INTO Donations (DonorName, Amount, Purpose, Message)
        VALUES (@DonorName, @Amount, @Purpose, @Message)
      `);

    res.status(200).json({ message: 'Donation submitted successfully!' });
  } catch (err) {
    console.error('Error submitting donation:', err);
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

module.exports = router;