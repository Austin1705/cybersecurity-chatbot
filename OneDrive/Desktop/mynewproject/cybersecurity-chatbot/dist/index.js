"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const chatRoutes_1 = require("./routes/chatRoutes");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const logger = new logger_1.default();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Set up routes (routes handle their own middleware)
(0, chatRoutes_1.setChatRoutes)(app);
// Default root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Cybersecurity Chatbot API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            chat: 'POST /api/chat/message',
            topics: 'GET /api/chat/topics',
            search: 'GET /api/chat/search?q=<query>',
            topicInfo: 'GET /api/chat/topic/<topicName>'
        }
    });
});
app.listen(PORT, () => {
    logger.logInfo(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map