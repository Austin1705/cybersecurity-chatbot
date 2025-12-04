import request from 'supertest';
import { app } from '../src/index'; // Assuming the app is exported from index.ts

describe('Chat Routes', () => {
    it('should respond to a valid message', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: 'What is phishing?' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('response');
    });

    it('should return an error for an invalid message', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: '' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid message');
    });
});