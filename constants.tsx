
import React from 'react';
import { Module, ModuleId } from './types';

export const CURRICULUM: Module[] = [
  {
    id: ModuleId.FUNDAMENTALS,
    title: "1. Fundamentals of Derivatives",
    lessons: [
      {
        id: "intro-derivatives",
        title: "Introduction to Derivatives",
        description: "What are derivatives and why do they exist?",
        content: "Derivatives are financial contracts whose value is derived from an underlying asset. They are used for hedging risk, speculation, and arbitrage."
      },
      {
        id: "underlying-assets",
        title: "Underlying Assets & Markets",
        description: "Equities, Commodities, FX, and Interest Rates.",
        content: "Understand the different types of assets that power derivative contracts."
      }
    ]
  },
  {
    id: ModuleId.FORWARDS_FUTURES,
    title: "2. Forwards & Futures",
    lessons: [
      {
        id: "forwards-vs-futures",
        title: "Forwards vs Futures",
        description: "The difference between OTC and exchange-traded contracts.",
        content: "Learn the mechanics of delivery, margin calls, and clearing houses."
      },
      {
        id: "basis-risk",
        title: "Basis Risk & Hedging",
        description: "How to hedge effectively using futures.",
        content: "The concept of basis: Spot Price - Futures Price."
      }
    ]
  },
  {
    id: ModuleId.OPTIONS_BASICS,
    title: "3. Options Fundamentals",
    lessons: [
      {
        id: "calls-puts",
        title: "Calls and Puts",
        description: "The rights but not obligations.",
        content: "Intrinsic value vs Time value."
      },
      {
        id: "payoff-diagrams",
        title: "Understanding Payoff Diagrams",
        description: "Visualizing profit and loss at expiration.",
        content: "Interactive visualization of long/short calls and puts."
      }
    ]
  },
  {
    id: ModuleId.THE_GREEKS,
    title: "4. The Option Greeks",
    lessons: [
      {
        id: "delta-gamma",
        title: "Delta & Gamma",
        description: "Sensitivity to price and its rate of change.",
        content: "Delta measures the rate of change of the option price with respect to the price of the underlying."
      },
      {
        id: "theta-vega",
        title: "Theta, Vega & Rho",
        description: "Time decay, volatility, and interest rates.",
        content: "Learn how time and volatility impact your option premiums."
      }
    ]
  },
  {
    id: ModuleId.PRICING_MODELS,
    title: "5. Pricing Models",
    lessons: [
      {
        id: "black-scholes",
        title: "Black-Scholes-Merton",
        description: "The Nobel-prize-winning formula.",
        content: "Understanding the assumptions and the partial differential equation."
      },
      {
        id: "binomial-trees",
        title: "Binomial Option Pricing",
        description: "Discrete-time pricing models.",
        content: "Step-by-step approach to pricing American options."
      }
    ]
  },
  {
    id: ModuleId.QUANT_STRATEGIES,
    title: "6. Quant Trading Strategies",
    lessons: [
      {
        id: "delta-neutral",
        title: "Delta-Neutral Strategies",
        description: "Market-making and hedging.",
        content: "How quants eliminate directional risk."
      },
      {
        id: "vol-trading",
        title: "Volatility Trading",
        description: "Trading the 'fear' index.",
        content: "Straddles, Strangles, and Iron Condors."
      }
    ]
  }
];
