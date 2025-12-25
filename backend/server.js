const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const submitRoutes = require('./routes/submit');
const contactRoutes = require('./routes/contact');
const CONSTANTS = require('../config/constants');

const app = express();

// Middleware
app.use(cors({ origin: CONSTANTS.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/badges', express.static(path.join(__dirname, '../badges')));
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api', submitRoutes);
app.use('/api', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(CONSTANTS.PORT, () => {
  console.log(`Server running on port ${CONSTANTS.PORT}`);
  console.log(`Frontend: http://localhost:${CONSTANTS.PORT}`);
  console.log(`API: http://localhost:${CONSTANTS.PORT}/api`);
});