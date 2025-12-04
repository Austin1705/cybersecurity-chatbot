"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserInput = exports.formatMessage = void 0;
function formatMessage(message) {
    return message.trim().replace(/\s+/g, ' ');
}
exports.formatMessage = formatMessage;
function parseUserInput(input) {
    return input.toLowerCase().trim();
}
exports.parseUserInput = parseUserInput;
//# sourceMappingURL=helpers.js.map