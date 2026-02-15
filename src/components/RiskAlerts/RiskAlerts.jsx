import React from 'react';
import { useRiskAlerts } from '../../hooks/useRiskAlerts';
import './RiskAlerts.css';

const SEVERITY_CLASSES = {
  high: 'risk-alert--high',
  medium: 'risk-alert--medium',
  low: 'risk-alert--low',
};

const RiskAlerts = ({ watchlist }) => {
  const { alerts, isLoading } = useRiskAlerts(watchlist);

  if (isLoading) return <div className="risk-alerts--loading">Checking alerts...</div>;
  if (!alerts.length) return <div className="risk-alerts--empty">No active alerts.</div>;

  return (
    <div className="risk-alerts">
      <h2 className="risk-alerts__title">Risk Alerts</h2>
      <ul className="risk-alerts__list">
        {alerts.map((alert) => (
          <li key={alert.id} className={`risk-alert ${SEVERITY_CLASSES[alert.severity]}`}>
            <div className="risk-alert__header">
              <span className="risk-alert__ticker">{alert.ticker}</span>
              <span className="risk-alert__severity">{alert.severity}</span>
            </div>
            <p className="risk-alert__message">{alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskAlerts;
