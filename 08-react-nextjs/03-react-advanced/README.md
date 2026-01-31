# React Advanced Concepts 🚀

> **Level Up Your React Skills**
> Master advanced patterns and techniques used in production

**Interview Probability:** ⭐⭐⭐⭐

---

## 📚 Table of Contents

1. [Context API](#context-api)
2. [Higher-Order Components (HOC)](#higher-order-components-hoc)
3. [Render Props](#render-props)
4. [Portals](#portals)
5. [Refs & DOM](#refs--dom)
6. [Error Boundaries](#error-boundaries)
7. [Code Splitting](#code-splitting)
8. [React Patterns](#react-patterns)
9. [Interview Questions](#interview-questions)

---

## Context API

**Purpose:** Share data across component tree without prop drilling.

### Creating Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext(undefined);

// 2. Create Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook for consuming context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Usage
function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Content />
    </ThemeProvider>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}
```

### Multiple Contexts

```jsx
const ThemeContext = createContext();
const AuthContext = createContext();
const LanguageContext = createContext();

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function Component() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();

  return <div>Access to all contexts!</div>;
}
```

### Context with Reducer

```jsx
const StateContext = createContext();
const DispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useCountState() {
  return useContext(StateContext);
}

function useCountDispatch() {
  return useContext(DispatchContext);
}

// Usage
function Counter() {
  const { count } = useCountState();
  const dispatch = useCountDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  );
}
```

### Context Performance Optimization

```jsx
// Problem: All consumers re-render when context value changes
function BadProvider({ children }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John' });

  // New object every render!
  const value = { count, setCount, user, setUser };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

// Solution: Memoize the value
function GoodProvider({ children }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John' });

  const value = useMemo(() => ({
    count,
    setCount,
    user,
    setUser
  }), [count, user]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

// Better: Split contexts
const CountContext = createContext();
const UserContext = createContext();

function SplitProvider({ children }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John' });

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </CountContext.Provider>
  );
}
```

---

## Higher-Order Components (HOC)

**Definition:** A function that takes a component and returns a new component.

### Basic HOC

```jsx
// HOC that adds loading spinner
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return <UserListWithLoading users={users} isLoading={loading} />;
}
```

### HOC with Props

```jsx
// HOC that adds authentication check
function withAuth(Component) {
  return function WithAuthComponent(props) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} user={user} />;
  };
}

// Usage
function Dashboard({ user }) {
  return <h1>Welcome, {user.name}!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);
```

### Composing HOCs

```jsx
function withLoading(Component) {
  return function({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}

function withError(Component) {
  return function({ error, ...props }) {
    if (error) return <div>Error: {error}</div>;
    return <Component {...props} />;
  };
}

function withAuth(Component) {
  return function(props) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <Component {...props} user={user} />;
  };
}

// Compose multiple HOCs
const enhance = compose(
  withAuth,
  withLoading,
  withError
);

const EnhancedComponent = enhance(MyComponent);

// Or manually
const EnhancedComponent = withAuth(withLoading(withError(MyComponent)));
```

### HOC Best Practices

```jsx
// ✅ Good: Pass through props
function withData(Component) {
  return function WithDataComponent(props) {
    const data = useFetch('/api/data');
    return <Component {...props} data={data} />;
  };
}

// ✅ Good: Use displayName for debugging
function withData(Component) {
  const WithDataComponent = (props) => {
    const data = useFetch('/api/data');
    return <Component {...props} data={data} />;
  };

  WithDataComponent.displayName = `withData(${Component.displayName || Component.name})`;

  return WithDataComponent;
}

// ❌ Bad: Mutate original component
function withData(Component) {
  Component.prototype.componentWillMount = function() {
    // Don't do this!
  };
  return Component;
}
```

---

## Render Props

**Definition:** A technique for sharing code using a prop whose value is a function.

### Basic Render Props

```jsx
// Component with render prop
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return render(position);
}

// Usage
function App() {
  return (
    <Mouse
      render={({ x, y }) => (
        <h1>Mouse position: ({x}, {y})</h1>
      )}
    />
  );
}
```

### Children as Function

```jsx
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return children(position);
}

// Usage
function App() {
  return (
    <Mouse>
      {({ x, y }) => (
        <h1>Mouse position: ({x}, {y})</h1>
      )}
    </Mouse>
  );
}
```

### Practical Example: Data Fetcher

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();

        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return children({ data, loading, error });
}

// Usage
function App() {
  return (
    <DataFetcher url="https://api.example.com/users">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return (
          <ul>
            {data.map(user => <li key={user.id}>{user.name}</li>)}
          </ul>
        );
      }}
    </DataFetcher>
  );
}
```

### HOC vs Render Props vs Hooks

```jsx
// HOC
const EnhancedComponent = withData(MyComponent);

// Render Props
<DataFetcher>
  {data => <MyComponent data={data} />}
</DataFetcher>

// Hooks (Modern approach - Preferred)
function MyComponent() {
  const data = useData();
  return <div>{data}</div>;
}
```

---

## Portals

**Purpose:** Render children into a DOM node outside the parent component hierarchy.

### Basic Portal

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </Modal>
    </div>
  );
}
```

### Portal with Custom Container

```jsx
function Tooltip({ children, content, position }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setShow(true);
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      {show && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y - 30,
            transform: 'translateX(-50%)'
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}

// Usage
<Tooltip content="This is a tooltip">
  Hover me
</Tooltip>
```

### Portal Use Cases

1. **Modals/Dialogs**
2. **Tooltips**
3. **Dropdown menus**
4. **Notifications/Toasts**
5. **Full-screen overlays**

---

## Refs & DOM

### useRef for DOM Access

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const getInputValue = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
      <button onClick={getInputValue}>Get Value</button>
    </div>
  );
}
```

### forwardRef

```jsx
const FancyInput = forwardRef((props, ref) => {
  return (
    <div className="fancy-input">
      <input ref={ref} {...props} />
    </div>
  );
});

// Usage
function Parent() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <FancyInput ref={inputRef} placeholder="Enter text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

### useImperativeHandle

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => {
      return inputRef.current.value;
    },
    setValue: (value) => {
      inputRef.current.value = value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function Parent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
    console.log(inputRef.current.getValue());
    inputRef.current.setValue('New value');
    inputRef.current.clear();
  };

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Interact</button>
    </>
  );
}
```

---

## Error Boundaries

**Purpose:** Catch JavaScript errors anywhere in child component tree and display fallback UI.

### Basic Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Error Boundary with Retry

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.resetError}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Multiple Error Boundaries

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <Header />

      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentError />}>
        <Content />
      </ErrorBoundary>

      <Footer />
    </ErrorBoundary>
  );
}
```

### Error Boundary Limitations

Error boundaries do **NOT** catch errors in:
- Event handlers (use try/catch)
- Asynchronous code (setTimeout, promises)
- Server-side rendering
- Errors in error boundary itself

```jsx
// Won't be caught by error boundary
function Component() {
  const handleClick = () => {
    throw new Error('Error in event handler');
  };

  return <button onClick={handleClick}>Click</button>;
}

// Solution: Use try/catch
function Component() {
  const handleClick = () => {
    try {
      throw new Error('Error in event handler');
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## Code Splitting

### React.lazy

```jsx
// Before
import HeavyComponent from './HeavyComponent';

// After
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Route-Based Code Splitting

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Named Exports

```jsx
// Component.js
export function MyComponent() {
  return <div>Component</div>;
}

// App.js
const MyComponent = lazy(() =>
  import('./Component').then(module => ({
    default: module.MyComponent
  }))
);
```

---

## React Patterns

### Compound Components

```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        });
      })}
    </div>
  );
}

function Tab({ label, isActive, onClick, children }) {
  return (
    <div>
      <button
        className={isActive ? 'active' : ''}
        onClick={onClick}
      >
        {label}
      </button>
      {isActive && <div>{children}</div>}
    </div>
  );
}

// Usage
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
  <Tab label="Tab 3">Content 3</Tab>
</Tabs>
```

### Provider Pattern

```jsx
const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const addData = (item) => setData([...data, item]);
  const removeData = (id) => setData(data.filter(item => item.id !== id));

  return (
    <DataContext.Provider value={{ data, addData, removeData }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
```

### Container/Presentational Pattern

```jsx
// Container (Logic)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return <UserListPresentation users={users} loading={loading} />;
}

// Presentational (UI)
function UserListPresentation({ users, loading }) {
  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Interview Questions

### Q1: What is Context API and when to use it?

**Answer:**
Context provides a way to pass data through component tree without passing props manually at every level.

**Use when:**
- Theme data (light/dark mode)
- User authentication
- Language/locale
- Global UI state

**Don't use for:**
- Frequently changing data (causes re-renders)
- Complex state management (use Redux)

---

### Q2: HOC vs Render Props vs Hooks?

**Answer:**

| Pattern | Pros | Cons |
|---------|------|------|
| **HOC** | Composition, Reusable | Props collision, Wrapper hell |
| **Render Props** | Flexible, Dynamic | Callback hell, Less readable |
| **Hooks** | Simple, Composable | **Best approach (use this)** |

**Modern approach: Use Hooks**

---

### Q3: What are Portals and use cases?

**Answer:**
Portals render children into DOM node outside parent hierarchy.

```jsx
ReactDOM.createPortal(child, container)
```

**Use cases:**
- Modals
- Tooltips
- Dropdown menus
- Notifications

**Benefits:**
- Avoid z-index issues
- Break out of overflow: hidden
- Better positioning

---

### Q4: What are Error Boundaries?

**Answer:**
Error boundaries catch JavaScript errors in child component tree.

**What they catch:**
- Rendering errors
- Lifecycle method errors
- Constructor errors

**What they DON'T catch:**
- Event handlers (use try/catch)
- Async code
- SSR errors

---

### Q5: Explain Code Splitting in React

**Answer:**
Code splitting breaks bundle into smaller chunks loaded on-demand.

```jsx
const Component = React.lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

**Benefits:**
- Smaller initial bundle
- Faster page load
- Better performance

---

## 🎯 Quick Reference

```jsx
// Context
const Context = createContext();
<Context.Provider value={data}>
  {children}
</Context.Provider>

// HOC
const Enhanced = withFeature(Component);

// Render Props
<Mouse render={mouse => <Cat mouse={mouse} />} />

// Portal
{createPortal(<Modal />, document.body)}

// Ref
const ref = useRef();
<input ref={ref} />

// forwardRef
const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

// Error Boundary
<ErrorBoundary>
  <Component />
</ErrorBoundary>

// Code Splitting
const Component = lazy(() => import('./Component'));
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

---

**Next:** [React Performance](../04-react-performance/README.md)
**Previous:** [React Hooks](../02-react-hooks/README.md)

---

**Happy Learning! 🚀**
