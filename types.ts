
export enum ModuleId {
  FUNDAMENTALS = 'fundamentals',
  FORWARDS_FUTURES = 'forwards_futures',
  OPTIONS_BASICS = 'options_basics',
  THE_GREEKS = 'the_greeks',
  PRICING_MODELS = 'pricing_models',
  QUANT_STRATEGIES = 'quant_strategies'
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface Module {
  id: ModuleId;
  title: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface PayoffData {
  spotPrice: number;
  payoff: number;
  profit?: number;
}
