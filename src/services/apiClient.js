const API_CONFIG = {
  polygon: {
    baseUrl: 'https://api.polygon.io',
    apiKey: process.env.REACT_APP_POLYGON_API_KEY,
  },
  alphaVantage: {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
  },
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const polygonFetch = async (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.polygon.baseUrl}${endpoint}`);
  url.searchParams.set('apiKey', API_CONFIG.polygon.apiKey);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());
  return handleResponse(response);
};

export const alphaVantageFetch = async (params = {}) => {
  const url = new URL(API_CONFIG.alphaVantage.baseUrl);
  url.searchParams.set('apikey', API_CONFIG.alphaVantage.apiKey);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());
  return handleResponse(response);
};
