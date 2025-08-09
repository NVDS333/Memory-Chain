const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

router.post('/', async (req, res) => {
  const { name, location, event, story } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('AuthorName', name)
      .input('Location', location)
      .input('ClimateEvent', event)
      .input('StoryText', story)
      .query('INSERT INTO Stories (AuthorName, Location, ClimateEvent, StoryText) VALUES (@AuthorName, @Location, @ClimateEvent, @StoryText)');
    res.status(200).send({ message: 'Story saved successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;