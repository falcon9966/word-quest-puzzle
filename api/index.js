const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

app.all('/api/*', (req, res) => {
  res.status(404).json({ message: 'Not implemented in minimal test' });
});

module.exports = app;
