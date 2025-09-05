import React, { useState } from 'react';

const DashboardForm = ({ addDashboard }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !url) return alert('Please enter name and URL');
    addDashboard({ name, url });
    setName('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Dashboard Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="url"
        placeholder="Tableau URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Add Dashboard</button>
    </form>
  );
};

export default DashboardForm;
