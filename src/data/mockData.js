export const MOCK_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
];

export const MOCK_SENTIMENT = {
  sentiment: { score: 35, category: 'fear' },
  vixLevel: 22.5,
};

export const MOCK_ALERTS = [
  {
    id: 'TSLA-high-vol',
    ticker: 'TSLA',
    severity: 'high',
    message: 'Annualized volatility is 62.3%, significantly above normal levels.',
  },
  {
    id: 'NVDA-med-vol',
    ticker: 'NVDA',
    severity: 'medium',
    message: 'Elevated volatility at 38.1% annualized.',
  },
  {
    id: 'AAPL-large-move',
    ticker: 'AAPL',
    severity: 'low',
    message: 'Volatility within normal range at 22.4% annualized.',
  },
];

export const MOCK_PRICE_HISTORY = {
  AAPL: [
    { date: '2025-01-01', close: 185.5 },
    { date: '2025-01-02', close: 187.2 },
    { date: '2025-01-03', close: 184.8 },
    { date: '2025-01-06', close: 186.1 },
    { date: '2025-01-07', close: 188.9 },
  ],
};
