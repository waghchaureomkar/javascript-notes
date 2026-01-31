/**
 * Custom Hooks - Practical Examples
 *
 * Most Asked Custom Hooks in Interviews
 * These are production-ready and commonly used patterns
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// 1. useLocalStorage - Persist state in localStorage
// ============================================

export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or use initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Usage Example
export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('name', '');
  const [age, setAge] = useLocalStorage('age', 0);

  return (
    <div>
      <h2>useLocalStorage Demo</h2>
      <p>Refresh the page - data persists!</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />

      <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}

// ============================================
// 2. useFetch - Data fetching with loading and error states
// ============================================

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage Example
export function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>useFetch Demo</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 3. useDebounce - Debounce any value
// ============================================

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage Example
export function DebounceDemo() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (debouncedText) {
      // Simulate API call
      fetch(`https://jsonplaceholder.typicode.com/users?q=${debouncedText}`)
        .then(res => res.json())
        .then(data => setSearchResults(data));
    } else {
      setSearchResults([]);
    }
  }, [debouncedText]);

  return (
    <div>
      <h2>useDebounce Demo</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search users..."
      />
      <p>Immediate: {text}</p>
      <p>Debounced (500ms): {debouncedText}</p>
      <p>API calls only after you stop typing!</p>
    </div>
  );
}

// ============================================
// 4. useToggle - Toggle boolean state
// ============================================

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle, setValue];
}

// Usage Example
export function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);
  const [isVisible, toggleVisible] = useToggle(true);

  return (
    <div>
      <h2>useToggle Demo</h2>

      <div>
        <button onClick={toggle}>
          Light is {isOn ? 'ON' : 'OFF'}
        </button>
      </div>

      <div>
        <button onClick={toggleVisible}>
          {isVisible ? 'Hide' : 'Show'} Content
        </button>
        {isVisible && <p>This content can be toggled</p>}
      </div>
    </div>
  );
}

// ============================================
// 5. usePrevious - Get previous value
// ============================================

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage Example
export function PreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <h2>usePrevious Demo</h2>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ============================================
// 6. useOnClickOutside - Detect clicks outside element
// ============================================

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage Example
export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <div>
      <h2>useOnClickOutside Demo</h2>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px'
            }}
          >
            <h3>Modal</h3>
            <p>Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// 7. useWindowSize - Track window dimensions
// ============================================

export function useWindowSize() {
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage Example
export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h2>useWindowSize Demo</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <p>Resize window to see updates!</p>
    </div>
  );
}

// ============================================
// 8. useInterval - Declarative setInterval
// ============================================

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

// Usage Example
export function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? delay : null);

  return (
    <div>
      <h2>useInterval Demo</h2>
      <h1>{count}</h1>

      <div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <div>
        <label>
          Delay: {delay}ms
          <input
            type="range"
            min="100"
            max="2000"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

// ============================================
// 9. useMediaQuery - Responsive design helper
// ============================================

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

// Usage Example
export function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      <h2>useMediaQuery Demo</h2>
      <p>Resize window to see changes</p>
      <p>Mobile: {isMobile ? '✅' : '❌'}</p>
      <p>Tablet: {isTablet ? '✅' : '❌'}</p>
      <p>Desktop: {isDesktop ? '✅' : '❌'}</p>
    </div>
  );
}

// ============================================
// 10. useAsync - Handle async operations
// ============================================

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Usage Example
export function AsyncDemo() {
  const fetchUsers = () =>
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json());

  const { execute, status, data, error } = useAsync(fetchUsers);

  return (
    <div>
      <h2>useAsync Demo</h2>
      <button onClick={execute} disabled={status === 'pending'}>
        {status === 'pending' ? 'Loading...' : 'Fetch Users'}
      </button>

      {status === 'pending' && <p>Loading...</p>}
      {status === 'error' && <p>Error: {error.message}</p>}
      {status === 'success' && data && (
        <ul>
          {data.slice(0, 5).map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ============================================
// 11. useThrottle - Throttle any value
// ============================================

export function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Usage Example
export function ThrottleDemo() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 500);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h2>useThrottle Demo</h2>
      <p>Scroll the page</p>
      <p>Immediate: {scrollY}</p>
      <p>Throttled (500ms): {throttledScrollY}</p>
    </div>
  );
}

// ============================================
// 12. useForm - Form handling made easy
// ============================================

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setErrors
  };
}

// Usage Example
export function FormDemo() {
  const { values, handleChange, handleSubmit, reset } = useForm({
    name: '',
    email: '',
    message: ''
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h2>useForm Demo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Message"
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={reset}>Reset</button>
      </form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}

// ============================================
// 13. useIntersectionObserver - Lazy loading, infinite scroll
// ============================================

export function useIntersectionObserver(options = {}) {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, options]);

  return [setElement, isIntersecting];
}

// Usage Example
export function IntersectionDemo() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5
  });

  return (
    <div>
      <h2>useIntersectionObserver Demo</h2>
      <p>Scroll down to see the box</p>
      <div style={{ height: '150vh' }} />
      <div
        ref={ref}
        style={{
          padding: '40px',
          backgroundColor: isVisible ? '#4CAF50' : '#f44336',
          color: 'white',
          textAlign: 'center',
          transition: 'background-color 0.3s'
        }}
      >
        {isVisible ? '✅ I am visible!' : '❌ I am not visible'}
      </div>
      <div style={{ height: '50vh' }} />
    </div>
  );
}

// ============================================
// Main App
// ============================================

export default function App() {
  const [currentHook, setCurrentHook] = useState('localStorage');

  const hooks = {
    localStorage: <LocalStorageDemo />,
    fetch: <FetchDemo />,
    debounce: <DebounceDemo />,
    toggle: <ToggleDemo />,
    previous: <PreviousDemo />,
    clickOutside: <ClickOutsideDemo />,
    windowSize: <WindowSizeDemo />,
    interval: <IntervalDemo />,
    mediaQuery: <MediaQueryDemo />,
    async: <AsyncDemo />,
    throttle: <ThrottleDemo />,
    form: <FormDemo />,
    intersection: <IntersectionDemo />
  };

  return (
    <div className="app">
      <h1>Custom Hooks Examples</h1>

      <nav style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <button onClick={() => setCurrentHook('localStorage')}>localStorage</button>
        <button onClick={() => setCurrentHook('fetch')}>Fetch</button>
        <button onClick={() => setCurrentHook('debounce')}>Debounce</button>
        <button onClick={() => setCurrentHook('toggle')}>Toggle</button>
        <button onClick={() => setCurrentHook('previous')}>Previous</button>
        <button onClick={() => setCurrentHook('clickOutside')}>ClickOutside</button>
        <button onClick={() => setCurrentHook('windowSize')}>WindowSize</button>
        <button onClick={() => setCurrentHook('interval')}>Interval</button>
        <button onClick={() => setCurrentHook('mediaQuery')}>MediaQuery</button>
        <button onClick={() => setCurrentHook('async')}>Async</button>
        <button onClick={() => setCurrentHook('throttle')}>Throttle</button>
        <button onClick={() => setCurrentHook('form')}>Form</button>
        <button onClick={() => setCurrentHook('intersection')}>Intersection</button>
      </nav>

      <div className="example-container">
        {hooks[currentHook]}
      </div>
    </div>
  );
}
