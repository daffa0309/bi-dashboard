import React, { useState, useEffect, useRef } from 'react';
import TableauEmbed from './components/TableauEmbed';
import './App.css';

function App() {
  const [dashboards, setDashboards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const dashboardRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('dashboards');
    if (stored) setDashboards(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboards', JSON.stringify(dashboards));
    if (currentIndex >= dashboards.length) setCurrentIndex(0);
  }, [dashboards, currentIndex]);

  const addDashboard = (e) => {
    e.preventDefault();
    if (!name || !url) return alert('Please enter name and URL');
    setDashboards([...dashboards, { name, url }]);
    setCurrentIndex(dashboards.length);
    setName('');
    setUrl('');
  };

  const removeDashboard = (index) => {
    const newDashboards = dashboards.filter((_, idx) => idx !== index);
    setDashboards(newDashboards);
    if (currentIndex === index) setCurrentIndex(0);
  };

  const enterFullscreen = () => {
    if (dashboardRef.current) {
      if (dashboardRef.current.requestFullscreen) {
        dashboardRef.current.requestFullscreen();
      } else if (dashboardRef.current.webkitRequestFullscreen) {
        dashboardRef.current.webkitRequestFullscreen();
      } else if (dashboardRef.current.msRequestFullscreen) {
        dashboardRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <form onSubmit={addDashboard} className="form">
          <input
            type="text"
            placeholder="Dashboard Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <input
            type="url"
            placeholder="Tableau Public URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Add</button>
        </form>

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
      </div>

      <div className="dashboard-view" ref={dashboardRef}>
        {dashboards.length > 0 ? (
          <>
            <button className="fullscreen-btn" onClick={enterFullscreen}>
              Fullscreen
            </button>
            <TableauEmbed url={dashboards[currentIndex].url} />
          </>
        ) : (
          <div style={{ padding: '24px', fontSize: '18px', color: '#666' }}>
            No dashboards added yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;