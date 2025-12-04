# 🤖 Cybersecurity Chatbot - Production Deployment Guide

## 📋 Overview

The Cybersecurity Chatbot is a production-ready Express.js/TypeScript application designed for enterprise-grade cybersecurity awareness training. This guide covers deployment across multiple platforms.

## ✅ Pre-Deployment Verification

Your chatbot is ready for deployment! Here's what's been implemented:

### ✨ Features
- ✅ 6 RESTful API endpoints
- ✅ Bearer token authentication
- ✅ Knowledge base with 12 cybersecurity topics
- ✅ AI response generation
- ✅ Request validation & error handling
- ✅ Comprehensive logging
- ✅ Health check endpoints
- ✅ TypeScript type safety
- ✅ Docker containerization support
- ✅ PM2 process management
- ✅ CI/CD ready with GitHub Actions

### 📦 What's Included

```
cybersecurity-chatbot/
├── src/                          # Source code
├── data/                         # Knowledge base
├── tests/                        # Unit tests
├── logs/                         # Application logs
├── Dockerfile                    # Docker image definition
├── docker-compose.yml            # Docker Compose configuration
├── ecosystem.config.js           # PM2 configuration
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── DEPLOYMENT.md                 # Deployment overview
├── DEPLOYMENT_PLATFORMS.md       # Platform-specific guides
├── API_ENDPOINTS.md              # API documentation
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start Deployment

### Option 1: Local (Fastest)
```bash
cd cybersecurity-chatbot
npm install
npm start
# Server running on http://localhost:3000
```

### Option 2: Docker (Recommended for Production)
```bash
cd cybersecurity-chatbot
docker-compose up -d
# Server running on http://localhost:3000
```

### Option 3: PM2 (Process Management)
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
# Server managed by PM2
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Server
PORT=3000
NODE_ENV=production

# Authentication
AUTH_TOKEN=your-secure-token-here

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/server.log

# CORS
CORS_ORIGIN=*
```

### Secure Token Generation

Generate a strong token:
```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

---

## 📊 Available Endpoints

### Public Endpoints (No Auth)
- `GET /` - API information
- `GET /api/health` - Server health status
- `GET /api/metrics` - Detailed metrics
- `GET /api/status` - Quick status check

### Protected Endpoints (Require Token)
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/topics` - List all topics
- `GET /api/chat/search?q=<keyword>` - Search topics
- `GET /api/chat/topic/<name>` - Get topic details

### Example Request
```bash
curl -X GET http://localhost:3000/api/health

# With authentication
curl -H "Authorization: your-token" \
     http://localhost:3000/api/chat/topics
```

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop service
docker-compose down

# Rebuild
docker-compose build --no-cache
```

### Using Docker CLI

```bash
# Build
docker build -t cybersecurity-chatbot .

# Run
docker run -d \
  --name cybersecurity-chatbot \
  -p 3000:3000 \
  -e NODE_ENV=production \
  cybersecurity-chatbot

# Verify
docker logs cybersecurity-chatbot
curl http://localhost:3000/api/health
```

---

## ☁️ Cloud Deployment

### Heroku (Easiest)
```bash
heroku create cybersecurity-chatbot
git push heroku main
heroku open
```

### AWS EC2
```bash
# SSH into instance
ssh -i key.pem ec2-user@instance-ip

# Install Node & deploy
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install nodejs
git clone repo-url
cd cybersecurity-chatbot
npm install
pm2 start ecosystem.config.js --env production
```

### Google Cloud Run
```bash
gcloud run deploy cybersecurity-chatbot \
  --source . \
  --platform managed \
  --region us-central1
```

### Azure App Service
```bash
az webapp up --name cybersecurity-chatbot --runtime "NODE|16-lts"
```

---

## 🔒 Security Checklist

- [ ] Strong authentication token configured
- [ ] Environment variables secured (not in version control)
- [ ] HTTPS enabled in production
- [ ] CORS configured appropriately
- [ ] Rate limiting implemented
- [ ] Logging configured with sensitive data filtered
- [ ] Regular backups of data files
- [ ] Security headers configured
- [ ] Dependencies kept up to date

---

## 📈 Monitoring & Maintenance

### Health Check Endpoints

```bash
# Server health
curl http://localhost:3000/api/health

# Detailed metrics
curl http://localhost:3000/api/metrics

# Quick status
curl http://localhost:3000/api/status
```

### Log Management

```bash
# View logs
tail -f logs/server.log

# With PM2
pm2 logs cybersecurity-chatbot

# With Docker
docker logs -f cybersecurity-chatbot
```

### Performance Monitoring

- Response time: Monitor for > 200ms delays
- Error rate: Alert if > 1% of requests fail
- Uptime: Target 99.9% availability
- Memory usage: Alert if > 80% of limit
- CPU usage: Monitor for sustained high usage

---

## 📝 API Testing

### Health Check
```powershell
Invoke-WebRequest http://localhost:3000/api/health
```

### Chat Message
```powershell
$headers = @{"Authorization" = "valid-token"; "Content-Type" = "application/json"}
$body = @{"message" = "What is phishing?"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/chat/message" `
  -Method POST -Headers $headers -Body $body
```

### Get Topics
```powershell
$headers = @{"Authorization" = "valid-token"}
Invoke-WebRequest -Uri "http://localhost:3000/api/chat/topics" `
  -Method GET -Headers $headers
```

---

## 🆘 Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
lsof -i :3000
kill -9 <PID>

# Check logs
cat logs/server.log

# Verify Node version
node --version  # Should be v14+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Authentication Fails
```bash
# Verify token in .env
echo $AUTH_TOKEN

# Test with token
curl -H "Authorization: your-token" http://localhost:3000/api/chat/topics
```

### High Memory Usage
```bash
# Check memory
ps aux | grep node

# Restart service
pm2 restart cybersecurity-chatbot

# Or with Docker
docker restart cybersecurity-chatbot
```

---

## 📚 Documentation

- **[API_ENDPOINTS.md](./API_ENDPOINTS.md)** - Detailed API documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment overview
- **[DEPLOYMENT_PLATFORMS.md](./DEPLOYMENT_PLATFORMS.md)** - Platform-specific guides
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Project completion report

---

## 🔄 Continuous Integration

### GitHub Actions

Automatic testing and deployment on push:

```yaml
# .github/workflows/deploy.yml
- Run tests: npm test
- Build: npm run build
- Deploy to Heroku/Docker
```

Set up secrets in GitHub:
- `HEROKU_API_KEY`
- `HEROKU_EMAIL`
- `DOCKER_TOKEN`

---

## 📦 Dependencies

Key dependencies:
- **express** - Web framework
- **body-parser** - Request parsing
- **typescript** - Type safety
- **ts-node** - TypeScript runtime
- **dotenv** - Environment configuration

Development dependencies:
- **jest** - Testing framework
- **ts-jest** - TypeScript testing
- **@types/*** - Type definitions

---

## 📞 Support & Contact

For issues or questions:
1. Check logs: `tail -f logs/server.log`
2. Review configuration in `.env`
3. Test endpoints with curl/Postman
4. Check dependencies: `npm list`

---

## ✅ Deployment Status

**Current Status:** ✅ PRODUCTION READY

**Server:** Running on http://localhost:3000

**Last Updated:** December 4, 2025

---

## 🎯 Next Steps

1. **Choose Deployment Platform** - Select from available options
2. **Configure Environment** - Set up .env with production values
3. **Set Up Monitoring** - Configure alerts and logging
4. **Enable Auto-Scaling** - Configure for peak load
5. **Backup Strategy** - Plan for data backup and recovery

---

**Built with ❤️ for Cybersecurity Awareness**

*Ready to protect your organization's cybersecurity education!*
