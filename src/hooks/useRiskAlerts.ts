"use client";

import { useState, useEffect } from "react";
import { getVolatilityData } from "@/services/polygonService";
import { evaluateRisk, type RiskAlert } from "@/utils/riskEngine";

export const useRiskAlerts = (watchlist: string[] = []) => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!watchlist.length) {
      setAlerts([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const checkAlerts = async () => {
      try {
        setIsLoading(true);
        const volatilityData = await Promise.all(
          watchlist.map((ticker) => getVolatilityData(ticker))
        );
        if (!cancelled) {
          const evaluated = volatilityData.flatMap(evaluateRisk);
          setAlerts(evaluated);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    checkAlerts();
    return () => {
      cancelled = true;
    };
  }, [watchlist]);

  return { alerts, isLoading };
};
