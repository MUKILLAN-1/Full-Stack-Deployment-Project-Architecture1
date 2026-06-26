import React from 'react';

const Loader = ({ message = "Loading Aura..." }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span className="spinner-text">{message}</span>
    </div>
  );
};

export default Loader;
