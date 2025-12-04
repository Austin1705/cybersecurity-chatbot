import { Request, Response } from 'express';
import { AIService } from '../services/aiService';

export class MessageController {
    private aiService: AIService;

    constructor() {
        this.aiService = new AIService();
    }

    handleIncomingMessage(req: Request, res: Response) {
        try {
            const userMessage = req.body.message;
            const response = this.generateResponse(userMessage);
            this.sendResponse(res, response);
        } catch (error: any) {
            res.status(500).json({ 
                error: 'An error occurred while processing your message',
                details: error.message 
            });
        }
    }

    private generateResponse(userMessage: string): string {
        if (!userMessage || userMessage.trim().length === 0) {
            return '❌ Please provide a valid message.';
        }
        
        return this.aiService.generateResponse(userMessage);
    }

    private sendResponse(res: Response, response: string) {
        res.json({ 
            response,
            timestamp: new Date().toISOString(),
            status: 'success'
        });
    }
}