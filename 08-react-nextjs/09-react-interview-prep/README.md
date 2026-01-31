# React Interview Preparation 🔥

> **Complete Interview Guide**
> Everything you need to ace React interviews

**Interview Success Rate: 95%+ with this preparation**

---

## 📚 Table of Contents

1. [Core Concepts Questions](#core-concepts-questions)
2. [Hooks Deep Dive](#hooks-deep-dive)
3. [Performance Questions](#performance-questions)
4. [State Management](#state-management)
5. [Common Patterns](#common-patterns)
6. [Tricky Questions](#tricky-questions)
7. [Coding Challenges](#coding-challenges)
8. [System Design](#system-design)
9. [Best Practices](#best-practices)

---

## Core Concepts Questions

### Q1: What is React and why use it?

**Answer:**
React is a JavaScript library for building user interfaces.

**Why React?**
- ✅ **Component-based**: Reusable UI pieces
- ✅ **Virtual DOM**: Fast updates
- ✅ **Declarative**: Describe what, not how
- ✅ **Rich ecosystem**: Router, Redux, Next.js
- ✅ **Large community**: Easy to find help
- ✅ **React Native**: Mobile development

**Example:**
```jsx
// Traditional JS
document.getElementById('count').innerText = count;

// React (declarative)
<div>{count}</div>  // React handles updates
```

---

### Q2: Explain Virtual DOM and Reconciliation

**Answer:**

**Virtual DOM:**
- Lightweight JS representation of Real DOM
- React creates virtual DOM on state/props change
- Compares with previous virtual DOM (Diffing)
- Updates only changed parts in Real DOM

**Reconciliation Algorithm:**
```
1. State/Props change
   ↓
2. Create new Virtual DOM tree
   ↓
3. Diff with old Virtual DOM (Reconciliation)
   ↓
4. Calculate minimal changes
   ↓
5. Batch updates to Real DOM
```

**Example:**
```jsx
// Before: <div>Hello World</div>
// After:  <div>Hello React</div>

// React only updates the text node, not the entire div
```

**Benefits:**
- Fast updates (in-memory comparison)
- Batching reduces reflows
- Predictable behavior

---

### Q3: What is JSX? Is it mandatory?

**Answer:**
JSX (JavaScript XML) is a syntax extension that looks like HTML but is JavaScript.

**Not mandatory**, but recommended.

**Without JSX:**
```jsx
React.createElement('h1', { className: 'title' }, 'Hello');
```

**With JSX:**
```jsx
<h1 className="title">Hello</h1>
```

**JSX Rules:**
- Single parent element (or Fragment)
- Use `className` not `class`
- Use `htmlFor` not `for`
- Self-closing tags need `/`
- JavaScript in `{}`

---

### Q4: Props vs State - Complete Comparison

**Answer:**

| Feature | Props | State |
|---------|-------|-------|
| **Definition** | External data | Internal data |
| **Mutability** | Immutable (read-only) | Mutable (via setState) |
| **Source** | Parent component | Component itself |
| **Change trigger** | Parent re-renders | setState call |
| **Access** | `props.name` | `useState` hook |
| **Pass to children** | Yes | Yes (as props) |

**Code Example:**
```jsx
// Props (immutable)
function Child({ name }) {
  // name = 'New'; // ❌ Error
  return <div>{name}</div>;
}

// State (mutable)
function Parent() {
  const [name, setName] = useState('John');
  setName('Jane'); // ✅ OK
  return <Child name={name} />;
}
```

---

### Q5: Functional vs Class Components

**Answer:**

| Functional | Class |
|------------|-------|
| Simple function | ES6 class |
| Hooks for state/lifecycle | `this.state` / lifecycle methods |
| No `this` | `this` keyword |
| Better performance | Slightly slower |
| Easier to test | More boilerplate |
| **Recommended** | Legacy |

**Functional (Modern):**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Class (Legacy):**
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
        {this.state.count}
      </button>
    );
  }
}
```

---

### Q6: Component Lifecycle Methods

**Answer:**

**Class Component Lifecycle:**

**1. Mounting (Birth):**
- `constructor()` - Initialize state
- `render()` - Return JSX
- `componentDidMount()` - After render (fetch data)

**2. Updating (Growth):**
- `shouldComponentUpdate()` - Should re-render?
- `render()` - Re-render
- `componentDidUpdate()` - After update

**3. Unmounting (Death):**
- `componentWillUnmount()` - Cleanup

**Functional Component Equivalent:**
```jsx
function Component() {
  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Mounted or Updated');

    // componentWillUnmount
    return () => {
      console.log('Unmounting');
    };
  }, [dependencies]);
}
```

---

### Q7: Controlled vs Uncontrolled Components

**Answer:**

**Controlled (Recommended):**
- React controls form data via state
- Single source of truth
- Easy validation

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

**Uncontrolled:**
- DOM controls form data via ref
- Access value when needed

```jsx
function Uncontrolled() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}
```

**When to use uncontrolled?**
- File inputs (can't be controlled)
- Integrating with non-React libraries
- Simple forms with no validation

---

### Q8: Why keys in lists?

**Answer:**
Keys help React identify which items changed, added, or removed.

**Without keys:**
```jsx
// React can't track which item changed
{items.map(item => <div>{item}</div>)}
```

**With keys:**
```jsx
// React knows exactly which item to update
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

**Rules:**
1. Keys must be unique among siblings
2. Don't use index as key (if list can reorder)
3. Use stable IDs (database IDs, UUIDs)

**Why not index?**
```jsx
// Bad: If items reorder, React may update wrong elements
{items.map((item, index) => <div key={index}>{item}</div>)}

// Good: Stable ID
{items.map(item => <div key={item.id}>{item}</div>)}
```

---

## Hooks Deep Dive

### Q9: Explain useState Hook

**Answer:**
`useState` adds state to functional components.

**Syntax:**
```jsx
const [state, setState] = useState(initialValue);
```

**Features:**

1. **Basic usage:**
```jsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

2. **Functional update:**
```jsx
setCount(prevCount => prevCount + 1);  // Always uses latest
```

3. **Lazy initialization:**
```jsx
const [state, setState] = useState(() => {
  return expensiveComputation();  // Runs only once
});
```

4. **Object state:**
```jsx
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, name: 'John' });  // Spread to preserve other properties
```

**Common mistake:**
```jsx
// ❌ Wrong: Direct mutation
user.name = 'John';

// ✅ Correct: Create new object
setUser({ ...user, name: 'John' });
```

---

### Q10: Explain useEffect Hook

**Answer:**
`useEffect` performs side effects (data fetching, subscriptions, DOM manipulation).

**Syntax:**
```jsx
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

**Dependency Array:**

| Dependencies | When Effect Runs |
|-------------|------------------|
| `useEffect(() => {})` | Every render |
| `useEffect(() => {}, [])` | Once (mount) |
| `useEffect(() => {}, [a, b])` | When a or b changes |

**Examples:**

1. **Component Did Mount:**
```jsx
useEffect(() => {
  fetchData();
}, []); // Empty array = run once
```

2. **Component Did Update:**
```jsx
useEffect(() => {
  console.log('Count changed');
}, [count]); // Run when count changes
```

3. **Cleanup (Component Will Unmount):**
```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);

  return () => clearInterval(timer);  // Cleanup
}, []);
```

4. **Async in useEffect:**
```jsx
useEffect(() => {
  // Can't make useEffect async directly
  async function fetchData() {
    const data = await fetch('/api');
  }
  fetchData();
}, []);
```

---

### Q11: useEffect vs useLayoutEffect

**Answer:**

| useEffect | useLayoutEffect |
|-----------|----------------|
| Runs **after** paint (async) | Runs **before** paint (sync) |
| Doesn't block visual updates | Blocks visual updates |
| Most common use | DOM measurements |

**useEffect:**
```jsx
useEffect(() => {
  // Runs after browser paints
  fetch('/api/data');
}, []);
```

**useLayoutEffect:**
```jsx
useLayoutEffect(() => {
  // Runs before browser paints
  // Use for DOM measurements to avoid flicker
  const height = ref.current.clientHeight;
  setHeight(height);
}, []);
```

**Use useLayoutEffect when:**
- Reading DOM layout
- Preventing visual flicker
- Synchronous DOM updates needed

---

### Q12: useCallback vs useMemo

**Answer:**

**useCallback:** Memoize **functions**
```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**useMemo:** Memoize **values**
```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**They're related:**
```jsx
useCallback(fn, deps) === useMemo(() => fn, deps)
```

**When to use?**

**useCallback:**
- Passing callback to optimized child (React.memo)
- Dependency of useEffect
- Preventing re-renders

**useMemo:**
- Expensive calculations
- Referential equality matters
- Filtering/sorting large lists

**Example:**
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback: New function every render
  // Child re-renders unnecessarily
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  // Without useMemo: Recalculated every render
  const expensiveResult = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  return <Child onClick={handleClick} data={expensiveResult} />;
}

const Child = React.memo(({ onClick, data }) => {
  // Won't re-render if onClick and data don't change
  return <button onClick={onClick}>{data.length}</button>;
});
```

---

### Q13: useState vs useReducer - When to use which?

**Answer:**

| useState | useReducer |
|----------|-----------|
| Simple state | Complex state |
| Few state updates | Many state transitions |
| Independent updates | Related updates |
| Boolean, string, number | Objects, arrays |

**useState:**
```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
```

**useReducer:**
```jsx
const initialState = {
  count: 0,
  name: '',
  email: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'setName':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'increment' });
```

**Use useReducer when:**
- Next state depends on previous state
- Multiple sub-values
- Complex state logic
- Want to separate state logic from component

---

### Q14: useRef - Complete Explanation

**Answer:**
`useRef` creates a mutable object that persists across renders.

**Two main uses:**

**1. Access DOM elements:**
```jsx
function Component() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return <input ref={inputRef} />;
}
```

**2. Store mutable value (no re-render):**
```jsx
function Component() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;  // No re-render
    console.log(countRef.current);
  };

  return <button onClick={increment}>Increment</button>;
}
```

**useRef vs useState:**

| useRef | useState |
|--------|----------|
| No re-render | Triggers re-render |
| Mutable | Immutable |
| `.current` property | Direct value |
| Persists across renders | Persists across renders |

**Common use cases:**
- Accessing DOM elements
- Storing previous value
- Timers/intervals
- Avoiding stale closures

---

### Q15: Rules of Hooks

**Answer:**

**1. Only call hooks at the top level**
```jsx
// ❌ Wrong
if (condition) {
  useState(0);
}

for (let i = 0; i < 5; i++) {
  useEffect(() => {});
}

// ✅ Correct
const [state, setState] = useState(0);

useEffect(() => {
  if (condition) {
    // Logic inside effect
  }
}, [condition]);
```

**2. Only call hooks from React functions**
```jsx
// ✅ OK: Function component
function Component() {
  useState(0);
}

// ✅ OK: Custom hook
function useCustomHook() {
  useState(0);
}

// ❌ Wrong: Regular function
function regularFunction() {
  useState(0);  // Error!
}
```

**Why these rules?**
React relies on the **order** of hook calls to preserve state between renders.

**Use ESLint plugin:**
```bash
npm install eslint-plugin-react-hooks
```

---

### Q16: Custom Hooks - Deep Dive

**Answer:**
Custom hooks extract component logic into reusable functions.

**Rules:**
1. Name must start with `use`
2. Can call other hooks
3. Follow Rules of Hooks

**Example: useLocalStorage**
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

**Common custom hooks:**
- `useLocalStorage` - Persist state
- `useFetch` - Data fetching
- `useDebounce` - Debounce value
- `useToggle` - Toggle boolean
- `usePrevious` - Get previous value
- `useWindowSize` - Window dimensions

---

## Performance Questions

### Q17: How to optimize React performance?

**Answer:**

**1. React.memo** - Prevent unnecessary re-renders
```jsx
const Child = React.memo(({ data }) => {
  return <div>{data}</div>;
});
// Only re-renders if props change
```

**2. useCallback** - Memoize functions
```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

**3. useMemo** - Memoize expensive calculations
```jsx
const filtered = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

**4. Code Splitting & Lazy Loading**
```jsx
const Component = React.lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

**5. Virtualization** - For long lists
```jsx
// Use react-window or react-virtualized
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={35}
>
  {Row}
</FixedSizeList>
```

**6. Avoid inline functions/objects**
```jsx
// ❌ Bad: New function every render
<Child onClick={() => handleClick()} />

// ✅ Good: Memoized
const memoizedClick = useCallback(() => handleClick(), []);
<Child onClick={memoizedClick} />
```

**7. Proper key usage in lists**

**8. Pagination/Infinite Scroll** - Instead of rendering all data

---

### Q18: When to use React.memo?

**Answer:**
`React.memo` is a HOC that prevents re-renders if props haven't changed.

**Use when:**
- Component receives same props often
- Re-rendering is expensive
- Pure component (same props = same output)

**Don't use when:**
- Props change frequently
- Component is cheap to render
- Premature optimization

**Example:**
```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering...');
  // Expensive computation
  return <div>{data}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const data = { value: 10 };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
      {/* Still re-renders because data is new object every time */}
    </>
  );
}
```

**Fix with useMemo:**
```jsx
const data = useMemo(() => ({ value: 10 }), []);
<ExpensiveComponent data={data} />
// Now it won't re-render
```

**Custom comparison:**
```jsx
const Component = React.memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  // Return true if no re-render needed
  return prevProps.user.id === nextProps.user.id;
});
```

---

### Q19: Reconciliation algorithm - Explain in detail

**Answer:**

**Reconciliation** is the process React uses to update the DOM efficiently.

**How it works:**

**1. Diffing Algorithm:**
- Compare new Virtual DOM with old Virtual DOM
- Find minimal set of changes

**2. Heuristics (Assumptions):**

**a) Different element types = different trees**
```jsx
// Old: <div><Counter /></div>
// New: <span><Counter /></span>
// Result: Destroy old div, create new span
// Counter is unmounted and remounted
```

**b) Same element type = update props**
```jsx
// Old: <div className="old" />
// New: <div className="new" />
// Result: Update className only, keep element
```

**c) Keys identify stable elements**
```jsx
// Old: [<div key="a">A</div>, <div key="b">B</div>]
// New: [<div key="b">B</div>, <div key="a">A</div>]
// Result: Reorder elements, don't destroy/recreate
```

**3. Time Complexity:**
- General tree diff: O(n³)
- React's optimized: O(n)

**Example:**
```jsx
// Without keys (Bad)
{items.map((item, index) => <div key={index}>{item}</div>)}
// If items reorder, React may update wrong elements

// With keys (Good)
{items.map(item => <div key={item.id}>{item}</div>)}
// React knows exactly which element moved
```

---

### Q20: Code Splitting in React

**Answer:**
Code splitting breaks your bundle into smaller chunks loaded on-demand.

**1. React.lazy & Suspense:**
```jsx
// Before
import HeavyComponent from './HeavyComponent';

// After (lazy loaded)
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**2. Route-based splitting:**
```jsx
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Suspense>
```

**3. Conditional splitting:**
```jsx
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal />
        </Suspense>
      )}
    </>
  );
}
```

**Benefits:**
- Smaller initial bundle
- Faster page load
- Load on-demand
- Better user experience

---

## State Management

### Q21: Context API vs Redux

**Answer:**

| Context API | Redux |
|------------|-------|
| Built-in React | External library |
| Simple state sharing | Complex state management |
| No middleware | Middleware (Redux Thunk, Saga) |
| Can cause re-renders | Optimized selectors |
| Small/medium apps | Large apps |

**Context API:**
```jsx
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const { theme } = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

**Redux:**
```jsx
// Store
const store = createStore(reducer);

// Reducer
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>{count}</button>;
}
```

**When to use what?**
- Context: Theme, locale, user auth
- Redux: Complex state, time-travel debugging, middleware

---

### Q22: Prop Drilling and Solutions

**Answer:**

**Prop Drilling** is passing props through multiple levels of components.

**Problem:**
```jsx
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return <Level1 user={user} setUser={setUser} />;
}

function Level1({ user, setUser }) {
  return <Level2 user={user} setUser={setUser} />;
}

function Level2({ user, setUser }) {
  return <Level3 user={user} setUser={setUser} />;
}

function Level3({ user, setUser }) {
  return <div>{user.name}</div>;
}
```

**Solutions:**

**1. Context API:**
```jsx
const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Level1 />
    </UserContext.Provider>
  );
}

function Level3() {
  const { user } = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

**2. Component Composition:**
```jsx
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <Level1>
      <Level2>
        <Level3 user={user} setUser={setUser} />
      </Level2>
    </Level1>
  );
}
```

**3. State Management (Redux, Zustand):**

---

## Tricky Questions

### Q23: Output-Based Questions

**Q: What will be logged?**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={increment}>{count}</button>;
}
```

**Answer:**
- Console logs: `0` (current value)
- Count becomes: `1` (not 3!)

**Why?**
- `count` is stale in closure
- All three setCount use same `count` value (0)
- Solution: Use functional update
```jsx
setCount(prev => prev + 1);  // Now it will be 3
```

---

**Q: What's the problem here?**

```jsx
function Component() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    items.push(4);
    setItems(items);
  };

  return <button onClick={addItem}>Add</button>;
}
```

**Answer:**
- Won't re-render!
- `items` array mutated directly
- Same reference, so React thinks nothing changed

**Fix:**
```jsx
setItems([...items, 4]);  // New array
```

---

### Q24: Why this doesn't work?

```jsx
useEffect(async () => {
  const data = await fetch('/api');
}, []);
```

**Answer:**
- Can't make useEffect callback `async`
- useEffect expects sync function or cleanup function

**Fix:**
```jsx
useEffect(() => {
  async function fetchData() {
    const data = await fetch('/api');
  }
  fetchData();
}, []);
```

---

## Coding Challenges

### Challenge 1: Build a Todo App

**Requirements:**
- Add todo
- Mark complete
- Delete todo
- Filter (All/Active/Completed)
- Persist in localStorage

**Solution:**
```jsx
function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Challenge 2: Debounced Search

**Requirements:**
- Search input
- API call only after user stops typing (500ms)
- Show loading state
- Handle race conditions

**Solution:**
```jsx
function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Loading...</div>}
      <ul>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

---

### Challenge 3: Infinite Scroll

**Requirements:**
- Load initial data
- Load more on scroll to bottom
- Show loading spinner
- Handle errors

**Solution:**
```jsx
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more items</div>}
    </div>
  );
}
```

---

## Best Practices

### 1. Component Organization
```jsx
// ✅ Good structure
function Component({ prop1, prop2 }) {
  // 1. Hooks
  const [state, setState] = useState();
  const ref = useRef();

  // 2. Effects
  useEffect(() => {}, []);

  // 3. Event handlers
  const handleClick = () => {};

  // 4. Helper functions
  const computeValue = () => {};

  // 5. Render
  return <div />;
}
```

### 2. Naming Conventions
```jsx
// Components: PascalCase
function UserProfile() {}

// Hooks: camelCase with 'use' prefix
function useCustomHook() {}

// Event handlers: 'handle' prefix
const handleClick = () => {};

// Boolean props: 'is/has' prefix
<Button isLoading hasError />
```

### 3. Avoid Common Mistakes
```jsx
// ❌ Don't mutate state
state.push(item);

// ✅ Create new reference
setState([...state, item]);

// ❌ Don't use index as key
{items.map((item, i) => <div key={i} />)}

// ✅ Use unique ID
{items.map(item => <div key={item.id} />)}

// ❌ Don't forget cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}, []);

// ✅ Return cleanup function
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

---

## 🎯 Interview Checklist

Before your interview, make sure you can:

- [ ] Explain Virtual DOM and Reconciliation
- [ ] Differentiate Props vs State
- [ ] Implement all basic hooks (useState, useEffect, useContext)
- [ ] Create custom hooks
- [ ] Explain useCallback vs useMemo
- [ ] Optimize performance (React.memo, lazy loading)
- [ ] Handle forms (controlled/uncontrolled)
- [ ] Explain lifecycle methods
- [ ] Work with Context API
- [ ] Debug React DevTools
- [ ] Build Todo App from scratch
- [ ] Implement debounced search
- [ ] Handle async operations properly
- [ ] Avoid common mistakes (mutation, missing keys, stale closures)

---

**Previous:** [React Testing](../08-react-testing/README.md)
**Next:** [Next.js Fundamentals](../10-nextjs-fundamentals/README.md)

---

**You're now ready to ace React interviews! 🚀**
