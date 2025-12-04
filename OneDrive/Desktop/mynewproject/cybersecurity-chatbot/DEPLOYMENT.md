# 🚀 Cybersecurity Chatbot - Deployment Guide

## Deployment Checklist

### ✅ Pre-Deployment
- [x] Code is TypeScript compiled to JavaScript
- [x] All dependencies are installed
- [x] Environment variables configured
- [x] API endpoints tested and working
- [x] Authentication enabled
- [x] Logging system operational

### ✅ Deployment Steps

#### 1. **Local Deployment** (Current Setup)

**Status:** ✅ LIVE ON http://localhost:3000

```bash
# Navigate to project directory
cd cybersecurity-chatbot

# Install dependencies
npm install

# Start server
npm start
# OR use batch file
start-server.bat
```

#### 2. **Build for Production**

```bash
# Compile TypeScript to JavaScript
npm run build
# (Note: Add build script to package.json if needed)

# Install production dependencies only
npm install --production
```

#### 3. **Docker Deployment** (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t cybersecurity-chatbot .
docker run -p 3000:3000 cybersecurity-chatbot
```

#### 4. **Cloud Deployment Options**

**Option A: Heroku**
```bash
heroku create cybersecurity-chatbot
git push heroku main
heroku open
```

**Option B: AWS EC2**
1. Create EC2 instance (Node.js AMI)
2. Clone repository
3. Run `npm install && npm start`
4. Configure security group for port 3000

**Option C: Google Cloud Run**
```bash
gcloud run deploy cybersecurity-chatbot \
  --source . \
  --platform managed \
  --region us-central1
```

**Option D: Azure App Service**
```bash
az webapp up --name cybersecurity-chatbot --runtime "NODE|16-lts"
```

### 🔐 Security Configuration

#### Environment Variables
Create `.env` file from `.env.example`:
```bash
PORT=3000
NODE_ENV=production
AUTH_TOKEN=your-secure-token-here
LOG_LEVEL=info
```

#### Recommended Settings for Production
```bash
# Use strong authentication token
AUTH_TOKEN=d3f4c5b6a1e2d8f4c5b6a1e2d8f4c5b6

# Set secure headers
CORS_ORIGIN=https://yourdomain.com

# Enable HTTPS
USE_HTTPS=true
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

### 📊 Monitoring & Logging

#### Logs Location
- Local: `./logs/server.log`
- Cloud: Use provider's logging service

#### Health Check Endpoint
Monitor server health:
```bash
curl http://your-domain:3000/api/health
```

#### Performance Metrics
- Response time: < 100ms
- Uptime: > 99.9%
- Error rate: < 0.1%

### 🌐 API Access

**Production URL:** `https://yourdomain.com` or cloud service URL

**Example Requests:**
```bash
# Health check
curl https://yourdomain.com/api/health

# Chat message
curl -X POST https://yourdomain.com/api/chat/message \
  -H "Authorization: your-token" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is phishing?"}'
```

### 📈 Scaling Considerations

For high traffic:
1. Use load balancer
2. Deploy multiple instances
3. Use Redis for session caching
4. Database optimization (if needed)
5. CDN for static content

### ✅ Post-Deployment Verification

```bash
# 1. Check server status
curl http://your-domain:3000/api/health

# 2. Verify authentication
curl -H "Authorization: your-token" \
     http://your-domain:3000/api/chat/topics

# 3. Test chat endpoint
curl -X POST http://your-domain:3000/api/chat/message \
  -H "Authorization: your-token" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'

# 4. Check logs
tail -f logs/server.log
```

### 🔄 Continuous Deployment (CI/CD)

#### GitHub Actions Example
```yaml
name: Deploy Chatbot
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
```

### 📝 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or kill existing process |
| Authentication fails | Verify AUTH_TOKEN in .env |
| Server won't start | Check Node.js version, run `npm install` |
| Database connection fails | Ensure data files exist in ./data directory |
| High memory usage | Check for memory leaks, restart server |

### 🆘 Support

For issues or questions:
1. Check logs: `tail -f logs/server.log`
2. Verify configuration: Review `.env` settings
3. Test endpoints: Use curl or Postman
4. Check dependencies: `npm list`

---

**Deployment Status:** ✅ Ready for Production

**Next Steps:**
1. Choose deployment platform
2. Configure environment variables
3. Set up monitoring
4. Configure backup and recovery

**Current Server:** Running on http://localhost:3000 ✅
