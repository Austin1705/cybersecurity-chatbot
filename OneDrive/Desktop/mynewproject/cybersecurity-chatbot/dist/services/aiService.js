"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const knowledgeBase_1 = require("./knowledgeBase");
class AIService {
    constructor() {
        this.knowledgeBase = new knowledgeBase_1.KnowledgeBase();
    }
    generateResponse(userInput) {
        // First try to find the answer in the knowledge base
        const topicMatch = this.findMatchingTopic(userInput);
        if (topicMatch) {
            return `📚 **${topicMatch.topic}**: ${topicMatch.description}`;
        }
        // Generate a contextual response based on keywords
        return this.generateContextualResponse(userInput);
    }
    findMatchingTopic(input) {
        const words = input.toLowerCase().split(/\s+/);
        for (const word of words) {
            const info = this.knowledgeBase.getTopicInfo(word);
            if (info) {
                // Find the original topic name
                const allTopics = this.knowledgeBase.getAllTopics();
                for (const [topic, description] of Object.entries(allTopics)) {
                    if (description === info) {
                        return { topic: topic.charAt(0).toUpperCase() + topic.slice(1), description: info };
                    }
                }
            }
        }
        return null;
    }
    generateContextualResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes('how') || lowerInput.includes('what')) {
            return '🔒 That\'s a great cybersecurity question! I recommend learning about proper password management, two-factor authentication, and staying vigilant against phishing attacks.';
        }
        if (lowerInput.includes('help') || lowerInput.includes('support')) {
            return '🆘 I\'m here to help with cybersecurity awareness! Try asking about topics like phishing, malware, VPN, encryption, or data protection.';
        }
        if (lowerInput.includes('safe') || lowerInput.includes('secure')) {
            return '🛡️ To stay secure online: Use strong passwords, enable 2FA, be cautious with email links, keep software updated, and use a VPN on public networks.';
        }
        if (lowerInput.includes('attack') || lowerInput.includes('threat')) {
            return '⚠️ Common cyber threats include phishing, malware, ransomware, and social engineering. Always verify sender identity and be skeptical of unsolicited requests.';
        }
        return '💡 I\'m a cybersecurity awareness chatbot. Ask me about topics like phishing, malware, encryption, VPNs, or general security best practices!';
    }
    trainModel(trainingData) {
        // Logic to train the AI model with new data
        if (trainingData && trainingData.newTopics) {
            this.knowledgeBase.updateKnowledgeBase(trainingData.newTopics);
        }
    }
}
exports.AIService = AIService;
//# sourceMappingURL=aiService.js.map