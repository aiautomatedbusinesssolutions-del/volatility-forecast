import React, { useState } from 'react';
import TickerSearch from '../components/TickerSearch';
import MarketPulse from '../components/MarketPulse';
import RiskAlerts from '../components/RiskAlerts';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);

  const handleTickerSelect = (ticker) => {
    setWatchlist((prev) => {
      if (prev.includes(ticker.symbol)) return prev;
      return [...prev, ticker.symbol];
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Volatility Forecast</h1>
        <TickerSearch onSelect={handleTickerSelect} />
      </header>
      <div className="dashboard__grid">
        <div className="dashboard__main">
          <MarketPulse />
          <RiskAlerts watchlist={watchlist} />
        </div>
        <aside className="dashboard__sidebar">
          <div className="watchlist">
            <h3>Watchlist</h3>
            {watchlist.length === 0 ? (
              <p className="watchlist__empty">Search and add tickers to track.</p>
            ) : (
              <ul className="watchlist__list">
                {watchlist.map((symbol) => (
                  <li key={symbol} className="watchlist__item">
                    <span>{symbol}</span>
                    <button
                      onClick={() => setWatchlist((prev) => prev.filter((s) => s !== symbol))}
                      className="watchlist__remove"
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
  );
};

export default Dashboard;
