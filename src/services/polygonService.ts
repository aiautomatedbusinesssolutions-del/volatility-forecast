import { polygonFetch } from "./apiClient";

export interface TickerResult {
  symbol: string;
  name: string;
  market: string;
  type: string;
}

export const searchTickers = async (query: string): Promise<TickerResult[]> => {
  const upper = query.toUpperCase().trim();
  const isTickerLike = /^[A-Z]{1,5}$/.test(upper);

  // Search by both ticker prefix and company name in parallel
  const requests: Promise<{ results?: { ticker: string; name: string; market: string; type: string }[] }>[] = [
    // Always search by company name
    polygonFetch("/v3/reference/tickers", {
      search: query,
      active: "true",
      limit: "10",
      market: "stocks",
    }),
  ];

  // If it looks like a ticker symbol, also search by ticker prefix
  if (isTickerLike) {
    // Use ticker.gte/ticker.lt range to match tickers starting with the query
    const nextChar = upper.slice(0, -1) + String.fromCharCode(upper.charCodeAt(upper.length - 1) + 1);
    requests.push(
      polygonFetch("/v3/reference/tickers", {
        "ticker.gte": upper,
        "ticker.lt": nextChar,
        active: "true",
        limit: "10",
        market: "stocks",
      })
    );
  }

  const responses = await Promise.all(requests);

  // Merge and deduplicate results
  const seen = new Set<string>();
  const merged: TickerResult[] = [];

  for (const data of responses) {
    for (const item of data.results || []) {
      if (!seen.has(item.ticker)) {
        seen.add(item.ticker);
        merged.push({
          symbol: item.ticker,
          name: item.name,
          market: item.market,
          type: item.type,
        });
      }
    }
  }

  // Sort: exact match first, then prefix matches, then the rest
  merged.sort((a, b) => {
    if (a.symbol === upper) return -1;
    if (b.symbol === upper) return 1;
    if (a.symbol.startsWith(upper) && !b.symbol.startsWith(upper)) return -1;
    if (b.symbol.startsWith(upper) && !a.symbol.startsWith(upper)) return 1;
    return 0;
  });

  return merged.slice(0, 10);
};

export interface VolatilityDataResult {
  ticker: string;
  results: { c: number; o: number; h: number; l: number; v: number; t: number }[];
  count: number;
}

export const getVolatilityData = async (
  ticker: string
): Promise<VolatilityDataResult> => {
  const to = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const data = await polygonFetch(
    `/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`,
    { adjusted: "true", sort: "asc" }
  );

  return {
    ticker,
    results: data.results || [],
    count: data.resultsCount,
  };
};

export const getTickerDetails = async (ticker: string) => {
  const data = await polygonFetch(`/v3/reference/tickers/${ticker}`);
  return data.results;
};

export const getSP500Snapshot = async () => {
  const data = await polygonFetch(
    "/v2/snapshot/locale/us/markets/stocks/tickers",
    { tickers: "SPY" }
  );
  return data.tickers?.[0] || null;
};
