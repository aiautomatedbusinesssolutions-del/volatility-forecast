import { RISK_THRESHOLDS } from '../data/constants';

export const calculateHistoricalVolatility = (prices) => {
  if (prices.length < 2) return 0;

  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push(Math.log(prices[i] / prices[i - 1]));
  }

  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (returns.length - 1);
  const dailyVol = Math.sqrt(variance);

  // Annualize (252 trading days)
  return dailyVol * Math.sqrt(252);
};

export const evaluateRisk = (tickerData) => {
  const { ticker, results } = tickerData;
  if (!results || results.length < 5) return [];

  const closePrices = results.map((r) => r.c);
  const annualizedVol = calculateHistoricalVolatility(closePrices);
  const alerts = [];

  if (annualizedVol > RISK_THRESHOLDS.HIGH_VOL) {
    alerts.push({
      id: `${ticker}-high-vol`,
      ticker,
      severity: 'high',
      message: `Annualized volatility is ${(annualizedVol * 100).toFixed(1)}%, significantly above normal levels.`,
    });
  } else if (annualizedVol > RISK_THRESHOLDS.MEDIUM_VOL) {
    alerts.push({
      id: `${ticker}-med-vol`,
      ticker,
      severity: 'medium',
      message: `Elevated volatility at ${(annualizedVol * 100).toFixed(1)}% annualized.`,
    });
  }

  // Check for large single-day moves
  const lastReturn = Math.abs(Math.log(closePrices.at(-1) / closePrices.at(-2)));
  if (lastReturn > RISK_THRESHOLDS.LARGE_MOVE) {
    alerts.push({
      id: `${ticker}-large-move`,
      ticker,
      severity: 'high',
      message: `Large single-day move of ${(lastReturn * 100).toFixed(2)}% detected.`,
    });
  }

  return alerts;
};

export const compareSP500Volatility = (tickerVol, sp500Vol) => {
  const ratio = tickerVol / sp500Vol;
  if (ratio > 2) return { label: 'Much higher than S&P 500', ratio };
  if (ratio > 1.3) return { label: 'Higher than S&P 500', ratio };
  if (ratio > 0.7) return { label: 'Similar to S&P 500', ratio };
  return { label: 'Lower than S&P 500', ratio };
};
