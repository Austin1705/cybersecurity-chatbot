#!/bin/bash
# Production startup script for Cybersecurity Chatbot

echo "🚀 Starting Cybersecurity Chatbot..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to project directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '#' | xargs)
    echo "✅ Environment variables loaded from .env"
else
    echo "⚠️  .env file not found. Using defaults."
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the server
echo "🔧 Starting server on port ${PORT:-3000}..."
npm start

echo "✅ Server started successfully!"
