import { useState, useEffect } from 'react';
import { getMarketSentiment } from '../services/alphaVantageService';

export const useMarketSentiment = () => {
  const [sentiment, setSentiment] = useState(null);
  const [vixLevel, setVixLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchSentiment();
    return () => { cancelled = true; };
  }, []);

  return { sentiment, vixLevel, isLoading, error };
};
