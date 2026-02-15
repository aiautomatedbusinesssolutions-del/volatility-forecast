export const RISK_THRESHOLDS = {
  HIGH_VOL: 0.5,      // 50% annualized volatility
  MEDIUM_VOL: 0.3,    // 30% annualized volatility
  LARGE_MOVE: 0.03,   // 3% single-day move
};

export const EXPLAINER_CONTENT = [
  {
    id: 'what-is-volatility',
    title: 'What is Volatility?',
    body: 'Volatility measures how much a stock\'s price fluctuates over time. High volatility means prices swing dramatically, while low volatility means prices stay relatively stable. It\'s typically expressed as an annualized percentage.',
    keyTakeaway: 'Volatility is not the same as risk — it measures uncertainty in both directions, up and down.',
  },
  {
    id: 'historical-vs-implied',
    title: 'Historical vs. Implied',
    body: 'Historical volatility looks at past price movements to calculate how much a stock has actually moved. Implied volatility is forward-looking — it\'s derived from options prices and reflects the market\'s expectation of future movement.',
    keyTakeaway: 'Historical tells you what happened. Implied tells you what the market expects to happen.',
  },
  {
    id: 'vix-explained',
    title: 'The VIX (Fear Index)',
    body: 'The VIX is the CBOE Volatility Index, often called the "Fear Index." It measures the market\'s expectation of 30-day volatility for the S&P 500, derived from options prices. A VIX above 30 typically signals high fear; below 15 suggests complacency.',
    keyTakeaway: 'When the VIX spikes, the market expects turbulence ahead. When it\'s low, calm waters are expected.',
  },
  {
    id: 'volatility-and-risk',
    title: 'Volatility & Your Portfolio',
    body: 'Understanding volatility helps you size positions, set stop-losses, and manage overall portfolio risk. A stock with 40% annualized volatility can reasonably move 2.5% in a single day, so your position size should account for that.',
    keyTakeaway: 'Use volatility to calibrate position sizes — higher volatility means smaller positions for the same dollar risk.',
  },
];

export const SP500_BENCHMARK = 'SPY';

export const REFRESH_INTERVALS = {
  MARKET_PULSE: 60000,   // 1 minute
  RISK_ALERTS: 300000,   // 5 minutes
  TICKER_DATA: 120000,   // 2 minutes
};
