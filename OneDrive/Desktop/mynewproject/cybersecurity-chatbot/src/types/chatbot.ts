export type ChatbotMessage = {
    userId: string;
    message: string;
    timestamp: Date;
};

export type ChatbotResponse = {
    messageId: string;
    response: string;
    timestamp: Date;
};