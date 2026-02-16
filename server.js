const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// PDQ API configuration
// Dev: https://api.dev.pdq.aws.keyshare.tech/
// Prod: https://api.pdqspirit.com
const PDQ_API_BASE = process.env.PDQ_API_URL || 'https://api.dev.pdq.aws.keyshare.tech/';
const PDQ_API_KEY = process.env.PDQ_API_KEY || '';

const api = axios.create({
  baseURL: PDQ_API_BASE,
  headers: {
    'Authorization': `Bearer ${PDQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

app.use(express.json());
app.use(express.static('public'));

// Get all locks
app.get('/api/locks', async (req, res) => {
  try {
    const response = await api.get('/keyshare/locks');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching locks:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get lock by MAC
app.get('/api/locks/:mac', async (req, res) => {
  try {
    const response = await api.get(`/keyshare/locks/${req.params.mac}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lock/unlock a door
app.post('/api/locks/:mac/state', async (req, res) => {
  try {
    const { locked } = req.body;
    const response = await api.put(`/keyshare/locks/${req.params.mac}/state`, {
      locked
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all lock groups
app.get('/api/groups', async (req, res) => {
  try {
    const response = await api.get('/keyshare/lock-groups');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get locations
app.get('/api/locations', async (req, res) => {
  try {
    const response = await api.get('/keyshare/locations');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity logs for a lock
app.get('/api/locks/:mac/activity', async (req, res) => {
  try {
    const response = await api.get(`/keyshare/activity/${req.params.mac}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get access users for a lock
app.get('/api/locks/:mac/access-users', async (req, res) => {
  try {
    const response = await api.get(`/keyshare/locks/${req.params.mac}/access-users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    apiBase: PDQ_API_BASE,
    isDev: PDQ_API_BASE.includes('dev')
  });
});

app.listen(PORT, () => {
  console.log(`PDQ Locks Web App running on port ${PORT}`);
  console.log(`API Base URL: ${PDQ_API_BASE}`);
  console.log(`Environment: ${PDQ_API_BASE.includes('dev') ? 'DEVELOPMENT' : 'PRODUCTION'}`);
});
