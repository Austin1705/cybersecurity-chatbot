import express from 'express';
import bodyParser from 'body-parser';
import { setChatRoutes } from './routes/chatRoutes';
import Logger from './utils/logger';

const app = express();
const logger = new Logger();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set up routes (routes handle their own middleware)
setChatRoutes(app);

// Default root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Cybersecurity Chatbot API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            chat: 'POST /api/chat/message',
            topics: 'GET /api/chat/topics',
            search: 'GET /api/chat/search?q=<query>',
            topicInfo: 'GET /api/chat/topic/<topicName>'
        }
    });
});

app.listen(PORT, () => {
    logger.logInfo(`Server is running on port ${PORT}`);
});