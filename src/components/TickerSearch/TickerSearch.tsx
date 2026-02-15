"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import type { TickerResult } from "@/services/polygonService";
import VolatilityForecast from "./VolatilityForecast";

interface TickerSearchProps {
  onSelect: (ticker: TickerResult) => void;
}

export default function TickerSearch({ onSelect }: TickerSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { results, isLoading } = useDebouncedSearch(query);

  const handleSelect = (ticker: TickerResult) => {
    setSelectedTicker(ticker.symbol);
    setQuery("");
    onSelect(ticker);
  };

  const handleClear = () => {
    setSelectedTicker(null);
    setQuery("");
  };

  return (
    <div className="relative w-full">
      {/* Search row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            size={18}
          />
          <input
            type="text"
            placeholder="Search any stock (e.g. AAPL, TSLA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-4 pl-11 pr-4 text-slate-100 placeholder:text-slate-500 transition-all focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>
        {selectedTicker && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 min-h-[52px]"
          >
            <X size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <p className="mt-2 text-sm text-slate-500">Searching...</p>
      )}

      {/* Dropdown results */}
      {query.trim().length > 0 && !isLoading && (
        <ul className="absolute top-[60px] left-0 right-0 z-10 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-2xl shadow-black/40">
          {/* Direct ticker lookup option — always available */}
          {/^[A-Za-z]{1,5}$/.test(query.trim()) &&
            !results.some(
              (r) => r.symbol === query.trim().toUpperCase()
            ) && (
              <li
                onClick={() =>
                  handleSelect({
                    symbol: query.trim().toUpperCase(),
                    name: query.trim().toUpperCase(),
                    market: "stocks",
                    type: "CS",
                  })
                }
                className="flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition-colors hover:bg-slate-800 min-h-[48px] border-b border-slate-800"
              >
                <span className="font-semibold text-sky-400">
                  {query.trim().toUpperCase()}
                </span>
                <span className="text-sm text-slate-400 text-right ml-3">
                  Look up this ticker directly
                </span>
              </li>
            )}
          {results.map((ticker) => (
            <li
              key={ticker.symbol}
              onClick={() => handleSelect(ticker)}
              className="flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition-colors hover:bg-slate-800 min-h-[48px]"
            >
              <span className="font-semibold text-slate-100">
                {ticker.symbol}
              </span>
              <span className="text-sm text-slate-400 text-right ml-3">
                {ticker.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Volatility Forecast panel */}
      <VolatilityForecast ticker={selectedTicker} />
    </div>
  );
}
