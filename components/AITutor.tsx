
import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { chatWithQuant } from '../services/gemini';
import { ChatMessage } from '../types';
import { sanitizeInput, MAX_MESSAGE_LENGTH } from '../utils/validation';

const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your Quant Mentor. Stuck on a formula or a Greek? Ask me anything about derivatives!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastRequestTime = useRef(0);

  // Rate limiting configuration
  const RATE_LIMIT_MS = 2000; // 2 seconds between requests

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    // Input validation
    if (!input.trim() || isTyping) return;

    // Rate limiting check
    const now = Date.now();
    if (now - lastRequestTime.current < RATE_LIMIT_MS) {
      const waitTime = Math.ceil((RATE_LIMIT_MS - (now - lastRequestTime.current)) / 1000);
      alert(`Please wait ${waitTime} second(s) before sending another message.`);
      return;
    }

    // Length validation
    if (input.length > MAX_MESSAGE_LENGTH) {
      alert(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
      return;
    }

    // Sanitize input
    const sanitizedInput = sanitizeInput(input);

    if (!sanitizedInput) {
      alert('Invalid message content.');
      return;
    }

    const userMsg: ChatMessage = { role: 'user', content: sanitizedInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    lastRequestTime.current = now;

    const response = await chatWithQuant([...messages, userMsg]);

    // Sanitize AI response before adding to messages
    const sanitizedResponse = sanitizeInput(response);

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: sanitizedResponse || "I'm having trouble thinking. Volatility is high!"
    }]);
    setIsTyping(false);
  };

  // Sanitize content for safe HTML rendering
  const sanitizeForDisplay = (content: string): string => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p'],
      ALLOWED_ATTR: []
    });
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${isOpen ? 'inset-0 md:bottom-6 md:right-6 md:inset-auto' : 'bottom-6 right-6'}`}>
      {isOpen ? (
        <div className="w-full h-full md:w-96 md:h-[500px] bg-slate-900 md:border border-slate-700 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-sm text-slate-200">Quant Mentor AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white bg-slate-700/50 p-1 rounded-full md:bg-transparent"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                    }`}
                  dangerouslySetInnerHTML={{ __html: sanitizeForDisplay(m.content) }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-900 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Black-Scholes..."
                maxLength={MAX_MESSAGE_LENGTH}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200"
                aria-label="Chat message input"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              </button>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 text-center">
              {input.length}/{MAX_MESSAGE_LENGTH} characters
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 shadow-blue-900/20"
          aria-label="Open Quant Mentor chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          <span className="font-bold pr-2 hidden md:inline">Ask Quant Mentor</span>
        </button>
      )}
    </div>
  );
};

export default AITutor;
