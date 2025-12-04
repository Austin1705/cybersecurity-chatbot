"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    // Extract token from "Bearer <token>" format
    const tokenParts = authHeader.split(' ');
    const token = tokenParts.length === 2 ? tokenParts[1] : authHeader;
    // Here you would typically verify the token (e.g., using JWT)
    // For demonstration purposes, we'll assume the token is valid if it equals 'valid-token'
    if (token === 'valid-token') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Forbidden access' });
    }
}
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map