"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const aiService_1 = require("../services/aiService");
class MessageController {
    constructor() {
        this.aiService = new aiService_1.AIService();
    }
    handleIncomingMessage(req, res) {
        try {
            const userMessage = req.body.message;
            const response = this.generateResponse(userMessage);
            this.sendResponse(res, response);
        }
        catch (error) {
            res.status(500).json({
                error: 'An error occurred while processing your message',
                details: error.message
            });
        }
    }
    generateResponse(userMessage) {
        if (!userMessage || userMessage.trim().length === 0) {
            return '❌ Please provide a valid message.';
        }
        return this.aiService.generateResponse(userMessage);
    }
    sendResponse(res, response) {
        res.json({
            response,
            timestamp: new Date().toISOString(),
            status: 'success'
        });
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=messageController.js.map