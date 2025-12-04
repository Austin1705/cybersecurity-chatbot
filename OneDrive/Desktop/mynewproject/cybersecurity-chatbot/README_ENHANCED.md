# 🛡️ Cybersecurity Awareness AI Chatbot

A comprehensive, intelligent chatbot application designed to educate users about cybersecurity threats, best practices, and awareness. Built with TypeScript, Express.js, and featuring an intelligent knowledge base system.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **🤖 AI-Powered Responses**: Intelligent message processing with context-aware responses
- **📚 Comprehensive Knowledge Base**: Covers phishing, malware, ransomware, encryption, VPN, 2FA, and more
- **🔐 Authentication**: Token-based authentication for secure API access
- **✅ Message Validation**: Input validation to ensure data integrity
- **📊 Topic Search**: Search and filter cybersecurity topics
- **🏥 Health Monitoring**: Health check endpoint for service monitoring
- **📝 Detailed Logging**: Comprehensive logging for debugging and monitoring
- **🧪 Unit Tests**: Full test coverage for reliability
- **🔄 Extensible Architecture**: Easy to add new topics and features

## 🏗️ Project Structure

```
cybersecurity-chatbot/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── chatbot.ts                  # Core chatbot logic
│   ├── controllers/
│   │   └── messageController.ts    # Request handlers for chat messages
│   ├── services/
│   │   ├── aiService.ts           # AI response generation engine
│   │   └── knowledgeBase.ts       # Knowledge base management
│   ├── routes/
│   │   └── chatRoutes.ts          # API route definitions
│   ├── middleware/
│   │   ├── authentication.ts      # Token-based authentication
│   │   └── validation.ts          # Message validation logic
│   ├── utils/
│   │   ├── logger.ts              # Logging utility
│   │   └── helpers.ts             # Helper functions
│   └── types/
│       ├── index.ts               # Common type definitions
│       ├── chatbot.ts             # Chatbot-related types
│       └── user.ts                # User-related types
├── data/
│   ├── cybersecurity-topics.json  # Topic knowledge base
│   └── training-data.json         # Training datasets
├── tests/
│   ├── chatbot.test.ts            # Chatbot unit tests
│   ├── services.test.ts           # Service unit tests
│   └── routes.test.ts             # Route unit tests
├── config/
│   └── config.ts                  # Configuration settings
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 14+ or higher
- npm 6+

### Steps

1. **Clone or navigate to the repository**:
   ```bash
   cd cybersecurity-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install TypeScript compiler globally** (optional but recommended):
   ```bash
   npm install -g typescript
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root (use `.env.example` as a template):

```env
PORT=3000
NODE_ENV=development
AUTH_TOKEN=valid-token
LOG_LEVEL=info
```

### Configuration File

Edit `config/config.ts` to customize application behavior:

```typescript
export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    authToken: process.env.AUTH_TOKEN || 'valid-token'
};
```

## 🎯 Running the Application

### Development Mode

```bash
npm start
```

This will start the server on `http://localhost:3000` with hot-reload enabled via ts-node.

### Build for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

## 📡 API Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the service is running.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T21:36:57.855Z",
  "service": "cybersecurity-chatbot"
}
```

### 2. Send Chat Message
**POST** `/api/chat/message`

Send a message to the chatbot and receive an intelligent response.

**Headers**:
```
Authorization: valid-token
Content-Type: application/json
```

**Request Body**:
```json
{
  "message": "What is phishing?"
}
```

**Response**:
```json
{
  "response": "📚 **Phishing**: Phishing is a type of cyber attack where attackers impersonate legitimate organizations to steal sensitive information.",
  "timestamp": "2025-12-03T21:36:57.855Z",
  "status": "success"
}
```

### 3. Get All Topics
**GET** `/api/chat/topics`

Retrieve all available cybersecurity topics in the knowledge base.

**Headers**:
```
Authorization: valid-token
```

**Response**:
```json
{
  "topics": ["phishing", "malware", "ransomware", "encryption", "vpn", ...],
  "total": 15,
  "timestamp": "2025-12-03T21:36:57.855Z"
}
```

### 4. Search Topics
**GET** `/api/chat/search?q=encryption`

Search for topics based on keywords.

**Headers**:
```
Authorization: valid-token
```

**Response**:
```json
{
  "query": "encryption",
  "results": {
    "encryption": "The process of converting information into a code to prevent unauthorized access."
  },
  "found": 1,
  "timestamp": "2025-12-03T21:36:57.855Z"
}
```

### 5. Get Topic Details
**GET** `/api/chat/topic/{topicName}`

Get detailed information about a specific security topic.

**Headers**:
```
Authorization: valid-token
```

**Response**:
```json
{
  "topic": "phishing",
  "description": "A type of cyber attack where attackers impersonate legitimate organizations to steal sensitive information.",
  "timestamp": "2025-12-03T21:36:57.855Z"
}
```

## 🧪 Testing

Run the unit test suite:

```bash
npm test
```

### Test Structure
- **chatbot.test.ts**: Tests for core chatbot functionality
- **services.test.ts**: Tests for AI and Knowledge Base services
- **routes.test.ts**: Tests for API endpoints

## 📊 Covered Topics

The knowledge base includes information on:

- **Phishing**: Social engineering attacks via email
- **Malware**: Malicious software threats
- **Ransomware**: Data encryption attacks
- **Social Engineering**: Psychological manipulation tactics
- **Firewalls**: Network security devices
- **Encryption**: Data protection methods
- **Two-Factor Authentication (2FA)**: Enhanced account security
- **Data Breaches**: Unauthorized data access incidents
- **VPN (Virtual Private Network)**: Secure network connections
- **Cybersecurity Frameworks**: Industry best practices

## 🔒 Authentication

The API uses token-based authentication. Include the authorization header in all requests:

```
Authorization: valid-token
```

Default token: `valid-token`

To change the token, update the `.env` file or `config/config.ts`.

## 📝 Logging

The application includes comprehensive logging:

- **INFO**: General information messages
- **ERROR**: Error messages and stack traces
- **DEBUG**: Detailed debugging information (in development mode)

View logs in the console output with timestamp prefixes.

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 👨‍💻 Author

Austin - [Your GitHub Profile](https://github.com/Austin1705)

## 📞 Support

For support, email support@example.com or open an issue in the GitHub repository.

---

**Last Updated**: December 3, 2025  
**Version**: 1.0.0
