export const MOCK_TICKERS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
];

export const MOCK_SENTIMENT = {
  sentiment: { score: 35, category: "fear" as const },
  vixLevel: 22.5,
};

export const MOCK_ALERTS = [
  {
    id: "TSLA-high-vol",
    ticker: "TSLA",
    severity: "high" as const,
    message:
      "Volatility level at 62.3% — significantly above normal levels.",
  },
  {
    id: "NVDA-med-vol",
    ticker: "NVDA",
    severity: "medium" as const,
    message: "Elevated volatility at 38.1%.",
  },
  {
    id: "AAPL-large-move",
    ticker: "AAPL",
    severity: "low" as const,
    message: "Volatility within normal range at 22.4%.",
  },
];
