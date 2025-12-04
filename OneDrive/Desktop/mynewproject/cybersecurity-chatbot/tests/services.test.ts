import { AIService } from '../src/services/aiService';
import { KnowledgeBase } from '../src/services/knowledgeBase';

describe('AIService', () => {
    let aiService: AIService;

    beforeEach(() => {
        aiService = new AIService();
    });

    test('should generate a response for a given input', () => {
        const input = 'What is phishing?';
        const response = aiService.generateResponse(input);
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
    });

    test('should train the model with new data', () => {
        const trainingData = [{ question: 'What is malware?', answer: 'Malware is malicious software.' }];
        aiService.trainModel(trainingData);
        // Assuming there's a way to verify the model has been trained
        expect(aiService.isTrained).toBe(true);
    });
});

describe('KnowledgeBase', () => {
    let knowledgeBase: KnowledgeBase;

    beforeEach(() => {
        knowledgeBase = new KnowledgeBase();
    });

    test('should retrieve topic information', () => {
        const topic = 'phishing';
        const info = knowledgeBase.getTopicInfo(topic);
        expect(info).toBeDefined();
        expect(info).toHaveProperty('description');
    });

    test('should update the knowledge base', () => {
        const newTopic = { topic: 'ransomware', description: 'Ransomware is a type of malicious software that encrypts files.' };
        knowledgeBase.updateKnowledgeBase(newTopic);
        const info = knowledgeBase.getTopicInfo('ransomware');
        expect(info).toBeDefined();
        expect(info.description).toBe(newTopic.description);
    });
});