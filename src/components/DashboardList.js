import React from 'react';

const DashboardList = ({ dashboards, removeDashboard }) => {
  return (
    <div>
      {dashboards.length === 0 && <p>No dashboards added yet.</p>}
      {dashboards.map((d, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h3>{d.name}</h3>
          <iframe
            src={d.url}
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            title={d.name}
            style={{ border: '1px solid #ccc' }}
          ></iframe>
          <button onClick={() => removeDashboard(index)} style={{ marginTop: '10px' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DashboardList;
