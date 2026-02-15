"use client";

import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import useVolatilityForecast from "@/hooks/useVolatilityForecast";
import {
  getHeatColor,
  getTierClass,
  type WeatherCondition,
} from "@/utils/weatherMapper";
import type { SP500Comparison } from "@/utils/riskEngine";

/* ---------- Weather tier → Tailwind classes ---------- */
const tierStyles = {
  calm: {
    gradient: "from-emerald-400/10 to-transparent",
    label: "text-emerald-400",
  },
  moderate: {
    gradient: "from-amber-400/10 to-transparent",
    label: "text-amber-400",
  },
  high: {
    gradient: "from-rose-400/10 to-transparent",
    label: "text-rose-400",
  },
} as const;

const compStyles = {
  calm: { bg: "bg-emerald-400/5", icon: "text-emerald-400" },
  moderate: { bg: "bg-amber-400/5", icon: "text-amber-400" },
  high: { bg: "bg-rose-400/5", icon: "text-rose-400" },
} as const;

/* ---------- Sub-components ---------- */

function HeatScale({ score }: { score: number }) {
  const segments = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="border-b border-slate-800 px-5 py-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        How much volatility does this stock have?
      </p>
      <div className="flex gap-[3px]">
        {segments.map((n) => {
          const filled = n <= score;
          const current = n === score;
          return (
            <div
              key={n}
              className={`relative flex-1 h-8 rounded-md transition-transform ${
                filled ? getHeatColor(n) : "bg-slate-800"
              } ${current ? "scale-y-[1.2] shadow-lg" : ""}`}
            >
              {current && (
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[0.65rem] font-bold text-slate-100">
                  {n}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-between text-[0.7rem] text-slate-500">
        <span>Calm</span>
        <span>Turbulent</span>
      </div>
    </div>
  );
}

function ComparisonCard({
  comparison,
  tickerVol,
  sp500Vol,
  ticker,
}: {
  comparison: SP500Comparison;
  tickerVol: number;
  sp500Vol: number;
  ticker: string;
}) {
  const tierKey =
    comparison.ratio > 1.3
      ? "high"
      : comparison.ratio < 0.7
        ? "calm"
        : "moderate";
  const styles = compStyles[tierKey];
  const CompIcon =
    comparison.ratio > 1.3
      ? TrendingUp
      : comparison.ratio < 0.7
        ? TrendingDown
        : Minus;

  return (
    <div
      className={`flex items-start gap-4 border-b border-slate-800 px-5 py-5 ${styles.bg}`}
    >
      <div className={`mt-0.5 shrink-0 ${styles.icon}`}>
        <CompIcon size={20} />
      </div>
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500">
          vs. S&P 500
        </p>
        <p className="mt-0.5 font-semibold text-slate-100">
          {comparison.label}
        </p>
        <p className="mt-0.5 text-sm text-slate-400">
          {ticker} {(tickerVol * 100).toFixed(1)}% &middot; S&P 500{" "}
          {(sp500Vol * 100).toFixed(1)}% &middot; {comparison.ratio.toFixed(2)}x
        </p>
      </div>
    </div>
  );
}

function WhatsHappeningNow({
  ticker,
  heatScore,
  comparison,
  weather,
}: {
  ticker: string;
  heatScore: number;
  comparison: SP500Comparison;
  weather: WeatherCondition;
}) {
  const tier = getTierClass(weather.tier);

  // First sentence: describe current volatility state with weather analogy
  let condition: string;
  if (heatScore <= 2) {
    condition = `${ticker} is experiencing calm skies right now — prices are moving very little compared to what's typical, sitting at ${heatScore} out of 10 on the heat scale.`;
  } else if (heatScore <= 4) {
    condition = `${ticker} is seeing mostly clear conditions with light breezes — price movement is on the gentle side, registering ${heatScore} out of 10 on the heat scale.`;
  } else if (heatScore <= 6) {
    condition = `${ticker} has some unpredictable winds picking up — prices are swinging at a moderate pace, landing at ${heatScore} out of 10 on the heat scale.`;
  } else if (heatScore <= 8) {
    condition = `${ticker} is in stormy conditions right now — prices are swinging more than usual, hitting ${heatScore} out of 10 on the heat scale.`;
  } else {
    condition = `${ticker} is in the middle of a full storm — prices are swinging dramatically, maxing out at ${heatScore} out of 10 on the heat scale.`;
  }

  // Second sentence: compare to S&P 500 to reinforce data
  let context: string;
  if (comparison.ratio > 2) {
    context = `That's over ${comparison.ratio.toFixed(1)}x the movement of the S\u00A0&\u00A0P 500, so expect a much bumpier ride than the broader market.`;
  } else if (comparison.ratio > 1.3) {
    context = `It's running ${comparison.ratio.toFixed(1)}x the S\u00A0&\u00A0P 500's movement — choppier waters than the overall market.`;
  } else if (comparison.ratio > 0.7) {
    context = `It's tracking close to the S\u00A0&\u00A0P 500 at ${comparison.ratio.toFixed(1)}x, so conditions here mirror the broader market.`;
  } else {
    context = `At just ${comparison.ratio.toFixed(1)}x the S\u00A0&\u00A0P 500, this stock is calmer than the broader market right now.`;
  }

  const iconColor =
    tier === "calm"
      ? "text-emerald-400"
      : tier === "moderate"
        ? "text-amber-400"
        : "text-rose-400";

  const bgTint =
    tier === "calm"
      ? "bg-emerald-400/5"
      : tier === "moderate"
        ? "bg-amber-400/5"
        : "bg-rose-400/5";

  return (
    <div className={`border-b border-slate-800 px-5 py-5 ${bgTint}`}>
      <div className="flex items-start gap-3">
        <Info size={16} className={`mt-0.5 shrink-0 ${iconColor}`} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            What&apos;s Happening Right Now
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            {condition} {context}
          </p>
        </div>
      </div>
    </div>
  );
}

function Explainers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="flex gap-3 border-b border-slate-800 px-5 py-4 sm:border-r sm:border-b-0">
        <Info size={14} className="mt-0.5 shrink-0 text-slate-500" />
        <div>
          <p className="text-sm font-semibold text-slate-100">
            Past Weather (Historical)
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
            How much the price actually moved over the last 30 days. Like
            looking out the window right now.
          </p>
        </div>
      </div>
      <div className="flex gap-3 px-5 py-4">
        <Info size={14} className="mt-0.5 shrink-0 text-slate-500" />
        <div>
          <p className="text-sm font-semibold text-slate-100">
            The Forecast (Implied)
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
            What traders expect could happen next, based on options prices. Like
            checking tomorrow&apos;s weather report.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

interface VolatilityForecastProps {
  ticker: string | null;
}

export default function VolatilityForecast({ ticker }: VolatilityForecastProps) {
  const { tickerVol, sp500Vol, heatScore, weather, comparison, isLoading, error } =
    useVolatilityForecast(ticker);

  if (!ticker) return null;

  if (isLoading) {
    return (
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-center gap-3 py-10 text-slate-400">
          <div className="h-5 w-5 rounded-full border-2 border-slate-700 border-t-sky-400 animate-spin-slow" />
          <span className="text-sm">Checking the weather for {ticker}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="m-4 rounded-xl bg-rose-900/40 px-5 py-4 text-center text-sm text-rose-400">
          {error}
        </div>
      </div>
    );
  }

  if (!weather || tickerVol === null || sp500Vol === null || heatScore === null || !comparison) {
    return null;
  }

  const tier = getTierClass(weather.tier);
  const styles = tierStyles[tier];

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Weather Card */}
      <div
        className={`bg-gradient-to-b ${styles.gradient} border-b border-slate-800 px-5 py-8 text-center`}
      >
        <div className="text-5xl leading-none">{weather.emoji}</div>
        <h3 className={`mt-3 text-2xl font-bold ${styles.label}`}>
          {weather.label}
        </h3>
        <p className="mx-auto mt-1 max-w-xs text-sm text-slate-400">
          {weather.description}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {(tickerVol * 100).toFixed(1)}% annualized volatility
        </p>
      </div>

      {/* Heat Scale */}
      <HeatScale score={heatScore} />

      {/* S&P 500 Comparison */}
      <ComparisonCard
        comparison={comparison}
        tickerVol={tickerVol}
        sp500Vol={sp500Vol}
        ticker={ticker}
      />

      {/* What's Happening Right Now */}
      <WhatsHappeningNow
        ticker={ticker}
        heatScore={heatScore}
        comparison={comparison}
        weather={weather}
      />

      {/* Explainers */}
      <Explainers />
    </div>
  );
}
