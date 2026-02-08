
/**
 * Black-Scholes Option Greeks Calculation Utility
 */

function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.821256 + t * 1.3302745))));
  return x > 0 ? 1 - p : p;
}

function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  price: number;
}

export function calculateGreeks(
  s: number, // Current stock price
  k: number, // Strike price
  t: number, // Time to expiration (years)
  r: number, // Risk-free rate (decimal)
  sigma: number, // Volatility (decimal)
  type: 'call' | 'put'
): Greeks {
  if (t <= 0) t = 0.000001; // Avoid division by zero
  
  const d1 = (Math.log(s / k) + (r + (sigma * sigma) / 2) * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  const nD1 = normalCDF(d1);
  const nD2 = normalCDF(d2);
  const npD1 = normalPDF(d1);

  let delta, theta, rho, price;

  if (type === 'call') {
    price = s * nD1 - k * Math.exp(-r * t) * nD2;
    delta = nD1;
    theta = -(s * npD1 * sigma) / (2 * Math.sqrt(t)) - r * k * Math.exp(-r * t) * nD2;
    rho = k * t * Math.exp(-r * t) * nD2;
  } else {
    price = k * Math.exp(-r * t) * (1 - normalCDF(d2)) - s * (1 - nD1);
    delta = nD1 - 1;
    theta = -(s * npD1 * sigma) / (2 * Math.sqrt(t)) + r * k * Math.exp(-r * t) * (1 - normalCDF(d2));
    rho = -k * t * Math.exp(-r * t) * (1 - normalCDF(d2));
  }

  const gamma = npD1 / (s * sigma * Math.sqrt(t));
  const vega = s * Math.sqrt(t) * npD1;

  // Normalize results (theta is usually daily, vega is per 1% vol change)
  return {
    delta,
    gamma,
    theta: theta / 365, // Daily theta
    vega: vega / 100,  // Vega for 1% change
    rho: rho / 100,    // Rho for 1% change
    price
  };
}
