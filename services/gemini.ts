
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateExplanation = async (topic: string, context: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class Quantitative Analyst and Tutor. 
      Explain the following topic: "${topic}" 
      In the context of: "${context}". 
      Use clear analogies, keep it rigorous but accessible. 
      If there are formulas involved, explain them clearly.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I encountered an error while trying to explain this topic. Please try again.";
  }
};

export const chatWithQuant = async (messages: { role: 'user' | 'assistant', content: string }[]) => {
  const ai = getAIClient();
  const chatHistory = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [{ text: `You are "QuantAI", a high-end quantitative finance mentor. 
        Help the student understand derivatives, pricing, and strategies. 
        Focus on intuition and the mathematical beauty of finance. 
        Current conversation: ${JSON.stringify(messages)}` }]
      },
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The markets are currently too volatile for me to respond. Please try again!";
  }
};
