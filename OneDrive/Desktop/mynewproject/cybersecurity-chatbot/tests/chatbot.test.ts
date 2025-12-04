import { Chatbot } from '../src/chatbot';
import { AIService } from '../src/services/aiService';
import { KnowledgeBase } from '../src/services/knowledgeBase';

describe('Chatbot', () => {
    let chatbot: Chatbot;
    let aiService: AIService;
    let knowledgeBase: KnowledgeBase;

    beforeEach(() => {
        aiService = new AIService();
        knowledgeBase = new KnowledgeBase();
        chatbot = new Chatbot(aiService, knowledgeBase);
    });

    test('should respond to a simple question', async () => {
        const userInput = 'What is phishing?';
        const expectedResponse = 'Phishing is a type of cyber attack where attackers impersonate legitimate organizations to steal sensitive information.';

        jest.spyOn(knowledgeBase, 'getTopicInfo').mockReturnValue(expectedResponse);
        const response = await chatbot.handleUserInput(userInput);
        
        expect(response).toBe(expectedResponse);
    });

    test('should handle unknown questions gracefully', async () => {
        const userInput = 'Tell me about an unknown topic';
        const expectedResponse = 'I am sorry, I do not have information on that topic.';

        jest.spyOn(knowledgeBase, 'getTopicInfo').mockReturnValue(null);
        const response = await chatbot.handleUserInput(userInput);
        
        expect(response).toBe(expectedResponse);
    });

    test('should train the AI model with new data', async () => {
        const trainingData = { question: 'What is malware?', answer: 'Malware is malicious software designed to harm or exploit any programmable device or network.' };
        
        const trainSpy = jest.spyOn(aiService, 'trainModel').mockImplementation(async () => Promise.resolve());
        await chatbot.trainAI(trainingData);
        
        expect(trainSpy).toHaveBeenCalledWith(trainingData);
    });
});