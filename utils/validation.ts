/**
 * Input validation and sanitization utilities
 */

export const MAX_MESSAGE_LENGTH = 5000;
export const MAX_CONVERSATION_LENGTH = 20;

/**
 * Sanitizes user input to prevent XSS and prompt injection
 */
export const sanitizeInput = (input: string): string => {
    if (typeof input !== 'string') {
        return '';
    }

    return input
        .trim()
        .slice(0, MAX_MESSAGE_LENGTH)
        // Remove potential prompt injection patterns
        .replace(/\[INST\]/gi, '')
        .replace(/\[\/INST\]/gi, '')
        .replace(/<<SYS>>/gi, '')
        .replace(/<\/SYS>>/gi, '')
        // Remove potential script tags
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
};

/**
 * Validates message format
 */
export const isValidMessage = (message: unknown): message is { role: 'user' | 'assistant'; content: string } => {
    if (typeof message !== 'object' || message === null) {
        return false;
    }

    const msg = message as Record<string, unknown>;

    return (
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string' &&
        msg.content.length > 0 &&
        msg.content.length <= MAX_MESSAGE_LENGTH
    );
};

/**
 * Limits conversation history to prevent excessive API costs
 */
export const limitConversationHistory = <T>(messages: T[], maxLength: number = MAX_CONVERSATION_LENGTH): T[] => {
    if (messages.length <= maxLength) {
        return messages;
    }
    return messages.slice(-maxLength);
};
