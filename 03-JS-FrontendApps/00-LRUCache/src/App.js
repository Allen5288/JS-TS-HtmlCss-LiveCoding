import React, { useState } from 'react';
import './App.css';
import useLRUCache from './hooks/useLRUCache';
import DynamicContentLoader from './components/DynamicContentLoader';

function App() {
  const { get, put, entries } = useLRUCache(5);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [getKey, setGetKey] = useState('');
  const [getResult, setGetResult] = useState(null);
  const [activeSection, setActiveSection] = useState('manual'); // 'manual' or 'tabs'

  const handlePut = () => {
    if (key.trim() === '') return;
    put(key, value);
    setKey('');
    setValue('');
  };

  const handleGet = () => {
    if (getKey.trim() === '') return;
    const result = get(getKey);
    setGetResult(result);
    setGetKey('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LRU Cache Implementation</h1>
        <p className="app-description">
          A demonstration of Least Recently Used (LRU) Cache in React
        </p>
        
        <div className="section-tabs">
          <button 
            className={activeSection === 'manual' ? 'active' : ''} 
            onClick={() => setActiveSection('manual')}
          >
            Manual Cache Demo
          </button>
          <button 
            className={activeSection === 'tabs' ? 'active' : ''} 
            onClick={() => setActiveSection('tabs')}
          >
            Tab Browser Demo
          </button>
        </div>

        {activeSection === 'manual' ? (
          <div className="container">
            <div className="section-explanation">
              <h3>Manual Cache Operations</h3>
              <p>This section allows you to manually interact with an LRU Cache. Try adding items, then getting them by key.</p>
              <p>When the cache reaches capacity (5 items), the least recently used items will be evicted.</p>
            </div>
            
            <div className="cache-operations">
              <div className="operation-section">
                <h2>Put Operation</h2>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button onClick={handlePut}>Put</button>
                </div>
              </div>

              <div className="operation-section">
                <h2>Get Operation</h2>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Key"
                    value={getKey}
                    onChange={(e) => setGetKey(e.target.value)}
                  />
                  <button onClick={handleGet}>Get</button>
                </div>
                <div className="result">
                  {getResult !== null && (
                    <p>
                      Result: {getResult === -1 ? 'Not Found' : getResult}
                    </p>
                  )}
                </div>
              </div>
            </div>            <div className="cache-state">
              <h2>Cache State (Most Recently Used First)</h2>
              <div className="cache-entries">
                {entries && entries.length > 0 ? (                  <ul>
                    {entries.map((entry, index) => (
                      <li key={index} className={`${entry.isMostRecent ? 'most-recent' : ''} ${entry.isLeastRecent ? 'least-recent' : ''}`}>
                        <strong>{entry.key}:</strong> {entry.value}
                        <span className="position-info">
                          {entry.isMostRecent ? "(Most Recently Used)" : 
                          entry.isLeastRecent ? "(Least Recently Used - will be evicted next)" : 
                          `(Position: ${entry.position + 1})`}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Cache is empty</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="dynamic-content-container">
            <DynamicContentLoader />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;