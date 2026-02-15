const API_CONFIG = {
  polygon: {
    baseUrl: "https://api.polygon.io",
    apiKey: process.env.NEXT_PUBLIC_POLYGON_API_KEY ?? "",
  },
  alphaVantage: {
    baseUrl: "https://www.alphavantage.co/query",
    apiKey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY ?? "",
  },
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const polygonFetch = async (
  endpoint: string,
  params: Record<string, string> = {}
) => {
  const url = new URL(`${API_CONFIG.polygon.baseUrl}${endpoint}`);
  url.searchParams.set("apiKey", API_CONFIG.polygon.apiKey);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url.toString());
  return handleResponse(response);
};

export const alphaVantageFetch = async (
  params: Record<string, string> = {}
) => {
  const url = new URL(API_CONFIG.alphaVantage.baseUrl);
  url.searchParams.set("apikey", API_CONFIG.alphaVantage.apiKey);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url.toString());
  return handleResponse(response);
};
