const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/locations', locationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
