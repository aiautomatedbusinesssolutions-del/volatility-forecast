import { alphaVantageFetch } from './apiClient';

export const getMarketSentiment = async () => {
  const data = await alphaVantageFetch({
    function: 'NEWS_SENTIMENT',
    topics: 'financial_markets',
  });

  const sentimentScore = data.feed?.[0]?.overall_sentiment_score ?? 0;

  return {
    sentiment: {
      score: Math.round((sentimentScore + 1) * 50),
      category: categorizeSentiment(sentimentScore),
    },
    vixLevel: null, // VIX fetched separately via Polygon
  };
};

const categorizeSentiment = (score) => {
  if (score <= -0.35) return 'extreme_fear';
  if (score <= -0.15) return 'fear';
  if (score <= 0.15) return 'neutral';
  if (score <= 0.35) return 'greed';
  return 'extreme_greed';
};

export const getHistoricalVolatility = async (symbol) => {
  const data = await alphaVantageFetch({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: 'compact',
  });

  const timeSeries = data['Time Series (Daily)'] || {};

  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume'], 10),
  }));
};
