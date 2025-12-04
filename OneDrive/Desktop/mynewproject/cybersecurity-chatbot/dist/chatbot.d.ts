import { ChatbotResponse } from './types/chatbot';
declare class Chatbot {
    private aiService;
    private knowledgeBase;
    constructor();
    handleUserMessage(userMessage: string): ChatbotResponse;
}
export default Chatbot;
//# sourceMappingURL=chatbot.d.ts.map