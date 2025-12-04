"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChatRoutes = void 0;
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authentication_1 = require("../middleware/authentication");
const validation_1 = require("../middleware/validation");
const knowledgeBase_1 = require("../services/knowledgeBase");
const router = (0, express_1.Router)();
const messageController = new messageController_1.MessageController();
const knowledgeBase = new knowledgeBase_1.KnowledgeBase();
function setChatRoutes(app) {
    // Health check endpoint - NO AUTH REQUIRED
    app.get('/api/health', (req, res) => {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'cybersecurity-chatbot'
        });
    });
    // Chat message endpoint - WITH AUTH
    app.post('/api/chat/message', authentication_1.authenticate, validation_1.validateMessage, messageController.handleIncomingMessage.bind(messageController));
    // Get all available topics - WITH AUTH
    app.get('/api/chat/topics', authentication_1.authenticate, (req, res) => {
        const topics = knowledgeBase.getAllTopics();
        res.json({
            topics: Object.keys(topics),
            total: Object.keys(topics).length,
            timestamp: new Date().toISOString()
        });
    });
    // Search topics - WITH AUTH
    app.get('/api/chat/search', authentication_1.authenticate, (req, res) => {
        const query = req.query.q;
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
    app.get('/api/chat/topic/:name', authentication_1.authenticate, (req, res) => {
        const topicName = req.params.name;
        const info = knowledgeBase.getTopicInfo(topicName);
        if (info) {
            res.json({
                topic: topicName,
                description: info,
                timestamp: new Date().toISOString()
            });
        }
        else {
            res.status(404).json({
                error: `Topic '${topicName}' not found`,
                timestamp: new Date().toISOString()
            });
        }
    });
}
exports.setChatRoutes = setChatRoutes;
//# sourceMappingURL=chatRoutes.js.map