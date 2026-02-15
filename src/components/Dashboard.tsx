"use client";

import { useState } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import TickerSearch from "@/components/TickerSearch/TickerSearch";
import MarketPulse from "@/components/MarketPulse/MarketPulse";
import RiskAlerts from "@/components/RiskAlerts/RiskAlerts";
import VolatilityExplainer from "@/components/Explainers/VolatilityExplainer";
import type { TickerResult } from "@/services/polygonService";

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const handleTickerSelect = (ticker: TickerResult) => {
    setWatchlist((prev) => {
      if (prev.includes(ticker.symbol)) return prev;
      return [...prev, ticker.symbol];
    });
  };

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">
            Volatility Forecast
          </h1>
          <div className="w-full lg:max-w-lg">
            <TickerSearch onSelect={handleTickerSelect} />
          </div>
        </header>

        {/* Grid — stacks on mobile */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-5">
            <MarketPulse />
            <RiskAlerts watchlist={watchlist} />
            <VolatilityExplainer />
          </div>

          {/* Sidebar */}
          <aside>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="mb-3 text-base font-semibold text-slate-100">
                Watchlist
              </h3>
              {watchlist.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Search and add stocks to track.
                </p>
              ) : (
                <ul>
                  {watchlist.map((symbol) => (
                    <li
                      key={symbol}
                      className="flex items-center justify-between border-b border-slate-800 py-3 last:border-b-0"
                    >
                      <span className="font-medium text-slate-100">
                        {symbol}
                      </span>
                      <button
                        onClick={() =>
                          setWatchlist((prev) =>
                            prev.filter((s) => s !== symbol)
                          )
                        }
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-900/40 min-h-[36px]"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </ErrorBoundary>
  );
}
