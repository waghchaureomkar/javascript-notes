/**
 * useState Hook - Practical Examples
 *
 * This file contains working examples of useState hook
 * Copy these into your React app to see them in action
 */

import React, { useState } from 'react';

// ============================================
// Example 1: Simple Counter
// ============================================

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count * 2)}>Double</button>
    </div>
  );
}

// ============================================
// Example 2: Form with Multiple Inputs
// ============================================

export function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>User Registration</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="UK">UK</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

// ============================================
// Example 3: Todo List
// ============================================

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todo-list">
      <h2>Todo List ({todos.length} items)</h2>

      <div className="todo-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Enter todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button onClick={clearCompleted}>Clear Completed</button>
      )}
    </div>
  );
}

// ============================================
// Example 4: Toggle Switch
// ============================================

export function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="toggle-switch">
      <h2>Light Switch</h2>
      <div style={{
        width: '60px',
        height: '30px',
        backgroundColor: isOn ? '#4CAF50' : '#ccc',
        borderRadius: '15px',
        cursor: 'pointer',
        position: 'relative'
      }}
        onClick={() => setIsOn(!isOn)}
      >
        <div style={{
          width: '26px',
          height: '26px',
          backgroundColor: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: isOn ? '32px' : '2px',
          transition: 'left 0.3s'
        }} />
      </div>
      <p>The light is {isOn ? 'ON' : 'OFF'}</p>
    </div>
  );
}

// ============================================
// Example 5: Array Operations
// ============================================

export function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      <div className="products">
        <h3>Available Products</h3>
        {products.map(product => (
          <div key={product.id} className="product">
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h3>Cart ({cart.length} items)</h3>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price} x {item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
        {cart.length > 0 && (
          <div className="cart-total">
            <h4>Total: ${total}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Example 6: Lazy Initialization
// ============================================

function expensiveComputation() {
  console.log('Running expensive computation...');
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
}

export function LazyInitialization() {
  // Bad: Runs on every render
  // const [value, setValue] = useState(expensiveComputation());

  // Good: Runs only once
  const [value, setValue] = useState(() => expensiveComputation());

  console.log('Component rendered');

  return (
    <div>
      <h2>Lazy Initialization</h2>
      <p>Value: {value}</p>
      <button onClick={() => setValue(v => v + 1)}>Increment</button>
      <p>Check console - expensive computation runs only once!</p>
    </div>
  );
}

// ============================================
// Example 7: Functional Updates (Avoiding Stale Closures)
// ============================================

export function FunctionalUpdate() {
  const [count, setCount] = useState(0);

  const incrementBad = () => {
    // This will only increment by 1, not 3
    // Because all three setCount use the same 'count' value
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const incrementGood = () => {
    // This correctly increments by 3
    // Because each uses the latest state
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <h2>Functional Updates</h2>
      <p>Count: {count}</p>
      <button onClick={incrementBad}>Increment Bad (adds 1)</button>
      <button onClick={incrementGood}>Increment Good (adds 3)</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ============================================
// Example 8: Complex State Management
// ============================================

export function ComplexState() {
  const [state, setState] = useState({
    user: {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      }
    },
    settings: {
      theme: 'light',
      notifications: true
    }
  });

  const updateName = (name) => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        name
      }
    }));
  };

  const updateCity = (city) => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        address: {
          ...prev.user.address,
          city
        }
      }
    }));
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === 'light' ? 'dark' : 'light'
      }
    }));
  };

  return (
    <div>
      <h2>Complex State</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <input
        value={state.user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={state.user.address.city}
        onChange={(e) => updateCity(e.target.value)}
        placeholder="City"
      />

      <button onClick={toggleTheme}>
        Toggle Theme (Current: {state.settings.theme})
      </button>
    </div>
  );
}

// ============================================
// Main App to Render All Examples
// ============================================

export default function App() {
  const [currentExample, setCurrentExample] = useState('counter');

  const examples = {
    counter: <Counter />,
    form: <UserForm />,
    todo: <TodoList />,
    toggle: <ToggleSwitch />,
    cart: <ShoppingCart />,
    lazy: <LazyInitialization />,
    functional: <FunctionalUpdate />,
    complex: <ComplexState />
  };

  return (
    <div className="app">
      <h1>useState Examples</h1>

      <nav>
        <button onClick={() => setCurrentExample('counter')}>Counter</button>
        <button onClick={() => setCurrentExample('form')}>Form</button>
        <button onClick={() => setCurrentExample('todo')}>Todo</button>
        <button onClick={() => setCurrentExample('toggle')}>Toggle</button>
        <button onClick={() => setCurrentExample('cart')}>Cart</button>
        <button onClick={() => setCurrentExample('lazy')}>Lazy Init</button>
        <button onClick={() => setCurrentExample('functional')}>Functional Update</button>
        <button onClick={() => setCurrentExample('complex')}>Complex State</button>
      </nav>

      <div className="example-container">
        {examples[currentExample]}
      </div>
    </div>
  );
}
