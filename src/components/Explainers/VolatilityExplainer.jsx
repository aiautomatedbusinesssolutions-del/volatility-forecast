import React, { useState } from 'react';
import { EXPLAINER_CONTENT } from '../../data/constants';
import './Explainers.css';

const VolatilityExplainer = () => {
  const [activeTopic, setActiveTopic] = useState(EXPLAINER_CONTENT[0]?.id);

  const currentTopic = EXPLAINER_CONTENT.find((t) => t.id === activeTopic);

  return (
    <div className="explainer">
      <h2 className="explainer__title">Understanding Volatility</h2>
      <nav className="explainer__tabs">
        {EXPLAINER_CONTENT.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopic(topic.id)}
            className={`explainer__tab ${activeTopic === topic.id ? 'explainer__tab--active' : ''}`}
          >
            {topic.title}
          </button>
        ))}
      </nav>
      {currentTopic && (
        <div className="explainer__content">
          <h3>{currentTopic.title}</h3>
          <p>{currentTopic.body}</p>
          {currentTopic.keyTakeaway && (
            <div className="explainer__takeaway">
              <strong>Key Takeaway:</strong> {currentTopic.keyTakeaway}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VolatilityExplainer;
