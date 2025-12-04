"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
function validateMessage(req, res, next) {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid message. Please provide a non-empty string.' });
    }
    next();
}
exports.validateMessage = validateMessage;
//# sourceMappingURL=validation.js.map