const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../Client'));

const storyRoutes = require('./routes/stories');
const donationRoutes = require('./routes/donations');

app.use('/api/stories', storyRoutes);
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));