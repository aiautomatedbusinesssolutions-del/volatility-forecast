import { alphaVantageFetch } from "./apiClient";

type SentimentCategory =
  | "extreme_fear"
  | "fear"
  | "neutral"
  | "greed"
  | "extreme_greed";

const categorizeSentiment = (score: number): SentimentCategory => {
  if (score <= -0.35) return "extreme_fear";
  if (score <= -0.15) return "fear";
  if (score <= 0.15) return "neutral";
  if (score <= 0.35) return "greed";
  return "extreme_greed";
};

export interface MarketSentimentData {
  sentiment: {
    score: number;
    category: SentimentCategory;
  };
  vixLevel: number | null;
}

export const getMarketSentiment = async (): Promise<MarketSentimentData> => {
  const data = await alphaVantageFetch({
    function: "NEWS_SENTIMENT",
    topics: "financial_markets",
  });

  const sentimentScore: number =
    data.feed?.[0]?.overall_sentiment_score ?? 0;

  return {
    sentiment: {
      score: Math.round((sentimentScore + 1) * 50),
      category: categorizeSentiment(sentimentScore),
    },
    vixLevel: null,
  };
};

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const getHistoricalVolatility = async (
  symbol: string
): Promise<HistoricalPrice[]> => {
  const data = await alphaVantageFetch({
    function: "TIME_SERIES_DAILY",
    symbol,
    outputsize: "compact",
  });

  const timeSeries: Record<string, Record<string, string>> =
    data["Time Series (Daily)"] || {};

  return Object.entries(timeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"], 10),
    })
  );
};
