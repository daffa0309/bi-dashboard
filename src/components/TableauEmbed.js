import React, { useEffect, useRef } from 'react';

const TableauEmbed = ({ url }) => {
  const containerRef = useRef(null);
  const vizRef = useRef(null);

  useEffect(() => {
    // Hapus viz lama jika ada
    if (vizRef.current) {
      vizRef.current.dispose();
      vizRef.current = null;
    }

    // Load Tableau JS API jika belum ada
    const loadTableauScript = () => {
      return new Promise((resolve, reject) => {
        if (window.tableau && window.tableau.Viz) return resolve();
        const existingScript = document.getElementById('tableau-api');
        if (existingScript) {
          existingScript.onload = () => resolve();
          existingScript.onerror = () => reject('Failed to load Tableau API');
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://public.tableau.com/javascripts/api/tableau-2.8.0.min.js';
        script.id = 'tableau-api';
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load Tableau API');
        document.body.appendChild(script);
      });
    };

    loadTableauScript()
      .then(() => {
        if (!window.tableau || !window.tableau.Viz) {
          console.error('Tableau API not available');
          return;
        }

        // Pastikan URL embed
        let embedUrl = url;
        if (!embedUrl.includes(':embed=y')) {
          embedUrl += embedUrl.includes('?') ? '&:embed=y' : '?:embed=y';
        }

        vizRef.current = new window.tableau.Viz(containerRef.current, embedUrl, {
          hideTabs: true,
          width: '1600px',
          height: '1500px',
          onFirstInteractive: () => console.log('Dashboard loaded.')
        });
      })
      .catch((err) => console.error(err));

    return () => {
      if (vizRef.current) vizRef.current.dispose();
    };
  }, [url]);

  return <div ref={containerRef} style={{ width: '100%', height: '600px', border: '1px solid #ccc' }} />;
};

export default TableauEmbed;
