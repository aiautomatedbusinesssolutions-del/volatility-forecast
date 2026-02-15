// Read env vars via getter functions so the bundler inlines them reliably.
// The literal `process.env.NEXT_PUBLIC_*` expression must appear directly
// for Next.js static replacement to work at build time.
const getPolygonKey = () => process.env.NEXT_PUBLIC_POLYGON_API_KEY ?? "";
const getAlphaVantageKey = () => process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY ?? "";

export const hasApiKeys = () =>
  getPolygonKey().length > 0 && getAlphaVantageKey().length > 0;

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    throw new Error(
      "API key missing or invalid (401). Check that NEXT_PUBLIC_POLYGON_API_KEY and NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY are set."
    );
  }
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const polygonFetch = async (
  endpoint: string,
  params: Record<string, string> = {}
) => {
  const url = new URL(`https://api.polygon.io${endpoint}`);
  url.searchParams.set("apiKey", getPolygonKey());
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url.toString());
  return handleResponse(response);
};

export const alphaVantageFetch = async (
  params: Record<string, string> = {}
) => {
  const url = new URL("https://www.alphavantage.co/query");
  url.searchParams.set("apikey", getAlphaVantageKey());
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url.toString());
  return handleResponse(response);
};
