export type ChatbotResponse = {
    message: string;
    timestamp: Date;
    userId: string;
};

export type ChatbotMessage = {
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

export type User = {
    id: string;
    name: string;
    email: string;
};

export type UserSession = {
    userId: string;
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
};