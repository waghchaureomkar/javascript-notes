/**
 * useEffect Hook - Practical Examples
 *
 * This file contains working examples of useEffect hook
 * Demonstrates data fetching, subscriptions, timers, and cleanup
 */

import React, { useState, useEffect } from 'react';

// ============================================
// Example 1: Document Title Update
// ============================================

export function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Runs when count changes

  return (
    <div>
      <h2>Document Title</h2>
      <p>Count: {count}</p>
      <p>Check the browser tab title!</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ============================================
// Example 2: Data Fetching
// ============================================

export function DataFetcher() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchUsers();

    // Cleanup: Prevent setting state if component unmounts
    return () => {
      cancelled = true;
    };
  }, []); // Empty array = run once on mount

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// Example 3: Timer with Cleanup
// ============================================

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    // Cleanup: Clear interval when component unmounts or isRunning changes
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h2>Timer</h2>
      <h1>{seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ============================================
// Example 4: Window Resize Listener
// ============================================

export function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    // Cleanup: Remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array = add listener once

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
      <p>Resize the window to see updates!</p>
    </div>
  );
}

// ============================================
// Example 5: Search with Dependency
// ============================================

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Don't search if query is empty
    if (!query) {
      setResults([]);
      return;
    }

    let cancelled = false;

    async function searchUsers() {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        if (!cancelled) {
          const filtered = data.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filtered);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setLoading(false);
        }
      }
    }

    searchUsers();

    return () => {
      cancelled = true;
    };
  }, [query]); // Run effect when query changes

  return (
    <div>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Searching...</p>}

      {results.length > 0 && (
        <ul>
          {results.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      {query && !loading && results.length === 0 && (
        <p>No users found</p>
      )}
    </div>
  );
}

// ============================================
// Example 6: Multiple Effects (Separation of Concerns)
// ============================================

export function UserProfile({ userId = 1 }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect 1: Fetch user data
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  // Effect 2: Update document title
  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    }

    return () => {
      document.title = 'React App';
    };
  }, [user]);

  // Effect 3: Fetch user posts
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [userId]);

  // Effect 4: Log analytics
  useEffect(() => {
    console.log('User profile viewed:', userId);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <h3>Posts ({posts.length})</h3>
      <ul>
        {posts.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// Example 7: localStorage Sync
// ============================================

export function PersistentCounter() {
  const [count, setCount] = useState(() => {
    // Lazy initialization from localStorage
    const saved = localStorage.getItem('count');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    // Sync to localStorage whenever count changes
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <h2>Persistent Counter</h2>
      <p>Count: {count}</p>
      <p>Refresh the page - count persists!</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ============================================
// Example 8: Mouse Position Tracker
// ============================================

export function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h2>Mouse Position</h2>
      <p>X: {position.x}</p>
      <p>Y: {position.y}</p>
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

// ============================================
// Example 9: Online/Offline Status
// ============================================

export function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: isOnline ? '#4CAF50' : '#f44336',
      color: 'white',
      borderRadius: '5px'
    }}>
      <h2>Network Status</h2>
      <p>{isOnline ? '✅ Online' : '❌ Offline'}</p>
      <p>Try disabling your network to test</p>
    </div>
  );
}

// ============================================
// Example 10: Async Effect with Race Condition Prevention
// ============================================

export function UserDetails({ userId = 1 }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        // Simulate slow API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const data = await response.json();

        // Only update state if not cancelled
        // Prevents race condition when userId changes rapidly
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setLoading(false);
        }
      }
    }

    fetchUser();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <div>Loading user {userId}...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
}

// ============================================
// Example 11: Dependency Array Comparison
// ============================================

export function DependencyDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // No dependency array - runs after EVERY render
  useEffect(() => {
    console.log('1. No deps - runs every render');
  });

  // Empty array - runs ONCE (componentDidMount)
  useEffect(() => {
    console.log('2. Empty deps [] - runs once on mount');
  }, []);

  // With dependencies - runs when dependencies change
  useEffect(() => {
    console.log('3. With deps [count] - runs when count changes');
  }, [count]);

  useEffect(() => {
    console.log('4. With deps [text] - runs when text changes');
  }, [text]);

  useEffect(() => {
    console.log('5. With deps [count, text] - runs when either changes');
  }, [count, text]);

  return (
    <div>
      <h2>Dependency Array Demo</h2>
      <p>Open console to see when effects run</p>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
      </div>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>
    </div>
  );
}

// ============================================
// Example 12: Polling Data
// ============================================

export function LiveData() {
  const [data, setData] = useState(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();
      setData({ ...result, fetchedAt: new Date().toLocaleTimeString() });
    }

    // Initial fetch
    fetchData();

    // Poll every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <div>
      <h2>Live Data (Polling)</h2>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Enable polling
      </label>

      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
          <small>Last updated: {data.fetchedAt}</small>
        </div>
      )}
    </div>
  );
}

// ============================================
// Main App
// ============================================

export default function App() {
  const [currentExample, setCurrentExample] = useState('title');

  const examples = {
    title: <DocumentTitle />,
    fetch: <DataFetcher />,
    timer: <Timer />,
    resize: <WindowSize />,
    search: <SearchResults />,
    profile: <UserProfile />,
    persist: <PersistentCounter />,
    mouse: <MouseTracker />,
    online: <OnlineStatus />,
    details: <UserDetails />,
    deps: <DependencyDemo />,
    polling: <LiveData />
  };

  return (
    <div className="app">
      <h1>useEffect Examples</h1>

      <nav style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <button onClick={() => setCurrentExample('title')}>Title</button>
        <button onClick={() => setCurrentExample('fetch')}>Fetch</button>
        <button onClick={() => setCurrentExample('timer')}>Timer</button>
        <button onClick={() => setCurrentExample('resize')}>Resize</button>
        <button onClick={() => setCurrentExample('search')}>Search</button>
        <button onClick={() => setCurrentExample('profile')}>Profile</button>
        <button onClick={() => setCurrentExample('persist')}>Persist</button>
        <button onClick={() => setCurrentExample('mouse')}>Mouse</button>
        <button onClick={() => setCurrentExample('online')}>Online</button>
        <button onClick={() => setCurrentExample('details')}>Details</button>
        <button onClick={() => setCurrentExample('deps')}>Deps</button>
        <button onClick={() => setCurrentExample('polling')}>Polling</button>
      </nav>

      <div className="example-container">
        {examples[currentExample]}
      </div>
    </div>
  );
}
