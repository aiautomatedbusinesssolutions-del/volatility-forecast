import React from 'react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="loader">
    <div className="loader__spinner" />
    <span className="loader__text">{text}</span>
  </div>
);

export default Loader;
