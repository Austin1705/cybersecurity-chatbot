const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load topics
let topics = [];
try {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/cybersecurity-topics.json'), 'utf8'));
  topics = data.cybersecurity_topics.map(t => t.topic);
} catch (e) {
  console.error('Failed to load topics:', e.message);
}

// Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== 'valid-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Cybersecurity Chatbot',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      topics: 'GET /api/chat/topics',
      chat: 'POST /api/chat/message',
      search: 'GET /api/chat/search?q=<query>'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'cybersecurity-chatbot' });
});

app.get('/api/chat/topics', auth, (req, res) => {
  res.json({ topics, total: topics.length });
});

app.post('/api/chat/message', auth, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  
  res.json({
    message,
    response: `I received your message about "${message}". Learn more about cybersecurity best practices to stay safe online.`
  });
});

app.get('/api/chat/search', auth, (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = topics.filter(t => t.toLowerCase().includes(q));
  res.json({ query: q, results, found: results.length });
});

const server = app.listen(PORT, () => {
  console.log(`[INFO] ${new Date().toISOString()}: Server running on port ${PORT}`);
});

process.on('uncaughtException', err => console.error('Error:', err));
process.stdin.resume();
