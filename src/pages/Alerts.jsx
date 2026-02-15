import React from 'react';
import RiskAlerts from '../components/RiskAlerts';

const Alerts = ({ watchlist = [] }) => (
  <div className="page alerts-page">
    <h1>Risk Alerts</h1>
    <p>Personalized alerts based on your watchlist volatility thresholds.</p>
    <RiskAlerts watchlist={watchlist} />
  </div>
);

export default Alerts;
