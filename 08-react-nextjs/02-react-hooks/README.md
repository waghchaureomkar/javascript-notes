# React Hooks - Complete Guide 🪝

> **Most Important Topic for React Interviews**
> Master all hooks from basics to advanced patterns

**Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)

---

## 📚 Table of Contents

1. [What are Hooks?](#what-are-hooks)
2. [Basic Hooks](#basic-hooks)
   - [useState](#usestate)
   - [useEffect](#useeffect)
   - [useContext](#usecontext)
3. [Additional Hooks](#additional-hooks)
   - [useReducer](#usereducer)
   - [useCallback](#usecallback)
   - [useMemo](#usememo)
   - [useRef](#useref)
   - [useImperativeHandle](#useimperativehandle)
   - [useLayoutEffect](#uselayouteffect)
   - [useDebugValue](#usedebugvalue)
4. [React 18+ Hooks](#react-18-hooks)
   - [useId](#useid)
   - [useTransition](#usetransition)
   - [useDeferredValue](#usedeferredvalue)
   - [useSyncExternalStore](#usesyncexternalstore)
   - [useInsertionEffect](#useinsertioneffect)
5. [Custom Hooks](#custom-hooks)
6. [Rules of Hooks](#rules-of-hooks)
7. [Common Patterns](#common-patterns)
8. [Interview Questions](#interview-questions)

---

## What are Hooks?

**Hooks** are functions that let you "hook into" React state and lifecycle features from function components.

### Why Hooks?

**Before Hooks (Class Components):**
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

**After Hooks (Function Components):**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Benefits of Hooks

✅ No more confusing `this` keyword
✅ Reuse stateful logic without HOCs or Render Props
✅ Split code by concern, not lifecycle methods
✅ Easier to test and reason about
✅ Better code organization

---

## Basic Hooks

### useState

**Purpose:** Add state to functional components

#### Basic Syntax

```jsx
const [state, setState] = useState(initialValue);
```

#### Examples

**1. Simple Counter**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**2. State with Object**
```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (name) => {
    setUser(prevUser => ({
      ...prevUser,
      name
    }));
  };

  return (
    <input
      value={user.name}
      onChange={(e) => updateName(e.target.value)}
    />
  );
}
```

**3. State with Array**
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**4. Lazy Initialization (Performance Optimization)**
```jsx
function ExpensiveComponent() {
  // Bad: Runs on every render
  const [state, setState] = useState(computeExpensiveValue());

  // Good: Runs only once
  const [state, setState] = useState(() => computeExpensiveValue());

  return <div>{state}</div>;
}
```

**5. Functional Updates**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Bad: Might have stale closure
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // Still increments by 1!
  };

  // Good: Always uses latest state
  const increment = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Correctly increments by 2
  };

  return <button onClick={increment}>Count: {count}</button>;
}
```

---

### useEffect

**Purpose:** Perform side effects in function components (data fetching, subscriptions, DOM manipulation)

#### Basic Syntax

```jsx
useEffect(() => {
  // Side effect code

  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

#### Dependency Array Behavior

| Dependency Array | When Effect Runs |
|-----------------|------------------|
| `useEffect(() => {})` | After **every** render |
| `useEffect(() => {}, [])` | Only **once** after initial render (componentDidMount) |
| `useEffect(() => {}, [a, b])` | When **a** or **b** changes |

#### Examples

**1. Component Did Mount (Run Once)**
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // Empty array = run once

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

**2. Component Did Update (Run on Dependency Change)**
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [query]); // Run when query changes

  return (
    <ul>
      {results.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

**3. Component Will Unmount (Cleanup)**
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

**4. Event Listeners with Cleanup**
```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Window width: {width}px</div>;
}
```

**5. Multiple Effects (Separation of Concerns)**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Effect 1: Fetch user data
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  // Effect 2: Update document title
  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    }
  }, [user]);

  // Effect 3: Track analytics
  useEffect(() => {
    analytics.track('User Profile Viewed', { userId });
  }, [userId]);

  return user ? <div>{user.name}</div> : 'Loading...';
}
```

**6. Async/Await in useEffect**
```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Can't make useEffect callback async directly
    // Use IIFE instead
    (async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    })();

    // Or extract to separate function
    async function fetchData() {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
}
```

**7. Race Condition Prevention**
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchResults() {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();

      if (!cancelled) {
        setResults(data);
      }
    }

    fetchResults();

    return () => {
      cancelled = true; // Ignore results if component unmounts
    };
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

---

### useContext

**Purpose:** Share data across component tree without prop drilling

#### Basic Syntax

```jsx
const value = useContext(MyContext);
```

#### Examples

**1. Theme Context**
```jsx
// 1. Create Context
const ThemeContext = React.createContext('light');

// 2. Provider Component
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer Component (with useContext)
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333'
      }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}

// No need to pass props through intermediate components!
function Toolbar() {
  return (
    <div>
      <ThemedButton /> {/* No props needed */}
    </div>
  );
}
```

**2. Authentication Context**
```jsx
const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserProfile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**3. Multiple Contexts**
```jsx
function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={auth}>
        <LanguageContext.Provider value={language}>
          <MainApp />
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const language = useContext(LanguageContext);

  return <div>Access to all contexts!</div>;
}
```

---

## Additional Hooks

### useReducer

**Purpose:** Manage complex state logic (alternative to useState)

#### When to Use useReducer?

✅ State has complex structure (nested objects/arrays)
✅ Next state depends on previous state
✅ Multiple sub-values need to be updated together
✅ Want to separate state logic from component

#### Basic Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

#### Examples

**1. Counter with useReducer**
```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

**2. Todo List with useReducer**
```jsx
const initialState = {
  todos: [],
  filter: 'all'
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <input onKeyPress={(e) => {
        if (e.key === 'Enter') {
          addTodo(e.target.value);
          e.target.value = '';
        }
      }} />
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**3. Form with useReducer**
```jsx
const initialState = {
  name: '',
  email: '',
  password: '',
  errors: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const errors = {};
    if (!state.name) errors.name = 'Name is required';
    if (!state.email) errors.email = 'Email is required';

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    } else {
      // Submit form
      console.log('Form submitted', state);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={(e) => dispatch({
          type: 'SET_FIELD',
          field: 'name',
          value: e.target.value
        })}
      />
      {state.errors.name && <span>{state.errors.name}</span>}
    </form>
  );
}
```

---

### useCallback

**Purpose:** Memoize callback functions to prevent unnecessary re-renders

#### When to Use useCallback?

✅ Passing callback to optimized child component (React.memo)
✅ Callback is a dependency of useEffect
✅ Creating expensive functions

#### Basic Syntax

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

#### Examples

**1. Prevent Child Re-renders**
```jsx
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Without useCallback: New function on every render
  // const handleClick = () => {
  //   console.log('Clicked');
  // };

  // With useCallback: Same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = never changes

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {/* Child won't re-render when text changes */}
      <Child onClick={handleClick} />
    </div>
  );
}
```

**2. useCallback with Dependencies**
```jsx
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query);
    }
  }, [query, onSearch]); // Recreate when query or onSearch changes

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

**3. useCallback with useEffect**
```jsx
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const result = await response.json();
    setData(result);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Safe to include fetchData in deps

  return <div>{data && JSON.stringify(data)}</div>;
}
```

---

### useMemo

**Purpose:** Memoize expensive calculations to avoid re-computing on every render

#### When to Use useMemo?

✅ Expensive calculations
✅ Referential equality matters (object/array as dependency)
✅ Optimizing child component renders

#### Basic Syntax

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### Examples

**1. Expensive Calculation**
```jsx
function ExpensiveComponent({ numbers }) {
  // Without useMemo: Recalculates on every render
  // const sum = numbers.reduce((acc, n) => acc + n, 0);

  // With useMemo: Only recalculates when numbers change
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((acc, n) => acc + n, 0);
  }, [numbers]);

  return <div>Sum: {sum}</div>;
}
```

**2. Filtering Large Lists**
```jsx
function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**3. Referential Equality**
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useMemo: New object on every render
  // const config = { theme: 'dark', language: 'en' };

  // With useMemo: Same object reference
  const config = useMemo(() => ({
    theme: 'dark',
    language: 'en'
  }), []); // Never changes

  return <Child config={config} />;
}

const Child = React.memo(({ config }) => {
  useEffect(() => {
    console.log('Config changed');
  }, [config]); // Won't trigger unnecessarily with useMemo

  return <div>Theme: {config.theme}</div>;
});
```

**4. useMemo vs useCallback**
```jsx
// useCallback: Memoize function
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// useMemo: Memoize value
const value = useMemo(() => computeValue(), []);

// They're related:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

---

### useRef

**Purpose:**
1. Access DOM elements directly
2. Store mutable values that don't trigger re-renders
3. Persist values across renders

#### Basic Syntax

```jsx
const ref = useRef(initialValue);
```

#### Examples

**1. Access DOM Elements**
```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

**2. Store Previous Value**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**3. Store Mutable Value (No Re-render)**
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // Already running
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**4. Avoiding Stale Closures**
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  const latestMessageRef = useRef('');

  useEffect(() => {
    latestMessageRef.current = message;
  }, [message]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Always has latest message (no stale closure)
      console.log('Latest message:', latestMessageRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [roomId]); // Doesn't need message in deps

  return (
    <input value={message} onChange={(e) => setMessage(e.target.value)} />
  );
}
```

**5. useRef vs useState**
```jsx
function Comparison() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const incrementState = () => {
    setStateCount(stateCount + 1); // Triggers re-render
  };

  const incrementRef = () => {
    refCount.current += 1; // No re-render
    console.log('Ref count:', refCount.current);
  };

  return (
    <div>
      <p>State Count: {stateCount}</p>
      <p>Ref Count: {refCount.current}</p>
      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref (check console)</button>
    </div>
  );
}
```

---

### useImperativeHandle

**Purpose:** Customize the instance value exposed to parent when using `ref`

#### Basic Syntax

```jsx
useImperativeHandle(ref, () => ({
  // Exposed methods
}), [deps]);
```

#### Example

```jsx
const FancyInput = React.forwardRef((props, ref) => {
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
    }
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
    console.log(inputRef.current.getValue());
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus & Get Value</button>
    </div>
  );
}
```

---

### useLayoutEffect

**Purpose:** Similar to useEffect, but fires synchronously after all DOM mutations (before paint)

#### useEffect vs useLayoutEffect

| useEffect | useLayoutEffect |
|-----------|----------------|
| Runs **asynchronously** after paint | Runs **synchronously** before paint |
| Doesn't block visual updates | Blocks visual updates |
| Use for most side effects | Use for DOM measurements/mutations |

#### Example

```jsx
function Tooltip() {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const tooltipRef = useRef();

  // useLayoutEffect: Runs before paint
  // Prevents flicker when measuring DOM
  useLayoutEffect(() => {
    const height = tooltipRef.current.getBoundingClientRect().height;
    setTooltipHeight(height);
  }, []);

  return (
    <div
      ref={tooltipRef}
      style={{ top: `${-tooltipHeight - 10}px` }}
    >
      Tooltip content
    </div>
  );
}
```

---

### useDebugValue

**Purpose:** Display custom label in React DevTools for custom hooks

#### Example

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Shows in React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

---

## React 18+ Hooks

### useId

**Purpose:** Generate unique IDs that are stable across server and client

#### Example

```jsx
function NameFields() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-firstName`}>First Name</label>
      <input id={`${id}-firstName`} type="text" />

      <label htmlFor={`${id}-lastName`}>Last Name</label>
      <input id={`${id}-lastName`} type="text" />
    </div>
  );
}
```

---

### useTransition

**Purpose:** Mark state updates as non-urgent (lower priority)

#### Example

```jsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent

    startTransition(() => {
      // Non-urgent: Won't block input
      const filtered = largeDataset.filter(item =>
        item.name.includes(value)
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results items={results} />
    </div>
  );
}
```

---

### useDeferredValue

**Purpose:** Defer updating a value to keep UI responsive

#### Example

```jsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);

  // Uses deferred value for expensive operation
  const results = useMemo(() => {
    return largeDataset.filter(item =>
      item.name.includes(deferredQuery)
    );
  }, [deferredQuery]);

  return (
    <div>
      {results.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

---

### useSyncExternalStore

**Purpose:** Subscribe to external stores (for library authors)

#### Example

```jsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true // Server snapshot
  );

  return isOnline;
}
```

---

### useInsertionEffect

**Purpose:** Insert styles before DOM mutations (for CSS-in-JS libraries)

---

## Custom Hooks

### What are Custom Hooks?

Custom hooks let you extract component logic into reusable functions. Must start with `use`.

### Examples

**1. useLocalStorage**
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

**2. useFetch**
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (!cancelled) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

**3. useDebounce**
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // API call only after 500ms of no typing
      fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

**4. useToggle**
```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && <div>Modal Content</div>}
    </div>
  );
}
```

**5. usePrevious**
```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## Rules of Hooks

### 1. Only Call Hooks at the Top Level

❌ **Don't** call hooks inside loops, conditions, or nested functions:
```jsx
function Bad({ condition }) {
  if (condition) {
    useState(0); // ❌ Conditional hook
  }

  for (let i = 0; i < 5; i++) {
    useEffect(() => {}); // ❌ Hook in loop
  }

  function helper() {
    useState(0); // ❌ Hook in nested function
  }
}
```

✅ **Do** call hooks at the top level:
```jsx
function Good({ condition }) {
  const [state, setState] = useState(0); // ✅

  useEffect(() => {
    if (condition) {
      // Condition inside effect is OK
    }
  }, [condition]); // ✅
}
```

### 2. Only Call Hooks from React Functions

✅ Call hooks from:
- React function components
- Custom hooks

❌ Don't call hooks from:
- Regular JavaScript functions
- Class components

### 3. Use ESLint Plugin

Install `eslint-plugin-react-hooks` to enforce rules automatically.

---

## Common Patterns

### 1. Stale Closure Problem

**Problem:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always logs 0 (stale closure)
      setCount(count + 1); // Always sets to 1
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps = closure over initial count

  return <div>{count}</div>;
}
```

**Solution 1: Functional Updates**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1); // Always uses latest count
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

**Solution 2: useRef**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(countRef.current); // Always latest
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

### 2. Cleanup Functions

Always cleanup:
- Event listeners
- Timers (setTimeout, setInterval)
- Subscriptions
- Pending requests

```jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### 3. Multiple State Updates

```jsx
// Bad: Multiple re-renders
setName('John');
setAge(30);
setEmail('john@example.com');

// Good: Batch into one state object
setState(prev => ({
  ...prev,
  name: 'John',
  age: 30,
  email: 'john@example.com'
}));

// Or use useReducer for complex state
```

---

## Interview Questions

### Q1: What are React Hooks?

**Answer:**
Hooks are functions that let you use React state and lifecycle features in function components. Introduced in React 16.8.

**Key points:**
- Allow state in function components
- Replace class lifecycle methods
- Enable logic reuse without HOCs or render props
- Must follow Rules of Hooks

---

### Q2: Explain useState Hook

**Answer:**
useState adds state to function components.

```jsx
const [state, setState] = useState(initialValue);
```

- Returns array with current state and updater function
- Can pass initial value or function (lazy initialization)
- setState can take new value or function (functional update)

---

### Q3: Explain useEffect Hook

**Answer:**
useEffect performs side effects in function components.

**Syntax:**
```jsx
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

**Dependency array:**
- No array: Runs after every render
- Empty array `[]`: Runs once (mount)
- With values `[a, b]`: Runs when a or b changes

---

### Q4: What's the difference between useEffect and useLayoutEffect?

**Answer:**

| useEffect | useLayoutEffect |
|-----------|----------------|
| Runs **after** paint (async) | Runs **before** paint (sync) |
| Doesn't block visual updates | Blocks visual updates |
| Use for data fetching, subscriptions | Use for DOM measurements |

**Example:**
```jsx
// useLayoutEffect: Prevents flicker when measuring DOM
useLayoutEffect(() => {
  const height = ref.current.clientHeight;
  setHeight(height);
}, []);
```

---

### Q5: Explain useCallback and useMemo

**Answer:**

**useCallback:** Memoize functions
```jsx
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**useMemo:** Memoize values
```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**Relationship:**
```jsx
useCallback(fn, deps) === useMemo(() => fn, deps)
```

---

### Q6: When should you use useReducer vs useState?

**Answer:**

**Use useState when:**
- Simple state (string, number, boolean)
- Independent state updates
- Few state transitions

**Use useReducer when:**
- Complex state structure (nested objects/arrays)
- Multiple sub-values
- Next state depends on previous state
- Want to separate state logic

```jsx
// useState: Simple
const [count, setCount] = useState(0);

// useReducer: Complex
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT', payload: 5 });
```

---

### Q7: Explain useRef Hook

**Answer:**
useRef returns a mutable object that persists across renders.

**Two main uses:**
1. **Access DOM elements:**
```jsx
const inputRef = useRef();
inputRef.current.focus();
```

2. **Store mutable values (no re-render):**
```jsx
const countRef = useRef(0);
countRef.current += 1; // No re-render
```

**Key difference from useState:**
- useState: Triggers re-render when changed
- useRef: No re-render when changed

---

### Q8: What are Custom Hooks?

**Answer:**
Custom hooks extract component logic into reusable functions. Must start with `use`.

```jsx
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function App() {
  const [width, height] = useWindowSize();
  return <div>{width} x {height}</div>;
}
```

---

### Q9: What are the Rules of Hooks?

**Answer:**

1. **Only call hooks at the top level**
   - Don't call in loops, conditions, or nested functions
   - Ensures hooks are called in same order every render

2. **Only call hooks from React functions**
   - Function components
   - Custom hooks
   - Not regular JavaScript functions

**Why?**
React relies on order of hook calls to preserve state between renders.

---

### Q10: Explain the dependency array in useEffect

**Answer:**

```jsx
// No array: Runs after EVERY render
useEffect(() => {
  console.log('Runs every render');
});

// Empty array: Runs ONCE (mount only)
useEffect(() => {
  console.log('Runs once');
}, []);

// With deps: Runs when deps change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);
```

**Common mistake:**
```jsx
// ❌ Missing dependency
useEffect(() => {
  console.log(count); // Uses count but not in deps
}, []);

// ✅ Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

---

### Q11: What is the stale closure problem?

**Answer:**
When a closure captures an old value of a variable.

**Problem:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always 0 (stale)
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps = closure over initial count

  return <div>{count}</div>;
}
```

**Solutions:**

1. **Functional update:**
```jsx
setCount(c => c + 1); // Always uses latest
```

2. **Include in dependencies:**
```jsx
useEffect(() => {
  // ...
}, [count]); // Recreate effect when count changes
```

3. **Use useRef:**
```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);
```

---

### Q12: How do you fetch data with hooks?

**Answer:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true; // Cleanup: Ignore result if unmounted
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
}
```

**Key points:**
- Handle loading, error, success states
- Cleanup with cancellation flag
- Include dependencies in array

---

### Q13: Explain useContext

**Answer:**
useContext lets you consume context without nesting.

**Without useContext:**
```jsx
<ThemeContext.Consumer>
  {theme => <div>Theme: {theme}</div>}
</ThemeContext.Consumer>
```

**With useContext:**
```jsx
function Component() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
```

**Complete example:**
```jsx
// 1. Create context
const ThemeContext = React.createContext('light');

// 2. Provide value
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consume value
function Toolbar() {
  const theme = useContext(ThemeContext); // 'dark'
  return <div>{theme}</div>;
}
```

---

### Q14: What's the difference between controlled and uncontrolled components?

**Answer:**

**Controlled:** React controls form data
```jsx
function Controlled() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Uncontrolled:** DOM controls form data
```jsx
function Uncontrolled() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}
```

**Prefer controlled** for most cases (validation, formatting, etc.)

---

### Q15: How do you optimize React performance with hooks?

**Answer:**

1. **React.memo** - Prevent unnecessary re-renders
```jsx
const Child = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

2. **useCallback** - Memoize functions
```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

3. **useMemo** - Memoize expensive calculations
```jsx
const filtered = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

4. **Lazy loading**
```jsx
const Component = React.lazy(() => import('./Component'));
```

5. **Code splitting**
```jsx
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

---

## 🎯 Interview Checklist

Before interview, make sure you can:

- [ ] Explain what hooks are and why they exist
- [ ] Implement useState with objects and arrays
- [ ] Use useEffect for data fetching, subscriptions, timers
- [ ] Explain dependency array behavior
- [ ] Implement cleanup functions in useEffect
- [ ] Use useContext to avoid prop drilling
- [ ] Explain useReducer and when to use it
- [ ] Use useCallback to prevent re-renders
- [ ] Use useMemo for expensive calculations
- [ ] Use useRef for DOM access and mutable values
- [ ] Explain difference between useEffect and useLayoutEffect
- [ ] Create custom hooks (useLocalStorage, useFetch, useDebounce)
- [ ] Explain and solve stale closure problem
- [ ] Follow Rules of Hooks
- [ ] Handle race conditions in useEffect
- [ ] Optimize performance with React.memo, useCallback, useMemo

---

## 📝 Quick Reference

### Hook Cheat Sheet

```jsx
// State
const [state, setState] = useState(initialValue);

// Effect
useEffect(() => {
  // effect
  return () => {}; // cleanup
}, [deps]);

// Context
const value = useContext(MyContext);

// Reducer
const [state, dispatch] = useReducer(reducer, initialState);

// Callback
const fn = useCallback(() => {}, [deps]);

// Memo
const value = useMemo(() => computeValue(), [deps]);

// Ref
const ref = useRef(initialValue);

// Custom Hook
function useCustomHook() {
  const [state, setState] = useState();
  // ... logic
  return state;
}
```

---

**Next:** [React Advanced Concepts](../03-react-advanced/README.md)
**Previous:** [React Fundamentals](../01-react-fundamentals/README.md)

---

**Happy Learning! 🚀**
