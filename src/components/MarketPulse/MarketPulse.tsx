"use client";

import { useMarketSentiment } from "@/hooks/useMarketSentiment";

const SENTIMENT_LABELS: Record<
  string,
  { label: string; className: string }
> = {
  extreme_fear: { label: "Extreme Fear", className: "text-rose-400" },
  fear: { label: "Fear", className: "text-amber-400" },
  neutral: { label: "Neutral", className: "text-sky-400" },
  greed: { label: "Greed", className: "text-emerald-400" },
  extreme_greed: { label: "Extreme Greed", className: "text-emerald-400" },
};

export default function MarketPulse() {
  const { sentiment, vixLevel, isLoading, error } = useMarketSentiment();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        Loading market data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        Unable to load market mood.
      </div>
    );
  }

  const info =
    SENTIMENT_LABELS[sentiment?.category ?? "neutral"] ??
    SENTIMENT_LABELS.neutral;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">
        Market Mood
      </h2>

      <div className="flex flex-col items-center gap-2 py-6">
        <span className={`text-5xl font-bold ${info.className}`}>
          {sentiment?.score ?? "--"}
        </span>
        <span className={`text-lg font-medium ${info.className}`}>
          {info.label}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3">
        <span className="text-sm text-slate-400">VIX Level</span>
        <span className="font-semibold text-slate-100">
          {vixLevel ?? "--"}
        </span>
      </div>
    </div>
  );
}
