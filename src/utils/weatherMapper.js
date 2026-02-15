/**
 * Maps annualized volatility values to weather conditions and heat scores.
 * All functions expect vol as a decimal (e.g. 0.30 = 30%).
 *
 * Traffic light palette:
 *   Emerald (green)  = calm, low risk
 *   Amber   (yellow) = moderate, caution
 *   Rose    (red)    = high, risky
 */

export const getWeatherCondition = (annualizedVol) => {
  const pct = annualizedVol * 100;

  if (pct <= 10) return { label: 'Sunny', description: 'Very calm conditions — smooth sailing ahead.', emoji: '\u2600\uFE0F', tier: 'calm' };
  if (pct <= 20) return { label: 'Partly Cloudy', description: 'Mild activity — a few clouds on the horizon.', emoji: '\u26C5', tier: 'mild' };
  if (pct <= 35) return { label: 'Cloudy', description: 'Noticeable movement — expect some chop.', emoji: '\u2601\uFE0F', tier: 'moderate' };
  if (pct <= 50) return { label: 'Rainy', description: 'Unsettled conditions — turbulence detected.', emoji: '\uD83C\uDF27\uFE0F', tier: 'high' };
  return { label: 'Stormy', description: 'Extreme turbulence — hold on tight.', emoji: '\u26C8\uFE0F', tier: 'extreme' };
};

export const getHeatScore = (annualizedVol) => {
  const pct = annualizedVol * 100;

  if (pct <= 5)  return 1;
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
 * Returns the traffic-light color for a heat score.
 * 1-3 = emerald (calm), 4-6 = amber (moderate), 7-10 = rose (high risk)
 */
export const getHeatColor = (score) => {
  if (score <= 3) return '#34d399';  // emerald
  if (score <= 6) return '#fbbf24';  // amber
  return '#fb7185';                  // rose
};

/**
 * Returns a CSS class suffix based on the weather tier.
 */
export const getTierClass = (tier) => {
  if (tier === 'calm' || tier === 'mild') return 'calm';
  if (tier === 'moderate') return 'moderate';
  return 'high';
};
