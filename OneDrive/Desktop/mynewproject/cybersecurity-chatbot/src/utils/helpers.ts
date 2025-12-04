export function formatMessage(message: string): string {
    return message.trim().replace(/\s+/g, ' ');
}

export function parseUserInput(input: string): string {
    return input.toLowerCase().trim();
}