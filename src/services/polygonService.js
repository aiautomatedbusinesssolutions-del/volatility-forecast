import { polygonFetch } from './apiClient';

export const searchTickers = async (query) => {
  const data = await polygonFetch('/v3/reference/tickers', {
    search: query,
    active: 'true',
    limit: '10',
    market: 'stocks',
  });

  return (data.results || []).map((item) => ({
    symbol: item.ticker,
    name: item.name,
    market: item.market,
    type: item.type,
  }));
};

export const getVolatilityData = async (ticker) => {
  const to = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const data = await polygonFetch(`/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`, {
    adjusted: 'true',
    sort: 'asc',
  });

  return {
    ticker,
    results: data.results || [],
    count: data.resultsCount,
  };
};

export const getTickerDetails = async (ticker) => {
  const data = await polygonFetch(`/v3/reference/tickers/${ticker}`);
  return data.results;
};

export const getSP500Snapshot = async () => {
  const data = await polygonFetch('/v2/snapshot/locale/us/markets/stocks/tickers', {
    tickers: 'SPY',
  });
  return data.tickers?.[0] || null;
};
