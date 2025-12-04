"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    logInfo(message) {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    }
    logError(message) {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map