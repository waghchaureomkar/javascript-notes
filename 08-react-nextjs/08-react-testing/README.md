# React Testing - Complete Guide 🧪

> **Master Testing in React**
> Jest + React Testing Library

**Interview Probability:** ⭐⭐⭐

---

## 📚 Contents

1. [Setup](#setup)
2. [Jest Basics](#jest-basics)
3. [React Testing Library](#react-testing-library)
4. [Testing Hooks](#testing-hooks)
5. [Testing Async](#testing-async)
6. [Common Patterns](#common-patterns)

---

## Setup

```bash
# Create React App includes Jest & RTL
npx create-react-app my-app

# Manual setup
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Jest Basics

### Simple Tests

```jsx
// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum';

describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds 5 + 5 to equal 10', () => {
    expect(sum(5, 5)).toBe(10);
  });
});
```

### Matchers

```jsx
// Equality
expect(value).toBe(5); // Strict equality (===)
expect(value).toEqual({ a: 1 }); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(value).toMatch(/hello/i);

// Arrays
expect([1, 2, 3]).toContain(2);

// Exceptions
expect(() => throwError()).toThrow();
expect(() => throwError()).toThrow('error message');
```

### Mocking

```jsx
// Mock function
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Mock return value
const mockFn = jest.fn().mockReturnValue(42);
expect(mockFn()).toBe(42);

// Mock implementation
const mockFn = jest.fn((x) => x * 2);
expect(mockFn(5)).toBe(10);

// Mock module
jest.mock('./api');
import { fetchData } from './api';
fetchData.mockResolvedValue({ data: 'mock data' });
```

---

## React Testing Library

### Render Component

```jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button text="Click me" />);

  const button = screen.getByText(/click me/i);
  expect(button).toBeInTheDocument();
});
```

### Queries

```jsx
// getBy* - Throws error if not found (use for assertions)
screen.getByText('Hello');
screen.getByRole('button');
screen.getByLabelText('Email');
screen.getByPlaceholderText('Enter email');

// queryBy* - Returns null if not found (use for asserting element doesn't exist)
const element = screen.queryByText('Not here');
expect(element).not.toBeInTheDocument();

// findBy* - Returns promise, waits for element (use for async)
const element = await screen.findByText('Async content');

// Multiple elements
screen.getAllByRole('listitem');
```

### User Events

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('button click', async () => {
  const user = userEvent.setup();
  render(<Button />);

  const button = screen.getByRole('button');
  await user.click(button);

  expect(button).toHaveTextContent('Clicked');
});

test('typing in input', async () => {
  const user = userEvent.setup();
  render(<Input />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');

  expect(input).toHaveValue('Hello');
});
```

### Complete Example

```jsx
// Counter.jsx
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

// Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementBtn = screen.getByText('Increment');
    await user.click(incrementBtn);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('decrements count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const decrementBtn = screen.getByText('Decrement');
    await user.click(decrementBtn);

    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  test('resets count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // Increment first
    await user.click(screen.getByText('Increment'));
    await user.click(screen.getByText('Increment'));

    // Then reset
    await user.click(screen.getByText('Reset'));

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
```

---

## Testing Hooks

### Custom Hook Testing

```jsx
// useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter', () => {
  test('initializes with 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('decrements count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  test('resets count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
```

---

## Testing Async

### Async Data Fetching

```jsx
// UserList.jsx
function UserList() {
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

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// UserList.test.jsx
import { render, screen } from '@testing-library/react';
import UserList from './UserList';

// Mock fetch
global.fetch = jest.fn();

describe('UserList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('shows loading state', () => {
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<UserList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders users after fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    });

    render(<UserList />);

    // Wait for users to load
    const john = await screen.findByText('John');
    const jane = await screen.findByText('Jane');

    expect(john).toBeInTheDocument();
    expect(jane).toBeInTheDocument();
  });

  test('calls fetch with correct URL', () => {
    fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<UserList />);

    expect(fetch).toHaveBeenCalledWith('/api/users');
  });
});
```

### waitFor

```jsx
import { waitFor } from '@testing-library/react';

test('updates eventually', async () => {
  render(<Component />);

  await waitFor(() => {
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
```

---

## Common Patterns

### Testing Forms

```jsx
// LoginForm.jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// LoginForm.test.jsx
test('submits form with values', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  render(<LoginForm onSubmit={handleSubmit} />);

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Login');

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

### Testing Context

```jsx
// ThemeContext.jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ThemeToggle.jsx
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}

// ThemeToggle.test.jsx
test('toggles theme', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  const button = screen.getByRole('button');

  expect(button).toHaveTextContent('Current: light');

  await user.click(button);

  expect(button).toHaveTextContent('Current: dark');
});
```

### Snapshot Testing

```jsx
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(<Button text="Click me" />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

---

## Interview Questions

### Q: Jest vs React Testing Library?

**Answer:**
- **Jest**: JavaScript testing framework
- **RTL**: Library for testing React components

**Jest provides:**
- Test runner
- Assertions (expect)
- Mocking

**RTL provides:**
- Render components
- Query DOM
- User interactions

**Use both together!**

---

### Q: getBy vs queryBy vs findBy?

**Answer:**

| Method | Returns | Wait | Use Case |
|--------|---------|------|----------|
| getBy | Element or throw | No | Assert element exists |
| queryBy | Element or null | No | Assert element doesn't exist |
| findBy | Promise | Yes | Async elements |

```jsx
// Element exists
const button = screen.getByText('Click');

// Element doesn't exist
const missing = screen.queryByText('Not here');
expect(missing).not.toBeInTheDocument();

// Async
const async = await screen.findByText('Loaded');
```

---

### Q: How to test async code?

**Answer:**

Use `findBy*` or `waitFor`:

```jsx
// findBy
const element = await screen.findByText('Loaded');

// waitFor
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({ data: 'mock' })
});
```

---

## 🎯 Quick Reference

```jsx
// Render
render(<Component />);

// Queries
screen.getByText('Hello');
screen.getByRole('button');
screen.queryByText('Not here');
const element = await screen.findByText('Async');

// User events
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');

// Assertions
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent('Hello');
expect(element).toHaveValue('text');

// Async
await waitFor(() => {
  expect(screen.getByText('Done')).toBeInTheDocument();
});

// Mock
const mockFn = jest.fn();
expect(mockFn).toHaveBeenCalled();

global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({ data: 'mock' })
});
```

---

**Next:** [React Interview Prep](../09-react-interview-prep/README.md)
**Previous:** [React Forms](../07-react-forms/README.md)

---

**Happy Learning! 🚀**
