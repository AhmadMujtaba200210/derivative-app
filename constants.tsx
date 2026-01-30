
import { Module, ModuleId } from './types';

export const CURRICULUM: Module[] = [
  {
    id: ModuleId.FUNDAMENTALS,
    title: "1. Mechanics of Futures Markets",
    lessons: [
      {
        id: "intro-derivatives",
        title: "Introduction to Derivatives",
        description: "Definitions, uses, and the role of exchange-traded vs OTC markets.",
        content: `A derivative is a financial instrument whose value depends on (or derives from) the values of other, more basic, underlying variables.

**1. Exchange-Traded Markets:**
Derivatives exchanges (like CME, CBOE) have standardized contracts. The exchange defines the asset, contract size, delivery location, and delivery month. A key feature is the **Clearing House**, which stands between two clearing members, guaranteeing the performance of the transaction.

**2. Over-the-Counter (OTC) Markets:**
A decentralized market where participants trade directly. It is much larger than the exchange-traded market. However, post-2008 regulations (Dodd-Frank, EMIR) have forced many standardized OTC products to be cleared through Central Counterparties (CCPs).

**3. Forward Contracts:**
A commitment to buy or sell an asset at a certain time in the future for a certain price.
- It is traded OTC.
- No daily settlement (settled at maturity).
- Creates credit risk.

**4. Futures Contracts:**
Similar to a forward, but traded on an exchange.
- Standardized features.
- Daily settlement (Marking-to-Market).
- Virtually no credit risk due to margin requirements.`
      },
      {
        id: "futures-margin",
        title: "Margin & Marking-to-Market",
        description: "The mechanics of daily settlement and clearing house operations.",
        content: `**The Concept of Margin:**
To avoid default, exchanges require investors to deposit funds, known as a 'margin account'.

1. **Initial Margin:** The amount that must be deposited at the time the contract is entered into.
2. **Maintenance Margin:** The minimum balance that must be maintained in the margin account. It is usually about 75% of the initial margin.
3. **Variation Margin:** The funds that must be deposited if the account balance falls below the maintenance margin. The investor must top up the account back to the *Initial Margin* level (not just the maintenance level).

**Marking-to-Market (Daily Settlement):**
At the end of each trading day, the margin account is adjusted to reflect the investor's gain or loss.
- If the price moves in your favor, you can withdraw the excess.
- If the price moves against you, you receive a 'Margin Call'.

**Example:**
You buy 2 gold futures contracts at $1,400.
Contract size = 100 oz.
Initial Margin = $6,000. Maintenance Margin = $4,500.
If price drops to $1,380:
Loss = 2 * 100 * ($1,400 - $1,380) = $4,000.
Balance = $6,000 - $4,000 = $2,000.
Since $2,000 < $4,500 (Maintenance), you must top up $4,000 to get back to $6,000.`
      }
    ]
  },
  {
    id: ModuleId.FORWARDS_FUTURES,
    title: "2. Hedging Strategies",
    lessons: [
      {
        id: "basic-hedging",
        title: "Short vs Long Hedges",
        description: "When to use which hedge and the impact of basis risk.",
        content: `**1. Short Hedge:**
A short hedge involves a short position in futures contracts.
- **Use when:** You already own an asset and expect to sell it in the future, OR you do not own it but expect to own it (e.g., a farmer harvesting corn).
- **Goal:** To lock in a price and protect against a price decline.

**2. Long Hedge:**
A long hedge involves a long position in futures contracts.
- **Use when:** You know you will have to purchase an asset in the future (e.g., an airline needing jet fuel).
- **Goal:** To lock in a price and protect against a price increase.

**3. Basis Risk:**
In practice, hedging is rarely perfect because:
- The asset hedged may not be exactly the same as the asset underlying the futures.
- The hedger may remain uncertain as to the exact date the asset will be bought or sold.
- The hedge may require the futures contract to be closed out before its delivery month.

**Basis = Spot Price of Asset to be Hedged - Futures Price of Contract Used**
The risk is that the Basis changes unpredictably.`
      },
      {
        id: "optimal-hedge",
        title: "Optimal Hedge Ratio",
        description: "Calculating the Minimum Variance Hedge Ratio.",
        content: `When there is no futures contract on the specific asset being hedged (Cross Hedging), we must calculate the Optimal Hedge Ratio ($h^*$) to minimize the variance of the hedged position.

**Formula:**
$$h^* = \\rho \\frac{\\sigma_S}{\\sigma_F}$$

Where:
- $\\rho$ (rho): Correlation coefficient between the change in spot price and the change in futures price.
- $\\sigma_S$: Standard deviation of $\\Delta S$.
- $\\sigma_F$: Standard deviation of $\\Delta F$.

**Optimal Number of Contracts ($N^*$):**
$$N^* = h^* \\frac{Q_A}{Q_F}$$

Where:
- $Q_A$: Size of position being hedged.
- $Q_F$: Size of one futures contract.

**Tailing the Hedge:**
If daily settlement is considered, the formula is slightly adjusted to account for the interest on margin variation, but standard $h^*$ is the primary industry metric.`
      }
    ]
  },
  {
    id: ModuleId.OPTIONS_BASICS,
    title: "3. Properties of Options",
    lessons: [
      {
        id: "put-call-parity",
        title: "Put-Call Parity",
        description: "The no-arbitrage relationship between calls, puts, and the underlying.",
        content: `Put-Call Parity is a fundamental relationship between the price of a European call option ($c$) and a European put option ($p$) with the same strike price ($K$) and time to maturity ($T$).

**The Equation:**
$$c + K e^{-rT} = p + S_0$$

**Intuition (Arbitrage Portfolios):**
Consider two portfolios:
- **Portfolio A:** One European call option + Cash equal to $K e^{-rT}$.
- **Portfolio B:** One European put option + One share of the stock ($S_0$).

At expiration ($T$):
- If $S_T > K$: Call is exercised (worth $S_T - K$). Cash is worth $K$. Total = $S_T$.
- If $S_T < K$: Put is exercised (worth $K - S_T$). Share is worth $S_T$. Total = $K$.
Both portfolios are worth $\\max(S_T, K)$. Therefore, they must cost the same today.

**Arbitrage Opportunity:**
If $c + K e^{-rT} < p + S_0$, you can buy Portfolio A (Long Call, Save Cash) and sell Portfolio B (Short Put, Short Stock) to lock in a risk-free profit.`
      },
      {
        id: "option-bounds",
        title: "Trading Strategies: Spreads",
        description: "Bull Spreads, Bear Spreads, and Butterfly Spreads.",
        content: `**1. Bull Spread:**
- **Strategy:** Buy a call with a low strike ($K_1$) and sell a call with a higher strike ($K_2$).
- **View:** Moderately bullish. Caps profit but reduces cost of the trade.
- **Payoff:** $\\max(0, S_T - K_1) - \\max(0, S_T - K_2)$.

**2. Bear Spread:**
- **Strategy:** Buy a put with a high strike ($K_2$) and sell a put with a lower strike ($K_1$).
- **View:** Moderately bearish.
- **Goal:** Profit from price decline with limited risk.

**3. Butterfly Spread:**
- **Strategy:** Buy a call at $K_1$, buy a call at $K_3$, and sell two calls at $K_2$ (where $K_2$ is halfway between $K_1$ and $K_3$).
- **View:** Neutral. Expects low volatility.
- **Profit:** Maximum when $S_T = K_2$. Loss is limited to the initial premiums paid.

**4. Straddle:**
- **Strategy:** Buy a call and a put with the same Strike and Expiration.
- **View:** High Volatility (Direction neutral).
- **Goal:** Profit from a large move in *either* direction.`
      }
    ]
  },
  {
    id: ModuleId.PRICING_MODELS,
    title: "4. The Black-Scholes-Merton Model",
    lessons: [
      {
        id: "bsm-assumptions",
        title: "BSM Assumptions & Concepts",
        description: "Lognormal property and risk-neutral valuation.",
        content: `**The Lognormal Property:**
The BSM model assumes stock prices follow a Geometric Brownian Motion. This implies that the logarithm of the stock price is normally distributed.
$$\\ln S_T \\sim N[\\ln S_0 + (\\mu - \\sigma^2/2)T, \\sigma^2 T]$$

**Key Assumptions:**
1. Stock price follows a random walk (Markov process).
2. No arbitrage opportunities.
3. Constant risk-free rate ($r$) and volatility ($\\sigma$).
4. No transaction costs or taxes.
5. Short selling is permitted.
6. The stock pays no dividends during the option's life (though the model can be adjusted for yield $q$).

**Risk-Neutral Valuation:**
A powerful result in derivatives is that we can value an option assuming the expected return on the stock is the risk-free rate ($r$). The risk preference of investors does not affect the price of the derivative.`
      },
      {
        id: "bsm-formula",
        title: "The BSM Formulas",
        description: "The closed-form solution for European options.",
        content: `**Pricing a European Call ($c$):**
$$c = S_0 N(d_1) - K e^{-rT} N(d_2)$$

**Pricing a European Put ($p$):**
$$p = K e^{-rT} N(-d_2) - S_0 N(-d_1)$$

**Where:**
$$d_1 = \\frac{\\ln(S_0/K) + (r + \\sigma^2/2)T}{\\sigma \\sqrt{T}}$$
$$d_2 = d_1 - \\sigma \\sqrt{T}$$

**Interpretation:**
- $N(d_2)$: The probability that the call option will be exercised in a risk-neutral world.
- $N(d_1)$: Sensitivity of the option price to the stock price (related to Delta).
- $S_0 N(d_1)$: Expected value of receiving the stock.
- $K e^{-rT} N(d_2)$: Expected cost of paying the strike price.

This formula revolutionized finance by providing a way to hedge and price risk precisely.`
      }
    ]
  },
  {
    id: ModuleId.THE_GREEKS,
    title: "5. The Greeks & Hedging",
    lessons: [
      {
        id: "delta-gamma",
        title: "Delta (Δ) and Gamma (Γ)",
        description: "Managing directional risk and curvature risk.",
        content: `**1. Delta ($\\Delta$):**
Rate of change of the option price with respect to the asset price.
- **Call Delta:** $N(d_1)$ (between 0 and 1).
- **Put Delta:** $N(d_1) - 1$ (between -1 and 0).
- **Delta Hedging:** To make a portfolio Delta Neutral, if you are short an option with Delta 0.6, you must buy 0.6 shares of the stock.

**2. Gamma ($\\Gamma$):**
Rate of change of Delta with respect to the asset price (Curvature).
- $\\Gamma = \\frac{N'(d_1)}{S_0 \\sigma \\sqrt{T}}$
- If Gamma is high, Delta changes rapidly, meaning you must rebalance your hedge frequently.
- Gamma is highest for At-The-Money (ATM) options near expiration.
- A Delta-Neutral portfolio is only protected against *small* price moves. Gamma protection covers larger moves.`
      },
      {
        id: "theta-vega-rho",
        title: "Theta, Vega, and Rho",
        description: "Time decay, volatility risk, and interest rate sensitivity.",
        content: `**1. Theta ($\\Theta$):**
Rate of change of option price with respect to time (Time Decay).
- Usually negative for long option positions.
- "Time is the enemy of the option buyer."
- Theta is not a hedgeable risk in the same way (time passes deterministically), but it explains P&L attribution.

**2. Vega ($\\nu$):**
Rate of change of option price with respect to Volatility ($\\sigma$).
- Vega is highest for ATM options.
- Essential for "Volatility Trading." If you buy a straddle, you are "Long Vega" (you want volatility to rise).

**3. Rho ($\\rho$):**
Rate of change of option price with respect to the risk-free rate ($r$).
- Less significant in low-interest environments.
- Call options generally have positive Rho; Puts have negative Rho.`
      }
    ]
  },
  {
    id: ModuleId.QUANT_STRATEGIES,
    title: "6. Advanced Volatility & VaR",
    lessons: [
      {
        id: "vol-smiles",
        title: "Volatility Smiles & Skews",
        description: "Beyond constant volatility assumptions.",
        content: `The BSM model assumes constant volatility, but markets show otherwise.

**1. Volatility Smile (FX Markets):**
Both deep OTM calls and puts tend to have higher implied volatilities than ATM options. This suggests traders fear extreme moves (fat tails) more than the normal distribution predicts.

**2. Volatility Skew (Equity Markets):**
OTM Puts usually have much higher implied volatility than OTM Calls.
- **Reason:** "Crashophobia." Investors pay a premium for insurance against market crashes.
- This creates a downward sloping volatility curve with respect to strike price.

**Term Structure of Volatility:**
Implied volatility also varies with time to maturity. A "Volatility Surface" maps Implied Vol against Strike ($K$) and Maturity ($T$).`
      },
      {
        id: "value-at-risk",
        title: "Value at Risk (VaR)",
        description: "Measuring total market risk exposure.",
        content: `VaR asks: "What is the maximum loss I might suffer with X% confidence over a specific time horizon?"

**1. Historical Simulation:**
- Take last 500 days of data.
- Apply percentage changes to current portfolio.
- Rank the outcomes. The 1st percentile is your 99% VaR.

**2. Model-Building (Variance-Covariance) Approach:**
- Assumes returns are normally distributed.
- VaR = $\\alpha \\times \\sigma_{portfolio} \\times \\text{Value}$.
- Requires a correlation matrix between all assets in the portfolio.

**3. Expected Shortfall (ES):**
- Also known as C-VaR (Conditional VaR).
- Measures the *expected* loss *given* that the loss exceeds the VaR threshold.
- Regulators (Basel III/FRTB) are moving towards ES as it captures tail risk better than simple VaR.`
      }
    ]
  }
];
