/**
 * Secure API client that communicates with backend proxy
 * No API keys are exposed client-side
 */

import { sanitizeInput, limitConversationHistory } from '../utils/validation';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Sends chat messages to backend API proxy
 * All API key handling is done server-side
 */
export const chatWithQuant = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Sanitize all messages before sending
    const sanitizedMessages = messages.map(msg => ({
      role: msg.role,
      content: sanitizeInput(msg.content)
    }));

    // Limit conversation history
    const limitedMessages = limitConversationHistory(sanitizedMessages);

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: limitedMessages }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        const data = await response.json();
        return `Rate limit exceeded. Please wait ${data.retryAfter || 60} seconds before trying again.`;
      }

      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I'm having trouble thinking. Volatility is high!";

  } catch (error) {
    console.error("Chat API Error:", error);

    // User-friendly error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "Unable to connect to the server. Please check your connection.";
    }

    return "Connection to the trading desk lost. Re-establishing link...";
  }
};
