const express = require('express');
const app = express();
const storyRoutes = require('./routes/stories');
const donationRoutes = require('./routes/donations');

app.use('/api', donationRoutes);
app.use(express.json());
app.use('/api', storyRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});