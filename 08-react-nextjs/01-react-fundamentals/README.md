# React Fundamentals - Complete Guide 📘

> **Foundation of React Development**
> Master the core concepts before diving into advanced topics

**Interview Probability:** ⭐⭐⭐⭐⭐ (VERY HIGH)

---

## 📚 Table of Contents

1. [What is React?](#what-is-react)
2. [Virtual DOM](#virtual-dom)
3. [JSX](#jsx)
4. [Components](#components)
5. [Props](#props)
6. [State](#state)
7. [Events](#events)
8. [Conditional Rendering](#conditional-rendering)
9. [Lists and Keys](#lists-and-keys)
10. [Forms](#forms)
11. [Component Lifecycle](#component-lifecycle)
12. [React 18 Features](#react-18-features)
13. [Interview Questions](#interview-questions)

---

## What is React?

**React** is a **JavaScript library** for building user interfaces, particularly single-page applications (SPAs).

### Library vs Framework

| React (Library) | Angular/Vue (Framework) |
|----------------|------------------------|
| Focuses on UI only | Complete solution (routing, state, HTTP) |
| Choose your own tools | Opinionated structure |
| Lightweight | Heavier |
| JSX syntax | Template syntax |
| Component-based | Component-based |

### Key Features

✅ **Component-Based**: Build encapsulated components
✅ **Declarative**: Describe what UI should look like
✅ **Virtual DOM**: Efficient updates
✅ **One-Way Data Flow**: Props flow down, events flow up
✅ **JSX**: Write HTML-like syntax in JavaScript
✅ **React Ecosystem**: Router, Redux, Next.js, etc.

### Why React?

1. **Fast**: Virtual DOM optimizes rendering
2. **Reusable**: Components can be reused
3. **SEO-Friendly**: Server-side rendering (Next.js)
4. **Large Community**: Tons of libraries and resources
5. **Job Market**: High demand for React developers

---

## Virtual DOM

### Real DOM vs Virtual DOM

**Real DOM:**
- Actual HTML elements in browser
- Slow to update (reflow & repaint)
- Direct manipulation

**Virtual DOM:**
- Lightweight JavaScript representation
- Fast to update (in-memory)
- React compares and updates only changed parts

### How Virtual DOM Works

```
1. State changes
   ↓
2. Create new Virtual DOM
   ↓
3. Compare with previous Virtual DOM (Diffing)
   ↓
4. Calculate minimal changes
   ↓
5. Update only changed parts in Real DOM (Reconciliation)
```

### Example

```jsx
// When state changes from:
<div>Hello World</div>

// To:
<div>Hello React</div>

// React only updates the text node, not entire div
```

### Benefits

✅ Efficient updates (batch processing)
✅ Better performance
✅ Predictable behavior
✅ Cross-platform (React Native)

---

## JSX

**JSX (JavaScript XML)** is a syntax extension that allows writing HTML-like code in JavaScript.

### Basic JSX

```jsx
const element = <h1>Hello, React!</h1>;
```

### JSX is Not HTML

```jsx
// HTML uses 'class'
<div class="container"></div>

// JSX uses 'className'
<div className="container"></div>

// HTML uses 'for'
<label for="input"></label>

// JSX uses 'htmlFor'
<label htmlFor="input"></label>
```

### JSX Rules

1. **Single Parent Element**
```jsx
// ❌ Wrong: Multiple root elements
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ Correct: Wrapped in parent
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ Or use Fragment
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

2. **JavaScript Expressions in Curly Braces**
```jsx
const name = 'John';
const age = 30;

return (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age}</p>
    <p>Double age: {age * 2}</p>
    <p>Uppercase: {name.toUpperCase()}</p>
  </div>
);
```

3. **Self-Closing Tags**
```jsx
// ❌ Wrong
<img src="logo.png">

// ✅ Correct
<img src="logo.png" />
<input type="text" />
<br />
```

4. **camelCase for Attributes**
```jsx
<div
  className="container"
  onClick={handleClick}
  onMouseOver={handleHover}
  tabIndex={0}
  autoFocus
/>
```

### JSX Expressions

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {/* Ternary operator */}
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}

      {/* Logical AND */}
      {isLoggedIn && <button>Logout</button>}

      {/* Function call */}
      {getGreetingMessage()}

      {/* Array map */}
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

### JSX Under the Hood

```jsx
// This JSX
const element = <h1 className="title">Hello</h1>;

// Compiles to
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
);
```

---

## Components

**Components** are independent, reusable pieces of UI.

### Types of Components

#### 1. Functional Components (Modern)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Or arrow function
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// Usage
<Welcome name="John" />
```

#### 2. Class Components (Legacy)

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**Note:** Use functional components with hooks (modern approach)

### Component Rules

1. **Name must start with capital letter**
```jsx
// ✅ Correct
function MyComponent() {}

// ❌ Wrong (treated as HTML tag)
function myComponent() {}
```

2. **Must return JSX (or null)**
```jsx
function Component() {
  return <div>Content</div>;
}
```

3. **Can be composed**
```jsx
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
}
```

### Component Example

```jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
      <button>View Profile</button>
    </div>
  );
}

// Usage
<UserCard
  name="John Doe"
  email="john@example.com"
  avatar="avatar.jpg"
/>
```

---

## Props

**Props (Properties)** are read-only data passed from parent to child.

### Passing Props

```jsx
function Parent() {
  return (
    <Child
      name="John"
      age={30}
      isActive={true}
      hobbies={['reading', 'coding']}
      user={{ id: 1, role: 'admin' }}
      onClick={() => console.log('clicked')}
    />
  );
}

function Child(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Active: {props.isActive ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Destructuring Props

```jsx
// Without destructuring
function User(props) {
  return <h1>{props.name}</h1>;
}

// With destructuring (preferred)
function User({ name, age, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}
```

### Default Props

```jsx
function Button({ text, color = 'blue', size = 'medium' }) {
  return (
    <button className={`btn btn-${color} btn-${size}`}>
      {text}
    </button>
  );
}

// Usage
<Button text="Click" />  // Uses defaults
<Button text="Click" color="red" size="large" />
```

### Props are Read-Only

```jsx
function Component(props) {
  // ❌ Wrong: Can't modify props
  props.name = 'New Name';

  // ✅ Correct: Use state for mutable data
  const [name, setName] = useState(props.name);
}
```

### Props.children

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  <h1>Title</h1>
  <p>Content goes here</p>
</Card>
```

### Prop Types (Optional Validation)

```jsx
import PropTypes from 'prop-types';

function User({ name, age, email }) {
  return <div>{name}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired
};
```

---

## State

**State** is mutable data managed within a component.

### useState Hook

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### State vs Props

| State | Props |
|-------|-------|
| Mutable | Immutable |
| Managed by component | Passed from parent |
| Can be changed with setState | Read-only |
| Private | Public |

### Multiple State Variables

```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} />
    </form>
  );
}
```

### State with Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (name) => {
    setUser({
      ...user,  // Spread existing properties
      name      // Update only name
    });
  };

  return (
    <input
      value={user.name}
      onChange={(e) => updateName(e.target.value)}
    />
  );
}
```

---

## Events

### Event Handling

```jsx
function Button() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Event Object

```jsx
function Input() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}
```

### Common Events

```jsx
function EventDemo() {
  return (
    <div>
      <button onClick={() => console.log('clicked')}>Click</button>
      <input onChange={(e) => console.log(e.target.value)} />
      <form onSubmit={(e) => e.preventDefault()}>Submit</form>
      <div onMouseEnter={() => console.log('mouse enter')}>Hover</div>
      <input onFocus={() => console.log('focused')} />
      <input onBlur={() => console.log('blurred')} />
      <input onKeyPress={(e) => console.log(e.key)} />
    </div>
  );
}
```

### Passing Arguments

```jsx
function List() {
  const items = ['A', 'B', 'C'];

  const handleClick = (item, index) => {
    console.log(`Clicked ${item} at ${index}`);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleClick(item, index)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

---

## Conditional Rendering

### if/else

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

### Ternary Operator

```jsx
function Status({ isOnline }) {
  return (
    <div>
      {isOnline ? <span>🟢 Online</span> : <span>🔴 Offline</span>}
    </div>
  );
}
```

### Logical AND (&&)

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      {user.isPremium && <span>⭐ Premium Member</span>}
      {user.isAdmin && <button>Admin Panel</button>}
    </div>
  );
}
```

### Multiple Conditions

```jsx
function Message({ status }) {
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error occurred</p>}
      {status === 'success' && <p>Success!</p>}
    </div>
  );
}
```

### Switch Statement

```jsx
function StatusMessage({ status }) {
  const getMessage = () => {
    switch (status) {
      case 'loading':
        return <p>Loading...</p>;
      case 'error':
        return <p>Error!</p>;
      case 'success':
        return <p>Success!</p>;
      default:
        return <p>Unknown status</p>;
    }
  };

  return <div>{getMessage()}</div>;
}
```

---

## Lists and Keys

### Rendering Lists

```jsx
function UserList() {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Why Keys are Important

Keys help React identify which items changed, added, or removed.

```jsx
// ❌ Wrong: Using index as key (avoid if list can reorder)
{users.map((user, index) => (
  <li key={index}>{user.name}</li>
))}

// ✅ Correct: Using unique ID
{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}
```

### Keys Must Be Unique Among Siblings

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build Project' }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## Forms

### Controlled Components

React controls the form data (recommended).

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Uncontrolled Components

DOM controls the form data (use refs).

```jsx
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" />
      <input ref={passwordRef} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Form with Multiple Inputs

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'male',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>
        <input
          name="agree"
          type="checkbox"
          checked={formData.agree}
          onChange={handleChange}
        />
        I agree to terms
      </label>

      <button type="submit">Register</button>
    </form>
  );
}
```

---

## Component Lifecycle

### Class Component Lifecycle

```jsx
class MyComponent extends React.Component {
  // 1. MOUNTING
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Initialize state, bind methods
  }

  componentDidMount() {
    // After component renders
    // Fetch data, add event listeners, subscriptions
  }

  // 2. UPDATING
  shouldComponentUpdate(nextProps, nextState) {
    // Return false to prevent re-render
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // After component re-renders
    // Fetch new data based on prop/state change
  }

  // 3. UNMOUNTING
  componentWillUnmount() {
    // Before component is removed
    // Cleanup: remove listeners, cancel requests
  }

  // 4. ERROR HANDLING
  componentDidCatch(error, info) {
    // Error boundary
    console.error(error, info);
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

### Functional Component Lifecycle (with Hooks)

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Component mounted/updated');

    // componentWillUnmount
    return () => {
      console.log('Cleanup');
    };
  }, [count]); // Dependency array

  return <div>{count}</div>;
}
```

---

## React 18 Features

### 1. Concurrent Rendering

React can interrupt rendering to handle high-priority updates.

```jsx
// High-priority: User input
<input onChange={handleChange} />

// Low-priority: Filtered results
<Results data={filtered} />
```

### 2. Automatic Batching

Multiple state updates are batched automatically (even in async).

```jsx
// React 17: Only batches in event handlers
// React 18: Batches everywhere
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only one re-render!
}, 1000);
```

### 3. Transitions

Mark updates as non-urgent.

```jsx
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value); // Urgent

    startTransition(() => {
      // Non-urgent: Won't block input
      setResults(filterResults(e.target.value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results />
    </>
  );
}
```

### 4. Suspense Improvements

```jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  );
}
```

---

## Interview Questions

### Q1: What is React?

**Answer:**
React is a JavaScript library for building user interfaces. Key features:
- Component-based architecture
- Virtual DOM for efficient updates
- Declarative syntax with JSX
- One-way data flow

---

### Q2: What is Virtual DOM?

**Answer:**
Virtual DOM is a lightweight JavaScript representation of the Real DOM. React creates a virtual DOM, compares it with the previous version (diffing), calculates minimal changes, and updates only what changed in the Real DOM (reconciliation). This makes updates very efficient.

---

### Q3: What is JSX?

**Answer:**
JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code in JavaScript. It's transpiled to `React.createElement()` calls.

```jsx
// JSX
const element = <h1>Hello</h1>;

// Compiles to
const element = React.createElement('h1', null, 'Hello');
```

---

### Q4: Props vs State?

**Answer:**

| Props | State |
|-------|-------|
| Read-only | Mutable |
| Passed from parent | Managed internally |
| Can't be modified | Changed with setState |
| Functional: `props.name` | Hook: `useState()` |

---

### Q5: Controlled vs Uncontrolled Components?

**Answer:**

**Controlled:** React controls form data via state
```jsx
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

**Uncontrolled:** DOM controls form data via ref
```jsx
const ref = useRef();
<input ref={ref} />
// Access: ref.current.value
```

---

### Q6: Why are keys important in lists?

**Answer:**
Keys help React identify which items changed, added, or removed. Without keys (or with index as key), React may:
- Update wrong elements
- Lose component state
- Have poor performance

Always use unique, stable IDs as keys.

---

### Q7: Functional vs Class Components?

**Answer:**

**Functional (Modern):**
- Simpler syntax
- Hooks for state and lifecycle
- Better performance
- Easier to test

**Class (Legacy):**
- More boilerplate
- Lifecycle methods
- `this` keyword confusion
- Being phased out

**Use functional components for new code.**

---

### Q8: What is React 18's Automatic Batching?

**Answer:**
React 18 automatically batches multiple state updates into one render, even in async operations, promises, and timeouts. In React 17, only updates in event handlers were batched.

```jsx
// React 18: One render
setTimeout(() => {
  setCount(1);
  setFlag(true);
}, 1000);
```

---

## 🎯 Quick Reference

```jsx
// Component
function MyComponent({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(initialValue);

  // Effect
  useEffect(() => {
    // Side effect
    return () => {}; // Cleanup
  }, [dependencies]);

  // Event handler
  const handleClick = () => {
    setState(newValue);
  };

  // Render
  return (
    <div onClick={handleClick}>
      {prop1} - {state}
      {condition && <Component />}
      {list.map(item => <Item key={item.id} />)}
    </div>
  );
}
```

---

**Next:** [React Hooks](../02-react-hooks/README.md)

---

**Happy Learning! 🚀**
