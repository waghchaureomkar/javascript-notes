# React Router - Complete Guide 🛣️

> **Master Client-Side Routing**
> React Router v6 - Latest version

**Interview Probability:** ⭐⭐⭐⭐

---

## 📚 Contents

1. [Setup](#setup)
2. [Basic Routing](#basic-routing)
3. [Dynamic Routes](#dynamic-routes)
4. [Nested Routes](#nested-routes)
5. [Navigation](#navigation)
6. [Hooks](#hooks)
7. [Protected Routes](#protected-routes)

---

## Setup

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Basic Routing

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* 404 */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Dynamic Routes

```jsx
<Routes>
  <Route path="/users/:id" element={<UserProfile />} />
  <Route path="/blog/:slug" element={<BlogPost />} />
</Routes>

// Access params
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```

---

## Nested Routes

```jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="posts" element={<Posts />} />
  </Route>
</Routes>

// Dashboard.jsx
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/posts">Posts</Link>
      </nav>

      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

---

## Navigation

### Link Component

```jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
<Link to="/users/123">User 123</Link>

// With state
<Link to="/about" state={{ from: 'home' }}>About</Link>

// Replace (don't add to history)
<Link to="/about" replace>About</Link>
```

### NavLink (Active Styling)

```jsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
  style={({ isActive }) => ({
    color: isActive ? 'red' : 'black'
  })}
>
  About
</NavLink>
```

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');

    // With state
    navigate('/about', { state: { from: 'home' } });

    // Go back
    navigate(-1);

    // Go forward
    navigate(1);

    // Replace
    navigate('/about', { replace: true });
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

---

## Hooks

### useParams

```jsx
// Route: /users/:id
function UserProfile() {
  const { id } = useParams();

  return <h1>User: {id}</h1>;
}
```

### useLocation

```jsx
import { useLocation } from 'react-router-dom';

function Component() {
  const location = useLocation();

  console.log(location.pathname); // "/about"
  console.log(location.search); // "?page=2"
  console.log(location.hash); // "#section"
  console.log(location.state); // { from: 'home' }

  return <div>Current path: {location.pathname}</div>;
}
```

### useSearchParams

```jsx
// URL: /search?q=react&sort=popular
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q'); // "react"
  const sort = searchParams.get('sort'); // "popular"

  const updateQuery = () => {
    setSearchParams({ q: 'vue', sort: 'latest' });
    // URL becomes: /search?q=vue&sort=latest
  };

  return (
    <div>
      <p>Query: {query}</p>
      <button onClick={updateQuery}>Update</button>
    </div>
  );
}
```

### useNavigate

```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## Protected Routes

### Method 1: Wrapper Component

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>
```

### Method 2: Layout Route

```jsx
function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Usage
<Routes>
  <Route element={<ProtectedLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

---

## Complete Example

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
}

function ProtectedLayout() {
  const user = useAuth(); // Your auth hook

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

---

## Interview Questions

### Q: Link vs NavLink?

**Answer:**
- **Link**: Basic navigation
- **NavLink**: Adds active class/style

```jsx
<Link to="/about">About</Link>

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

---

### Q: How to protect routes?

**Answer:**
Create wrapper component:

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return children;
}

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

### Q: How to pass state between routes?

**Answer:**
Use Link state or navigate:

```jsx
// Link
<Link to="/about" state={{ from: 'home' }}>About</Link>

// useNavigate
navigate('/about', { state: { from: 'home' } });

// Receive
const location = useLocation();
console.log(location.state.from); // 'home'
```

---

## 🎯 Quick Reference

```jsx
// Setup
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>

// Dynamic
<Route path="/users/:id" element={<User />} />

// Nested
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
</Route>

// Navigation
<Link to="/about">About</Link>
<NavLink to="/about" className={({ isActive }) => ...}>About</NavLink>

// Hooks
const { id } = useParams();
const location = useLocation();
const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

// Protected
function Protected({ children }) {
  const user = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}
```

---

**Next:** [React Forms](../07-react-forms/README.md)
**Previous:** [React State Management](../05-react-state-management/README.md)

---

**Happy Learning! 🚀**
