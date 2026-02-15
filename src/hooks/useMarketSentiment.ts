"use client";

import { useState, useEffect } from "react";
import {
  getMarketSentiment,
  type MarketSentimentData,
} from "@/services/alphaVantageService";

export const useMarketSentiment = () => {
  const [sentiment, setSentiment] = useState<
    MarketSentimentData["sentiment"] | null
  >(null);
  const [vixLevel, setVixLevel] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSentiment = async () => {
      try {
        setIsLoading(true);
        const data = await getMarketSentiment();
        if (!cancelled) {
          setSentiment(data.sentiment);
          setVixLevel(data.vixLevel);
        }
      } catch (err) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchSentiment();
    return () => {
      cancelled = true;
    };
  }, []);

  return { sentiment, vixLevel, isLoading, error };
};
