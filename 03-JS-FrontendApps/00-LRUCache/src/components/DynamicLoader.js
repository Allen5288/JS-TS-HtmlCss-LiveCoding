import React, { useState, useCallback, useMemo, useRef } from "react";
import useLRUCache from "../hooks/useLRUCache";

/**
 * DynamicLoader demonstrates a practical use case for LRU Cache
 * It simulates loading tab content from a "server" while caching recently accessed tabs
 */
function DynamicLoader() {
  // Tab and loading state
  const [activeTab, setActiveTab] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentSource, setContentSource] = useState(null); // 'cache' or 'server'

  // Cache analytics
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);
  const [evictedItems, setEvictedItems] = useState([]);

  // Initialize LRU Cache with capacity of 3
  const { get, put, entries } = useLRUCache(3);

  // Use ref to track cache keys before update
  const cacheKeysRef = useRef([]);

  // List of available tabs for cleaner rendering
  const tabs = useMemo(() => [1, 2, 3, 4, 5], []);

  /**
   * Simulate fetching content from a server with delay
   */
  const fetchTabContent = useCallback(async (id) => {
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return simulated server response
      return {
        id,
        text: `Tab ${id} content loaded from server`,
        timestamp: new Date().toLocaleTimeString(),
      };
    } catch (error) {
      console.error("Error fetching tab content:", error);
      return {
        id,
        text: `Error loading Tab ${id}`,
        timestamp: new Date().toLocaleTimeString(),
        error: true,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle tab click - fetch from cache or server
   */
  const handleTabClick = useCallback(
    async (id) => {
      setActiveTab(id);

      // Convert id to string for cache key
      const cacheKey = id.toString();

      // Try to get content from cache first
      const cachedContent = get(cacheKey);

      if (cachedContent !== -1) {
        // Cache hit - content found in cache
        setCacheHits((prev) => prev + 1);
        setActiveContent(cachedContent);
        setContentSource("cache");
        console.log(`Cache hit for Tab ${id}`);
      } else {
        // Cache miss - need to fetch from "server"
        setCacheMisses((prev) => prev + 1);
        console.log(`Cache miss for Tab ${id}, fetching from server...`);

        // Get a snapshot of current cache state before adding new content
        cacheKeysRef.current = [];
        if (entries) {
          entries.forEach((entry) => {
            cacheKeysRef.current.push(parseInt(entry.key));
          });
        }

        // Fetch the content from server
        const content = await fetchTabContent(id);
        setActiveContent(content);
        setContentSource("server");

        // Store in cache
        put(cacheKey, content);

        // Check for evicted items using setTimeout to avoid dependency on entries
        if (cacheKeysRef.current.length === 3) {
          // Use setTimeout to ensure we access the updated entries
          setTimeout(() => {
            // Get current keys after the update
            const currentCacheKeys = [];
            if (entries) {
              entries.forEach((entry) => {
                currentCacheKeys.push(parseInt(entry.key));
              });
            }

            // Find which item was evicted
            for (const key of cacheKeysRef.current) {
              setEvictedItems((prev) => [
                { id: key, timestamp: new Date().toLocaleTimeString() },
                ...prev.slice(0, 4), // Keep only last 5 evicted items
              ]);
              break;
            }
          }, 0);
        }
      }
    },
    [get, put, fetchTabContent]
  ); // Remove entries dependency

  return (
    <div className="dynamic-loader">
      <h2>Tab Content with LRU Cache</h2>
      <p className="description">
        This demonstrates a real-world use case of LRU Cache. The last 3
        accessed tabs are cached. When you click on more than 3 different tabs,
        older ones get evicted.
      </p>

      {/* Tab buttons */}
      <div className="tabs">
        {tabs.map((tabId) => (
          <button
            key={tabId}
            onClick={() => handleTabClick(tabId)}
            className={activeTab === tabId ? "active" : ""}
          >
            Tab {tabId}
          </button>
        ))}
      </div>

      {/* Content area */}
      {loading ? (
        <div className="loading">Loading content...</div>
      ) : (
        activeTab &&
        activeContent && (
          <div className="tab-content">
            <h3>Tab {activeTab} Content</h3>
            <div className="content-box">
              <p>{activeContent.text}</p>
              <p className="timestamp">Loaded at: {activeContent.timestamp}</p>
              <p className="source">
                {contentSource === "cache"
                  ? "Retrieved from cache"
                  : "Freshly loaded from server"}
              </p>
            </div>
          </div>
        )
      )}

      {/* Cache statistics */}
      <div className="cache-stats">
        <h3>Cache Statistics</h3>
        <p>
          Cache Hits: {cacheHits} | Cache Misses: {cacheMisses}
        </p>
      </div>

      {/* Evicted items */}
      {evictedItems.length > 0 && (
        <div className="evicted-items">
          <h3>Recently Evicted Items</h3>
          <ul>
            {evictedItems.map((item, index) => (
              <li key={index}>
                Tab {item.id} evicted at {item.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Current cache state */}
      <div className="cache-view">
        <h3>Current Cache State (Most Recently Used First)</h3>
        <div className="cache-items">
          {entries && entries.length > 0 ? (
            <ul>
              {entries.map((entry, index) => (
                <li
                  key={index}
                  className={`${
                    activeTab === parseInt(entry.key) ? "active-item" : ""
                  } ${entry.isMostRecent ? "most-recent" : ""} ${
                    entry.isLeastRecent ? "least-recent" : ""
                  }`}
                >
                  <strong>Tab {entry.key}</strong>: {entry.value.text}
                  <span className="timestamp">{entry.value.timestamp}</span>
                  <span className="position-info">
                    {entry.isMostRecent
                      ? "(Most Recently Used)"
                      : entry.isLeastRecent
                      ? "(Least Recently Used - will be evicted next)"
                      : `(Position: ${entry.position + 1})`}
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
  );
}

export default DynamicLoader;
