import React from 'react';
import { useMarketSentiment } from '../../hooks/useMarketSentiment';
import './MarketPulse.css';

const SENTIMENT_LABELS = {
  extreme_fear: { label: 'Extreme Fear', color: '#dc2626' },
  fear: { label: 'Fear', color: '#f97316' },
  neutral: { label: 'Neutral', color: '#eab308' },
  greed: { label: 'Greed', color: '#22c55e' },
  extreme_greed: { label: 'Extreme Greed', color: '#15803d' },
};

const MarketPulse = () => {
  const { sentiment, vixLevel, isLoading, error } = useMarketSentiment();

  if (isLoading) return <div className="market-pulse market-pulse--loading">Loading market data...</div>;
  if (error) return <div className="market-pulse market-pulse--error">Unable to load market sentiment.</div>;

  const sentimentInfo = SENTIMENT_LABELS[sentiment?.category] || SENTIMENT_LABELS.neutral;

  return (
    <div className="market-pulse">
      <h2 className="market-pulse__title">Market Pulse</h2>
      <div className="market-pulse__gauge">
        <div
          className="market-pulse__indicator"
          style={{ '--sentiment-color': sentimentInfo.color }}
        >
          <span className="market-pulse__score">{sentiment?.score ?? '--'}</span>
          <span className="market-pulse__label">{sentimentInfo.label}</span>
        </div>
      </div>
      <div className="market-pulse__vix">
        <span className="market-pulse__vix-label">VIX Level</span>
        <span className="market-pulse__vix-value">{vixLevel ?? '--'}</span>
      </div>
    </div>
  );
};

export default MarketPulse;
