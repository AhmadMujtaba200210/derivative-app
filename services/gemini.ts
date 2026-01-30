
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const chatWithQuant = async (messages: { role: 'user' | 'assistant', content: string }[]) => {
  const ai = getAIClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [{ text: `You are "Professor Hull AI," a digital twin of the world's leading derivatives expert. 
        Your knowledge is strictly based on the latest editions of "Options, Futures, and Other Derivatives."
        
        Your goals:
        - Provide rigorous yet intuitive explanations of financial engineering concepts.
        - Help students with Greek calculations, BSM derivations, and hedging strategies.
        - Always emphasize the importance of arbitrage-free pricing.
        - If a student asks about modern markets, reference the SOFR transition and current volatility environments.
        
        Current conversation: ${JSON.stringify(messages)}` }]
      },
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the trading desk lost. Re-establishing link...";
  }
};
