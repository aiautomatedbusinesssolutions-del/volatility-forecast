"use client";

import { useState, useEffect } from "react";
import { getVolatilityData } from "@/services/polygonService";
import {
  calculateHistoricalVolatility,
  compareSP500Volatility,
  type SP500Comparison,
} from "@/utils/riskEngine";
import {
  getWeatherCondition,
  getHeatScore,
  type WeatherCondition,
} from "@/utils/weatherMapper";

export interface VolatilityForecastState {
  tickerVol: number | null;
  sp500Vol: number | null;
  comparison: SP500Comparison | null;
  heatScore: number | null;
  weather: WeatherCondition | null;
  isLoading: boolean;
  error: string | null;
}

const useVolatilityForecast = (ticker: string | null): VolatilityForecastState => {
  const [state, setState] = useState<VolatilityForecastState>({
    tickerVol: null,
    sp500Vol: null,
    comparison: null,
    heatScore: null,
    weather: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!ticker) {
      setState((prev) => ({
        ...prev,
        tickerVol: null,
        sp500Vol: null,
        comparison: null,
        heatScore: null,
        weather: null,
        error: null,
      }));
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const [tickerData, spyData] = await Promise.all([
          getVolatilityData(ticker),
          getVolatilityData("SPY"),
        ]);

        if (cancelled) return;

        const tickerPrices = (tickerData.results || []).map((r) => r.c);
        const spyPrices = (spyData.results || []).map((r) => r.c);

        const tickerVol = calculateHistoricalVolatility(tickerPrices);
        const sp500Vol = calculateHistoricalVolatility(spyPrices);
        const comparison = compareSP500Volatility(tickerVol, sp500Vol);
        const heatScore = getHeatScore(tickerVol);
        const weather = getWeatherCondition(tickerVol);

        setState({
          tickerVol,
          sp500Vol,
          comparison,
          heatScore,
          weather,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error:
              err instanceof Error
                ? err.message
                : "Failed to fetch data",
          }));
        }
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [ticker]);

  return state;
};

export default useVolatilityForecast;
