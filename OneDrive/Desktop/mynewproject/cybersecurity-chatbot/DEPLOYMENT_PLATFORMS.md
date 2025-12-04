# 🚀 Cybersecurity Chatbot - Platform-Specific Deployment

## 🏠 Local Deployment

### Windows
```bash
# Using batch file
start-server.bat

# Using npm
npm start

# Using PowerShell
Set-Location "path\to\cybersecurity-chatbot"
npm start
```

### Linux/Mac
```bash
# Using shell script
chmod +x start-server.sh
./start-server.sh

# Using npm
npm start

# Using PM2 (recommended)
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 🐳 Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose (optional but recommended)

### Method 1: Docker Command Line
```bash
# Build image
docker build -t cybersecurity-chatbot .

# Run container
docker run -d \
  --name cybersecurity-chatbot \
  -p 3000:3000 \
  -e NODE_ENV=production \
  cybersecurity-chatbot

# Verify
docker logs cybersecurity-chatbot
curl http://localhost:3000/api/health
```

### Method 2: Docker Compose (Recommended)
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild image
docker-compose build --no-cache
docker-compose up -d
```

### Docker Management
```bash
# List running containers
docker ps

# Check container status
docker inspect cybersecurity-chatbot

# Stop container
docker stop cybersecurity-chatbot

# Remove container
docker rm cybersecurity-chatbot

# View container logs
docker logs cybersecurity-chatbot
docker logs -f cybersecurity-chatbot --tail 50
```

---

## ☁️ Cloud Platform Deployments

### 1. Heroku Deployment

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create cybersecurity-chatbot

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set AUTH_TOKEN=your-secure-token

# Deploy from Git
git push heroku main

# View logs
heroku logs --tail

# Open app
heroku open

# Alternative: Deploy from Docker
heroku container:login
heroku container:push web
heroku container:release web
```

### 2. AWS EC2 Deployment

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# Clone repository
git clone your-repo-url
cd cybersecurity-chatbot

# Install dependencies
npm install

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 startup
pm2 save

# Configure security group
# - Open port 3000 for inbound traffic
```

### 3. Google Cloud Run Deployment

```bash
# Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash

# Login
gcloud auth login

# Configure project
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy cybersecurity-chatbot \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1

# View logs
gcloud run logs read cybersecurity-chatbot

# Get service URL
gcloud run services describe cybersecurity-chatbot --region us-central1
```

### 4. Azure App Service Deployment

```bash
# Install Azure CLI
# https://docs.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create -n cybersecurity-chatbot-rg -l eastus

# Create App Service plan
az appservice plan create \
  -n cybersecurity-chatbot-plan \
  -g cybersecurity-chatbot-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  -n cybersecurity-chatbot \
  -g cybersecurity-chatbot-rg \
  -p cybersecurity-chatbot-plan \
  --runtime "NODE|16-lts"

# Deploy from Git
az webapp up --name cybersecurity-chatbot

# Configure app settings
az webapp config appsettings set \
  -g cybersecurity-chatbot-rg \
  -n cybersecurity-chatbot \
  --settings NODE_ENV=production PORT=3000
```

### 5. DigitalOcean App Platform Deployment

```bash
# Install doctl CLI
# https://docs.digitalocean.com/reference/doctl/

# Create app specification
cat > app.yaml << EOF
name: cybersecurity-chatbot
services:
- name: api
  github:
    repo: your-username/cybersecurity-chatbot
    branch: main
  build_command: npm install && npm run build
  run_command: npm run prod
  http_port: 3000
EOF

# Deploy
doctl apps create --spec app.yaml

# View logs
doctl apps logs --app-id YOUR_APP_ID
```

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm install
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16

      # Deploy to Heroku
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: cybersecurity-chatbot
          heroku_email: ${{ secrets.HEROKU_EMAIL }}

      # Notify deployment
      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] All tests passing
- [ ] Code compiled without errors
- [ ] Environment variables configured
- [ ] Database/data files ready
- [ ] Security tokens set securely
- [ ] Logging configured
- [ ] Health check endpoint works

### During Deployment
- [ ] Deployment process completed
- [ ] No errors in logs
- [ ] Service is accessible
- [ ] Health check passes
- [ ] API endpoints responding

### After Deployment
- [ ] Monitor logs for errors
- [ ] Verify all endpoints working
- [ ] Check response times
- [ ] Verify authentication working
- [ ] Set up monitoring alerts
- [ ] Configure auto-scaling if needed

---

## 🆘 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs cybersecurity-chatbot

# Rebuild without cache
docker build --no-cache -t cybersecurity-chatbot .

# Check environment variables
docker inspect cybersecurity-chatbot | grep -A 20 Env
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID process_id /F

# Linux/Mac
lsof -i :3000
kill -9 process_id
```

### Memory Issues
```bash
# Increase memory limit
docker run -m 1g cybersecurity-chatbot

# Check memory usage
docker stats cybersecurity-chatbot
```

### Connection Refused
```bash
# Verify service is running
curl http://localhost:3000/api/health

# Check firewall rules
# Ensure port 3000 is open
```

---

## 📈 Monitoring & Maintenance

### Recommended Tools
- **PM2 Plus** - Process monitoring and alerting
- **New Relic** - Application performance monitoring
- **DataDog** - Infrastructure and application monitoring
- **CloudWatch** - AWS monitoring
- **Stackdriver** - Google Cloud monitoring

### Set Up Monitoring
```bash
# PM2 Monitoring
npm install -g pm2-plus
pm2 plus

# Enable CloudWatch (AWS)
aws cloudwatch put-metric-alarm \
  --alarm-name chatbot-health \
  --alarm-actions arn:aws:sns:region:account:topic-name
```

---

## ✅ Deployment Complete!

Your chatbot is now ready for production deployment. Choose the platform that best fits your infrastructure and follow the corresponding instructions above.

**Current Server Status:** ✅ Running on http://localhost:3000
