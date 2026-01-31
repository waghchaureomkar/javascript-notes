# React Performance Optimization ⚡

> **Make Your React Apps Blazing Fast**
> Master performance optimization techniques

**Interview Probability:** ⭐⭐⭐⭐⭐

---

## 📚 Contents

1. [React.memo](#reactmemo)
2. [useMemo & useCallback](#usememo--usecallback)
3. [Code Splitting](#code-splitting)
4. [Virtualization](#virtualization)
5. [Performance Patterns](#performance-patterns)
6. [Profiling](#profiling)

---

## React.memo

Prevents re-renders if props haven't changed.

```jsx
// Without React.memo
function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data}</div>;
}

// With React.memo
const ExpensiveComponent = React.memo(function({ data }) {
  console.log('Rendering...');
  return <div>{data}</div>;
});

// Parent
function Parent() {
  const [count, setCount] = useState(0);
  const data = "Hello";

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
      {/* Won't re-render when count changes */}
    </>
  );
}
```

**Custom comparison:**
```jsx
const Component = React.memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Return true if no re-render needed
    return prevProps.user.id === nextProps.user.id;
  }
);
```

---

## useMemo & useCallback

### useMemo - Memoize Values

```jsx
function Component({ items }) {
  // ❌ Bad: Recalculates every render
  const filtered = items.filter(item => item.active);

  // ✅ Good: Only recalculates when items change
  const filtered = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  return <List items={filtered} />;
}
```

### useCallback - Memoize Functions

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Bad: New function every render
  const handleClick = () => {
    console.log('Clicked');
  };

  // ✅ Good: Same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});
```

### When to Use?

**useMemo:**
- Expensive calculations
- Filtering/sorting large lists
- Creating objects/arrays as dependencies

**useCallback:**
- Passing callbacks to React.memo components
- Dependencies in useEffect
- Event handlers passed to children

**Don't overuse!** Profile first, optimize only when needed.

---

## Code Splitting

### React.lazy

```jsx
import { lazy, Suspense } from 'react';

// Before
import HeavyComponent from './HeavyComponent';

// After
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Route-Based Splitting

```jsx
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

### Conditional Loading

```jsx
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <Modal />
        </Suspense>
      )}
    </>
  );
}
```

---

## Virtualization

Render only visible items in long lists.

### react-window

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window';

function Row({ index, style }) {
  return (
    <div style={style}>
      Row {index}
    </div>
  );
}

function VirtualList() {
  return (
    <FixedSizeList
      height={600}
      itemCount={10000}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Variable Size List

```jsx
import { VariableSizeList } from 'react-window';

const rowHeights = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 50));

function Row({ index, style }) {
  return (
    <div style={style}>
      Row {index} - Height: {rowHeights[index]}
    </div>
  );
}

function VirtualList() {
  const getItemSize = index => rowHeights[index];

  return (
    <VariableSizeList
      height={600}
      itemCount={1000}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
}
```

---

## Performance Patterns

### 1. Avoid Inline Functions

```jsx
// ❌ Bad
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good
const handleClickWithId = useCallback(() => {
  handleClick(id);
}, [id]);

<button onClick={handleClickWithId}>Click</button>

// Or
<button onClick={() => handleClick(id)}>Click</button>
// (Only bad if parent re-renders frequently)
```

### 2. Avoid Inline Objects

```jsx
// ❌ Bad
<Component style={{ color: 'red', fontSize: 16 }} />

// ✅ Good
const style = useMemo(() => ({
  color: 'red',
  fontSize: 16
}), []);

<Component style={style} />
```

### 3. Use Keys Properly

```jsx
// ❌ Bad
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ Good
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### 4. Debouncing & Throttling

```jsx
import { useState } from 'react';
import { debounce } from 'lodash';

function SearchBar() {
  const [results, setResults] = useState([]);

  // Debounce API calls
  const handleSearch = useMemo(
    () => debounce((query) => {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(setResults);
    }, 300),
    []
  );

  return (
    <input onChange={(e) => handleSearch(e.target.value)} />
  );
}
```

### 5. Pagination over Infinite Lists

```jsx
function UserList() {
  const [page, setPage] = useState(1);
  const { data } = useFetch(`/api/users?page=${page}`);

  return (
    <>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </>
  );
}
```

---

## Profiling

### React DevTools Profiler

```jsx
// Wrap component to profile
<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>

function onRenderCallback(
  id,
  phase, // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration, // Estimated time without memoization
  startTime,
  commitTime,
  interactions
) {
  console.log(`${id} took ${actualDuration}ms to render`);
}
```

### Chrome DevTools

1. Open DevTools → Performance tab
2. Click Record
3. Interact with app
4. Stop recording
5. Analyze flame graph

### Metrics to Watch

- **FCP** (First Contentful Paint) - < 1.8s
- **LCP** (Largest Contentful Paint) - < 2.5s
- **FID** (First Input Delay) - < 100ms
- **CLS** (Cumulative Layout Shift) - < 0.1

---

## Interview Questions

### Q: When to use React.memo?

**Answer:**
- Component receives same props often
- Re-rendering is expensive
- Pure component (same props = same output)

Don't use for:
- Props change frequently
- Cheap to render
- Premature optimization

---

### Q: useMemo vs useCallback?

**Answer:**
- **useMemo**: Memoize values
- **useCallback**: Memoize functions

```jsx
const value = useMemo(() => compute(), []);
const fn = useCallback(() => {}, []);

// They're related:
useCallback(fn, deps) === useMemo(() => fn, deps)
```

---

### Q: How to optimize large lists?

**Answer:**
1. **Pagination** - Load 20-50 items at a time
2. **Virtualization** - react-window (render only visible)
3. **Lazy loading** - Infinite scroll with Intersection Observer
4. **Proper keys** - Use unique IDs, not index

---

## 🎯 Quick Reference

```jsx
// React.memo
const Component = React.memo(({ data }) => <div>{data}</div>);

// useMemo
const filtered = useMemo(() => items.filter(i => i.active), [items]);

// useCallback
const handleClick = useCallback(() => {}, []);

// Code Splitting
const Component = lazy(() => import('./Component'));
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// Virtualization
<FixedSizeList height={600} itemCount={1000} itemSize={35}>
  {Row}
</FixedSizeList>

// Profiler
<Profiler id="App" onRender={callback}>
  <App />
</Profiler>
```

---

**Next:** [React State Management](../05-react-state-management/README.md)
**Previous:** [React Advanced](../03-react-advanced/README.md)

---

**Happy Learning! 🚀**
