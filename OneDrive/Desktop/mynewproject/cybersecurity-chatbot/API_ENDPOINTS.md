# 🤖 Cybersecurity Chatbot API Endpoints

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require authentication via bearer token in the `Authorization` header:
```
Authorization: valid-token
```

---

## Endpoints

### 1. **Health Check** (No Auth Required)
- **Endpoint:** `GET /api/health`
- **Description:** Check if the server is running
- **Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-04T22:15:05.411Z",
  "service": "cybersecurity-chatbot"
}
```

### 2. **Root Endpoint** (No Auth Required)
- **Endpoint:** `GET /`
- **Description:** Get API information and available endpoints
- **Response:**
```json
{
  "message": "Welcome to the Cybersecurity Chatbot API",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /api/health",
    "chat": "POST /api/chat/message",
    "topics": "GET /api/chat/topics",
    "search": "GET /api/chat/search?q=<query>",
    "topicInfo": "GET /api/chat/topic/<topicName>"
  }
}
```

### 3. **Send Chat Message** (Auth Required)
- **Endpoint:** `POST /api/chat/message`
- **Headers:** 
  - `Authorization: valid-token`
  - `Content-Type: application/json`
- **Body:**
```json
{
  "message": "What is phishing?"
}
```
- **Response:**
```json
{
  "response": "Phishing is a cyber attack where attackers impersonate legitimate organizations...",
  "timestamp": "2025-12-04T22:15:05.411Z",
  "status": "success"
}
```

### 4. **Get All Topics** (Auth Required)
- **Endpoint:** `GET /api/chat/topics`
- **Headers:** `Authorization: valid-token`
- **Response:**
```json
{
  "topics": ["phishing", "malware", "ransomware", "firewall", ...],
  "total": 12,
  "timestamp": "2025-12-04T22:15:05.411Z"
}
```

### 5. **Search Topics** (Auth Required)
- **Endpoint:** `GET /api/chat/search?q=<query>`
- **Headers:** `Authorization: valid-token`
- **Example:** `GET /api/chat/search?q=firewall`
- **Response:**
```json
{
  "query": "firewall",
  "results": {
    "firewall": "A network security device that monitors and controls..."
  },
  "found": 1,
  "timestamp": "2025-12-04T22:15:05.411Z"
}
```

### 6. **Get Specific Topic** (Auth Required)
- **Endpoint:** `GET /api/chat/topic/<topicName>`
- **Headers:** `Authorization: valid-token`
- **Example:** `GET /api/chat/topic/phishing`
- **Response:**
```json
{
  "topic": "phishing",
  "description": "Phishing is a type of cyber attack...",
  "timestamp": "2025-12-04T22:15:05.411Z"
}
```

---

## Supported Topics

The chatbot has knowledge about the following cybersecurity topics:

1. **Phishing** - Social engineering attacks via email
2. **Malware** - Malicious software and protection
3. **Ransomware** - File encryption and extortion attacks
4. **Social Engineering** - Psychological manipulation tactics
5. **Firewall** - Network security devices
6. **Encryption** - Data protection methods
7. **Two-Factor Authentication (2FA)** - Multi-factor security
8. **Data Breach** - Unauthorized data access
9. **VPN** - Virtual Private Network security
10. **Cybersecurity Frameworks** - Industry standards
11. **Password Security** - Strong password practices
12. **Zero Trust Security** - Modern security models

---

## Testing Examples

### Using cURL
```bash
# Health Check
curl http://localhost:3000/api/health

# Chat with authentication
curl -X POST http://localhost:3000/api/chat/message \
  -H "Authorization: valid-token" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is phishing?"}'
```

### Using PowerShell
```powershell
# Health Check
Invoke-WebRequest http://localhost:3000/api/health

# Chat Message
$headers = @{"Authorization" = "valid-token"; "Content-Type" = "application/json"}
$body = @{"message" = "Tell me about malware"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/chat/message" -Method POST -Headers $headers -Body $body
```

---

## Features

✅ **Real-time Chat** - Instant responses to cybersecurity questions  
✅ **Knowledge Base** - Comprehensive cybersecurity topics  
✅ **Authentication** - Secure token-based access  
✅ **Search Functionality** - Find topics by keyword  
✅ **RESTful API** - Clean, standard HTTP endpoints  
✅ **Error Handling** - Proper error responses with status codes  
✅ **Timestamps** - All responses include timestamps  

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing parameters) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (invalid token) |
| 404 | Not Found (endpoint or resource not found) |
| 500 | Internal Server Error |

---

## Project Structure

```
cybersecurity-chatbot/
├── src/
│   ├── index.ts              # Express server entry point
│   ├── chatbot.ts            # Main chatbot class
│   ├── controllers/
│   │   └── messageController.ts    # Request handlers
│   ├── services/
│   │   ├── aiService.ts      # AI response generation
│   │   └── knowledgeBase.ts  # Knowledge base management
│   ├── routes/
│   │   └── chatRoutes.ts     # API routes
│   ├── middleware/
│   │   ├── authentication.ts # Token validation
│   │   └── validation.ts     # Request validation
│   ├── types/
│   │   ├── chatbot.ts        # TypeScript types
│   │   ├── index.ts
│   │   └── user.ts
│   └── utils/
│       ├── logger.ts         # Logging utility
│       └── helpers.ts
├── data/
│   ├── cybersecurity-topics.json    # Topic database
│   └── training-data.json           # Training data
├── tests/
│   ├── chatbot.test.ts
│   ├── services.test.ts
│   └── routes.test.ts
├── config/
│   └── config.ts             # Configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
cd cybersecurity-chatbot
npm install
```

### Running the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### Running Tests
```bash
npm test
```

---

## Environment Variables

Create a `.env` file:
```
PORT=3000
NODE_ENV=development
```

---

## License

MIT License - See LICENSE file for details

---

**Made with ❤️ for Cybersecurity Awareness**
