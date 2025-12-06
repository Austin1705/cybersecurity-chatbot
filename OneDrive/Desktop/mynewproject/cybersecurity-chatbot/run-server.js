const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// Load topics
let topics = [];
try {
  const topicsPath = path.join(__dirname, 'data/cybersecurity-topics.json');
  const data = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
  topics = data.cybersecurity_topics.map(t => t.topic);
  console.error(`[✓] Loaded ${topics.length} topics`);
} catch (e) {
  console.error(`[✗] Failed to load topics: ${e.message}`);
  topics = ['Phishing', 'Malware'];
}

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (pathname === '/') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Cybersecurity Chatbot API', version: '1.0.0', topics: topics.length }));
    } else if (pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'healthy', service: 'chatbot' }));
    } else if (pathname === '/api/chat/topics') {
      res.writeHead(200);
      res.end(JSON.stringify({ topics, total: topics.length }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (err) {
    console.error(`[✗] Request error: ${err.message}`);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Server error' }));
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.error(`[✓] Server running on http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  console.error(`[✗] Server error: ${err.message}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[✗] Exception: ${err.message}`);
  process.exit(1);
});

// Keep running indefinitely
setInterval(() => {}, 999999);
