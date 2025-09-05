import React from 'react';

const DashboardTabs = ({ dashboards, currentIndex, setCurrentIndex, removeDashboard }) => {
  return (
    <div className="tabs">
      {dashboards.map((d, idx) => (
        <div key={idx} className={`tab ${idx === currentIndex ? 'active' : ''}`}>
          <span onClick={() => setCurrentIndex(idx)}>{d.name}</span>
          <button onClick={() => removeDashboard(idx)} className="remove-btn" aria-label={`Remove ${d.name}`}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardTabs;