export const RISK_THRESHOLDS = {
  HIGH_VOL: 0.5,
  MEDIUM_VOL: 0.3,
  LARGE_MOVE: 0.03,
};

export const EXPLAINER_CONTENT = [
  {
    id: "what-is-volatility",
    title: "What is Volatility?",
    body: "Volatility measures how much a stock's price moves around. High volatility means bigger swings up and down. Low volatility means the price stays relatively steady. Think of it like weather — some days are calm, others are stormy.",
    keyTakeaway:
      "Volatility isn't good or bad — it just means there's more movement. More movement can mean more potential opportunity, but also more uncertainty.",
  },
  {
    id: "historical-vs-implied",
    title: "Past Weather vs. Forecast",
    body: "Historical volatility looks at what actually happened — how much the price moved over the last 30 days. Implied volatility is the market's best guess about what might happen next, based on how options are priced.",
    keyTakeaway:
      "Historical tells you what happened. Implied tells you what traders expect could happen.",
  },
  {
    id: "vix-explained",
    title: "The VIX (Market Mood Ring)",
    body: "The VIX measures how nervous or calm the overall market is feeling, based on S&P 500 options. When the VIX is high (above 30), traders expect stormy conditions. When it's low (below 15), the market expects calm waters ahead.",
    keyTakeaway:
      "A high VIX likely means the market expects turbulence. A low VIX suggests calm conditions are expected.",
  },
  {
    id: "volatility-and-risk",
    title: "Volatility & Your Portfolio",
    body: "Understanding a stock's volatility level helps you decide how much to invest. A stock with high volatility can potentially move 2-3% in a single day, so you may want to invest less per position to manage your exposure.",
    keyTakeaway:
      "Higher volatility historically means bigger swings — consider smaller positions to manage your exposure.",
  },
];

export const SP500_BENCHMARK = "SPY";

export const REFRESH_INTERVALS = {
  MARKET_PULSE: 60000,
  RISK_ALERTS: 300000,
  TICKER_DATA: 120000,
};
