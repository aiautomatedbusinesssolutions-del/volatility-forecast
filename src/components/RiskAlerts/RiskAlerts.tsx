"use client";

import { useRiskAlerts } from "@/hooks/useRiskAlerts";

const severityStyles = {
  high: {
    border: "border-l-rose-400",
    bg: "bg-rose-400/5",
    badge: "bg-rose-900 text-rose-400",
  },
  medium: {
    border: "border-l-amber-400",
    bg: "bg-amber-400/5",
    badge: "bg-amber-900 text-amber-400",
  },
  low: {
    border: "border-l-emerald-400",
    bg: "bg-emerald-400/5",
    badge: "bg-emerald-900 text-emerald-400",
  },
} as const;

interface RiskAlertsProps {
  watchlist: string[];
}

export default function RiskAlerts({ watchlist }: RiskAlertsProps) {
  const { alerts, isLoading } = useRiskAlerts(watchlist);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        Checking alerts...
      </div>
    );
  }

  if (!alerts.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        No active alerts.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">
        Risk Alerts
      </h2>
      <ul className="flex flex-col gap-3">
        {alerts.map((alert) => {
          const s = severityStyles[alert.severity] ?? severityStyles.low;
          return (
            <li
              key={alert.id}
              className={`rounded-xl border-l-4 ${s.border} ${s.bg} px-4 py-3`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-100">
                  {alert.ticker}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${s.badge}`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {alert.message}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
