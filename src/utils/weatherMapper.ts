/**
 * Maps annualized volatility to weather conditions and heat scores.
 * All functions expect vol as a decimal (e.g. 0.30 = 30%).
 *
 * Traffic light palette:
 *   Emerald  = calm, low volatility
 *   Amber    = moderate, caution
 *   Rose     = high volatility, stormy
 */

export type WeatherTier = "calm" | "mild" | "moderate" | "high" | "extreme";

export interface WeatherCondition {
  label: string;
  description: string;
  emoji: string;
  tier: WeatherTier;
}

export const getWeatherCondition = (annualizedVol: number): WeatherCondition => {
  const pct = annualizedVol * 100;

  if (pct <= 10)
    return {
      label: "Sunny",
      description: "Very calm conditions — smooth sailing ahead.",
      emoji: "\u2600\uFE0F",
      tier: "calm",
    };
  if (pct <= 20)
    return {
      label: "Partly Cloudy",
      description: "Mild volatility — a few clouds on the horizon.",
      emoji: "\u26C5",
      tier: "mild",
    };
  if (pct <= 35)
    return {
      label: "Cloudy",
      description: "Noticeable movement — expect some chop.",
      emoji: "\u2601\uFE0F",
      tier: "moderate",
    };
  if (pct <= 50)
    return {
      label: "Rainy",
      description: "Unsettled conditions — turbulence detected.",
      emoji: "\uD83C\uDF27\uFE0F",
      tier: "high",
    };
  return {
    label: "Stormy",
    description: "Extreme turbulence — hold on tight.",
    emoji: "\u26C8\uFE0F",
    tier: "extreme",
  };
};

export const getHeatScore = (annualizedVol: number): number => {
  const pct = annualizedVol * 100;
  if (pct <= 5) return 1;
  if (pct <= 10) return 2;
  if (pct <= 15) return 3;
  if (pct <= 20) return 4;
  if (pct <= 27) return 5;
  if (pct <= 35) return 6;
  if (pct <= 42) return 7;
  if (pct <= 50) return 8;
  if (pct <= 65) return 9;
  return 10;
};

/**
 * Returns the Tailwind color class for a heat score segment.
 * 1-3 = emerald (calm), 4-6 = amber (moderate), 7-10 = rose (stormy)
 */
export const getHeatColor = (score: number): string => {
  if (score <= 3) return "bg-emerald-400";
  if (score <= 6) return "bg-amber-400";
  return "bg-rose-400";
};

export const getHeatHexColor = (score: number): string => {
  if (score <= 3) return "#34d399";
  if (score <= 6) return "#fbbf24";
  return "#fb7185";
};

/**
 * Returns a tier class name for traffic-light color coding.
 */
export const getTierClass = (
  tier: WeatherTier
): "calm" | "moderate" | "high" => {
  if (tier === "calm" || tier === "mild") return "calm";
  if (tier === "moderate") return "moderate";
  return "high";
};
