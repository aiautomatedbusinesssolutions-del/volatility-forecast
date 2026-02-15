import { RISK_THRESHOLDS } from "@/data/constants";

export interface RiskAlert {
  id: string;
  ticker: string;
  severity: "high" | "medium" | "low";
  message: string;
}

export interface VolatilityData {
  ticker: string;
  results: { c: number; o: number; h: number; l: number; v: number; t: number }[];
  count: number;
}

export const calculateHistoricalVolatility = (prices: number[]): number => {
  if (prices.length < 2) return 0;

  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push(Math.log(prices[i] / prices[i - 1]));
  }

  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (returns.length - 1);
  const dailyVol = Math.sqrt(variance);

  return dailyVol * Math.sqrt(252);
};

export const evaluateRisk = (tickerData: VolatilityData): RiskAlert[] => {
  const { ticker, results } = tickerData;
  if (!results || results.length < 5) return [];

  const closePrices = results.map((r) => r.c);
  const annualizedVol = calculateHistoricalVolatility(closePrices);
  const alerts: RiskAlert[] = [];

  if (annualizedVol > RISK_THRESHOLDS.HIGH_VOL) {
    alerts.push({
      id: `${ticker}-high-vol`,
      ticker,
      severity: "high",
      message: `Volatility level is ${(annualizedVol * 100).toFixed(1)}%, significantly above normal levels.`,
    });
  } else if (annualizedVol > RISK_THRESHOLDS.MEDIUM_VOL) {
    alerts.push({
      id: `${ticker}-med-vol`,
      ticker,
      severity: "medium",
      message: `Elevated volatility at ${(annualizedVol * 100).toFixed(1)}%.`,
    });
  }

  const lastReturn = Math.abs(
    Math.log(closePrices[closePrices.length - 1] / closePrices[closePrices.length - 2])
  );
  if (lastReturn > RISK_THRESHOLDS.LARGE_MOVE) {
    alerts.push({
      id: `${ticker}-large-move`,
      ticker,
      severity: "high",
      message: `Large single-day move of ${(lastReturn * 100).toFixed(2)}% detected.`,
    });
  }

  return alerts;
};

export interface SP500Comparison {
  label: string;
  ratio: number;
}

export const compareSP500Volatility = (
  tickerVol: number,
  sp500Vol: number
): SP500Comparison => {
  const ratio = tickerVol / sp500Vol;
  if (ratio > 2) return { label: "Much more volatility than S&P 500", ratio };
  if (ratio > 1.3) return { label: "More volatility than S&P 500", ratio };
  if (ratio > 0.7) return { label: "Similar volatility to S&P 500", ratio };
  return { label: "Less volatility than S&P 500", ratio };
};
