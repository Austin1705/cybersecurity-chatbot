import { AIService } from './services/aiService';
import { KnowledgeBase } from './services/knowledgeBase';
import { ChatbotResponse } from './types/chatbot';

class Chatbot {
    private aiService: AIService;
    private knowledgeBase: KnowledgeBase;

    constructor() {
        this.aiService = new AIService();
        this.knowledgeBase = new KnowledgeBase();
    }

    public handleUserMessage(userMessage: string): ChatbotResponse {
        const response = this.aiService.generateResponse(userMessage);
        return {
            messageId: `msg_${Date.now()}`,
            response: response,
            timestamp: new Date()
        };
    }
}

export default Chatbot;