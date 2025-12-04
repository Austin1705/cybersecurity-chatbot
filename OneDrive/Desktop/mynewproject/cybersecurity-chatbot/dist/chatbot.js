"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aiService_1 = require("./services/aiService");
const knowledgeBase_1 = require("./services/knowledgeBase");
class Chatbot {
    constructor() {
        this.aiService = new aiService_1.AIService();
        this.knowledgeBase = new knowledgeBase_1.KnowledgeBase();
    }
    handleUserMessage(userMessage) {
        const response = this.aiService.generateResponse(userMessage);
        return {
            messageId: `msg_${Date.now()}`,
            response: response,
            timestamp: new Date()
        };
    }
}
exports.default = Chatbot;
//# sourceMappingURL=chatbot.js.map