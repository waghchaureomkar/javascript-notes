# React State Management 🗂️

> **Master State Management in React**
> From built-in solutions to external libraries

**Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)

---

## 📚 Table of Contents

1. [Built-in State Management](#built-in-state-management)
2. [Context API Deep Dive](#context-api-deep-dive)
3. [Redux Toolkit](#redux-toolkit)
4. [Zustand](#zustand)
5. [When to Use What](#when-to-use-what)
6. [Interview Questions](#interview-questions)

---

## Built-in State Management

### useState + useReducer

**Simple state:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Complex state:**
```jsx
const initialState = {
  todos: [],
  filter: 'all',
  loading: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
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
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {state.todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

---

## Context API Deep Dive

### Basic Context Setup

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const TodoContext = createContext(undefined);

// 2. Create Provider
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// 3. Create Custom Hook
export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// 4. Usage
function App() {
  return (
    <TodoProvider>
      <TodoList />
      <AddTodo />
    </TodoProvider>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <ul>
      {todos.map(todo => (
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
  );
}
```

### Context with Reducer

```jsx
const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
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

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// Usage
function TodoList() {
  const { state, dispatch } = useTodos();

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          {todo.text}
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Split Context for Performance

```jsx
// Problem: Everything re-renders when any value changes
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const value = { user, setUser, theme, setTheme, language, setLanguage };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Solution: Split into multiple contexts
const UserContext = createContext();
const ThemeContext = createContext();
const LanguageContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {children}
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

---

## Redux Toolkit

### Setup

```bash
npm install @reduxjs/toolkit react-redux
```

### Basic Store Setup

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer
  }
});

// App.js
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
```

### Create Slice

```jsx
// todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all'
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
```

### Using Redux in Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todosSlice';

function TodoList() {
  const todos = useSelector(state => state.todos.items);
  const filter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <button onClick={() => dispatch(addTodo('New Todo'))}>
        Add Todo
      </button>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {todo.text}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Async with createAsyncThunk

```jsx
// todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (text) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    return response.json();
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // Sync actions
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default todosSlice.reducer;
```

### Using Async Thunks

```jsx
function TodoList() {
  const { items, loading, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (text) => {
    dispatch(addTodoAsync(text));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### RTK Query

```jsx
// api/todosApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation({
      query: (text) => ({
        url: '/todos',
        method: 'POST',
        body: { text }
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todo']
    })
  })
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } = todosApi;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './api/todosApi';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware)
});

// Component
function TodoList() {
  const { data: todos, isLoading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => addTodo('New Todo')}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Zustand

### Setup

```bash
npm install zustand
```

### Basic Store

```jsx
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }]
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }))
}));

// Usage
function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <ul>
      {todos.map(todo => (
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
  );
}

function AddTodo() {
  const addTodo = useTodoStore(state => state.addTodo);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
```

### Async Actions

```jsx
const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUser: async (id, data) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      const updated = await response.json();
      set({ user: updated, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

// Usage
function UserProfile() {
  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(1);
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

### Middleware

```jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Persist to localStorage
const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), text }]
      }))
    }),
    {
      name: 'todo-storage'
    }
  )
);

// DevTools
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    })
  )
);

// Combine middleware
const useStore = create(
  devtools(
    persist(
      (set) => ({
        // state and actions
      }),
      { name: 'my-store' }
    )
  )
);
```

### Slices Pattern

```jsx
const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user })
});

const createTodoSlice = (set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text }]
  }))
});

const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createTodoSlice(set)
}));

// Usage
function Component() {
  const user = useStore(state => state.user);
  const todos = useStore(state => state.todos);
  const addTodo = useStore(state => state.addTodo);

  return <div>...</div>;
}
```

---

## When to Use What

### Decision Tree

```
Small app, simple state?
├─ Yes → useState/useReducer
└─ No → Need global state?
    ├─ Yes → How complex?
    │   ├─ Simple (theme, auth) → Context API
    │   ├─ Medium → Zustand
    │   └─ Complex (many features) → Redux Toolkit
    └─ No → useState/useReducer
```

### Comparison Table

| Feature | useState/useReducer | Context API | Redux Toolkit | Zustand |
|---------|---------------------|-------------|---------------|---------|
| **Setup** | None | Minimal | Medium | Minimal |
| **Boilerplate** | None | Low | Medium | Very Low |
| **DevTools** | No | No | Yes | Yes |
| **Middleware** | No | No | Yes | Yes |
| **Performance** | Good | Can be slow | Excellent | Excellent |
| **Learning Curve** | Easy | Easy | Medium | Easy |
| **Bundle Size** | 0 KB | 0 KB | ~12 KB | ~1 KB |
| **Async** | Manual | Manual | Built-in (thunks) | Manual |
| **Best For** | Local state | Simple global | Large apps | Medium apps |

### Use Cases

**useState/useReducer:**
- Component-level state
- Form state
- UI state (modals, dropdowns)

**Context API:**
- Theme
- Language/locale
- User authentication
- Feature flags

**Redux Toolkit:**
- Large applications
- Complex state logic
- Need time-travel debugging
- Team prefers Redux

**Zustand:**
- Medium-sized apps
- Want simplicity
- Don't need Redux ecosystem
- Prefer minimal boilerplate

---

## Interview Questions

### Q1: Context API vs Redux?

**Answer:**

| Context API | Redux |
|------------|-------|
| Built-in React | External library |
| Simple state sharing | Complex state management |
| No middleware | Middleware support |
| Can cause re-renders | Optimized with selectors |
| Good for: Theme, auth | Good for: Large apps |

**When to use Context:**
- Simple global state
- Theme, locale, auth
- Small to medium apps

**When to use Redux:**
- Complex state logic
- Many features/slices
- Need DevTools, middleware
- Large team, large app

---

### Q2: Explain Redux Toolkit benefits

**Answer:**

**Problems with classic Redux:**
- Too much boilerplate
- Complex setup
- Need multiple packages
- Mutable-looking code confusing

**Redux Toolkit solutions:**
- `configureStore()` - One-line setup
- `createSlice()` - Combines actions + reducers
- `createAsyncThunk()` - Easy async
- Immer built-in - Write "mutable" code
- DevTools included

**Example:**
```jsx
// Classic Redux: 50+ lines
// Redux Toolkit: 10 lines
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Looks mutable, but Immer handles it
    }
  }
});
```

---

### Q3: What is Zustand and when to use it?

**Answer:**
Zustand is a small, fast state management library.

**Pros:**
- Very small (1 KB)
- Simple API
- No boilerplate
- Great performance
- DevTools support

**Cons:**
- Less ecosystem than Redux
- Smaller community

**Use when:**
- Want simplicity
- Don't need Redux features
- Medium-sized app
- Want minimal bundle size

**Example:**
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```

---

### Q4: How to prevent Context re-renders?

**Answer:**

**Problem:**
```jsx
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // New object every render!
  const value = { user, setUser, theme, setTheme };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

**Solutions:**

1. **Memoize value:**
```jsx
const value = useMemo(() => ({
  user, setUser, theme, setTheme
}), [user, theme]);
```

2. **Split contexts:**
```jsx
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
</UserContext.Provider>
```

3. **Use external library (Zustand/Redux)**

---

### Q5: useState vs useReducer - When to use which?

**Answer:**

**useState:**
- Simple state (boolean, string, number)
- Few state updates
- Independent state variables

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
```

**useReducer:**
- Complex state (objects, arrays)
- Many related updates
- Next state depends on previous
- Want to separate logic

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT', payload: 5 });
```

---

## 🎯 Quick Reference

```jsx
// useState
const [state, setState] = useState(initial);

// useReducer
const [state, dispatch] = useReducer(reducer, initialState);

// Context API
const Context = createContext();
<Context.Provider value={value}>{children}</Context.Provider>
const value = useContext(Context);

// Redux Toolkit
const slice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => { state.push(action.payload); }
  }
});
const state = useSelector(state => state.todos);
const dispatch = useDispatch();

// Zustand
const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}));
const count = useStore(state => state.count);
```

---

**Next:** [React Routing](../06-react-routing/README.md)
**Previous:** [React Performance](../04-react-performance/README.md)

---

**Happy Learning! 🚀**
