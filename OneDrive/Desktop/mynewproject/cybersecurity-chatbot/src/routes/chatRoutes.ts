import { Router, Express } from 'express';
import { MessageController } from '../controllers/messageController';
import { authenticate } from '../middleware/authentication';
import { validateMessage } from '../middleware/validation';
import { KnowledgeBase } from '../services/knowledgeBase';

const router = Router();
const messageController = new MessageController();
const knowledgeBase = new KnowledgeBase();

export function setChatRoutes(app: Express) {
    // Health check endpoint - NO AUTH REQUIRED
    app.get('/api/health', (req, res) => {
        res.json({ 
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'cybersecurity-chatbot'
        });
    });

    // Chat message endpoint - WITH AUTH
    app.post('/api/chat/message', authenticate, validateMessage, messageController.handleIncomingMessage.bind(messageController));
    
    // Get all available topics - WITH AUTH
    app.get('/api/chat/topics', authenticate, (req, res) => {
        const topics = knowledgeBase.getAllTopics();
        res.json({
            topics: Object.keys(topics),
            total: Object.keys(topics).length,
            timestamp: new Date().toISOString()
        });
    });

    // Search topics - WITH AUTH
    app.get('/api/chat/search', authenticate, (req, res) => {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: 'Search query required' });
        }
        
        const results = knowledgeBase.searchTopics(query);
        res.json({
            query,
            results,
            found: Object.keys(results).length,
            timestamp: new Date().toISOString()
        });
    });

    // Get specific topic info - WITH AUTH
    app.get('/api/chat/topic/:name', authenticate, (req, res) => {
        const topicName = req.params.name;
        const info = knowledgeBase.getTopicInfo(topicName);
        
        if (info) {
            res.json({
                topic: topicName,
                description: info,
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(404).json({
                error: `Topic '${topicName}' not found`,
                timestamp: new Date().toISOString()
            });
        }
    });
}