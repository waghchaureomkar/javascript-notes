# DOM & Browser APIs - Complete Guide

> **Make Your Websites Interactive**
> Master the Document Object Model and Browser APIs

---

## Table of Contents

1. [DOM Basics](#dom-basics)
2. [Selecting Elements](#selecting-elements)
3. [Manipulating Elements](#manipulating-elements)
4. [Events](#events)
5. [Creating & Removing Elements](#creating--removing-elements)
6. [LocalStorage & SessionStorage](#localstorage--sessionstorage)
7. [Fetch API](#fetch-api)
8. [CORS & Same-Origin Policy](#cors--same-origin-policy) 🔥
9. [Browser APIs](#browser-apis)
10. [Memory Leaks & Garbage Collection](#memory-leaks--garbage-collection) 🔥
11. [Best Practices](#best-practices)
12. [Interview Questions](#interview-questions)

---

## DOM Basics

### What is the DOM?

The **Document Object Model** is a programming interface that represents HTML as a tree of objects.

```
document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── h1
          ├── div
          └── p
```

### The Document Object

```javascript
console.log(document.title);          // Page title
console.log(document.URL);            // Current URL
console.log(document.domain);         // Domain
console.log(document.body);           // <body> element
console.log(document.head);           // <head> element
console.log(document.documentElement); // <html> element
```

---

## Selecting Elements

### getElementById()

```javascript
const header = document.getElementById('main-header');
console.log(header); // <div id="main-header">...</div>
```

### getElementsByClassName()

Returns **HTMLCollection** (live)

```javascript
const items = document.getElementsByClassName('item');
console.log(items.length); // Number of elements

// Convert to array
const itemsArray = Array.from(items);
```

### getElementsByTagName()

```javascript
const paragraphs = document.getElementsByTagName('p');
const allDivs = document.getElementsByTagName('div');
```

### querySelector() ⭐ Modern

Returns **first match**

```javascript
// By ID
const header = document.querySelector('#main-header');

// By class
const item = document.querySelector('.item');

// By tag
const paragraph = document.querySelector('p');

// Complex selector
const link = document.querySelector('nav ul li a');

// Attribute selector
const input = document.querySelector('input[type="text"]');
```

### querySelectorAll() ⭐ Modern

Returns **NodeList** (static)

```javascript
const allItems = document.querySelectorAll('.item');

// Convert to array
const itemsArray = Array.from(allItems);
// or
const itemsArray = [...allItems];

// Loop
allItems.forEach(item => {
    console.log(item);
});
```

### Comparison

| Method | Returns | Live? | Modern? |
|--------|---------|-------|---------|
| getElementById | Element | - | No |
| getElementsByClassName | HTMLCollection | Yes | No |
| getElementsByTagName | HTMLCollection | Yes | No |
| querySelector | Element | - | ✅ Yes |
| querySelectorAll | NodeList | No | ✅ Yes |

**Recommendation:** Use `querySelector` and `querySelectorAll`

---

## Manipulating Elements

### Changing Content

```javascript
const element = document.querySelector('#myDiv');

// innerHTML (parses HTML)
element.innerHTML = '<strong>Bold text</strong>';

// textContent (plain text only)
element.textContent = 'Plain text';

// innerText (respects CSS styling)
element.innerText = 'Visible text';
```

**Security Warning:**
```javascript
// ❌ Dangerous (XSS vulnerability)
element.innerHTML = userInput;

// ✅ Safe
element.textContent = userInput;
```

### Changing Attributes

```javascript
const img = document.querySelector('img');

// Get attribute
console.log(img.getAttribute('src'));

// Set attribute
img.setAttribute('src', 'new-image.jpg');
img.setAttribute('alt', 'New image');

// Remove attribute
img.removeAttribute('alt');

// Direct property access
img.src = 'another-image.jpg';
img.alt = 'Another image';

// Check if attribute exists
if (img.hasAttribute('src')) {
    console.log('Has src attribute');
}
```

### Changing Styles

```javascript
const box = document.querySelector('.box');

// Inline styles
box.style.backgroundColor = 'red';
box.style.color = 'white';
box.style.padding = '20px';

// Multiple styles
Object.assign(box.style, {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '10px'
});

// Get computed style
const computedStyle = window.getComputedStyle(box);
console.log(computedStyle.backgroundColor);
```

### Changing Classes

```javascript
const element = document.querySelector('.box');

// Add class
element.classList.add('active');
element.classList.add('highlight', 'border');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active'); // Add if not present, remove if present

// Check if has class
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

---

## Events

### Adding Event Listeners

```javascript
const button = document.querySelector('#myButton');

// Method 1: addEventListener (recommended)
button.addEventListener('click', function(e) {
    console.log('Button clicked!');
    console.log(e.target); // Element that triggered event
});

// Method 2: Arrow function
button.addEventListener('click', (e) => {
    console.log('Clicked!');
});

// Method 3: Named function
function handleClick(e) {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);

// Remove event listener
button.removeEventListener('click', handleClick);
```

### Common Events

```javascript
// Mouse events
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mousedown', handler);
element.addEventListener('mouseup', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('mousemove', handler);

// Keyboard events
input.addEventListener('keydown', handler);
input.addEventListener('keyup', handler);
input.addEventListener('keypress', handler); // Deprecated

// Form events
form.addEventListener('submit', handler);
input.addEventListener('change', handler);
input.addEventListener('input', handler);
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);

// Window events
window.addEventListener('load', handler);
window.addEventListener('DOMContentLoaded', handler);
window.addEventListener('resize', handler);
window.addEventListener('scroll', handler);
```

### Event Object

```javascript
button.addEventListener('click', (e) => {
    console.log(e.type);        // "click"
    console.log(e.target);      // Element clicked
    console.log(e.currentTarget); // Element with listener
    console.log(e.clientX);     // Mouse X position
    console.log(e.clientY);     // Mouse Y position

    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
});
```

### Event Delegation

Attach listener to **parent** instead of each child.

```javascript
// ❌ Bad: Adding listener to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleClick);
});

// ✅ Good: Event delegation
document.querySelector('.list').addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        handleClick(e);
    }
});
```

### Event Bubbling & Capturing

```javascript
// Bubbling (default): child → parent
element.addEventListener('click', handler);

// Capturing: parent → child
element.addEventListener('click', handler, true);

// Stop propagation
element.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop bubbling
});
```

---

## Creating & Removing Elements

### Creating Elements

```javascript
// Create element
const div = document.createElement('div');

// Set content
div.textContent = 'Hello World';
div.innerHTML = '<strong>Bold</strong>';

// Set attributes
div.id = 'myDiv';
div.className = 'box active';
div.setAttribute('data-id', '123');

// Set styles
div.style.color = 'blue';

// Add classes
div.classList.add('highlight');

// Append to DOM
document.body.appendChild(div);
```

### Inserting Elements

```javascript
const parent = document.querySelector('.container');
const newElement = document.createElement('div');

// Append (at end)
parent.appendChild(newElement);
parent.append(newElement, 'text', anotherElement);

// Prepend (at start)
parent.prepend(newElement);

// Insert before
parent.insertBefore(newElement, parent.firstChild);

// Insert adjacent (modern)
element.insertAdjacentHTML('beforebegin', '<div>Before</div>');
element.insertAdjacentHTML('afterbegin', '<div>First child</div>');
element.insertAdjacentHTML('beforeend', '<div>Last child</div>');
element.insertAdjacentHTML('afterend', '<div>After</div>');
```

### Removing Elements

```javascript
const element = document.querySelector('.item');

// Modern way
element.remove();

// Old way
element.parentElement.removeChild(element);

// Remove all children
parent.innerHTML = '';

// Remove specific children
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
```

### Cloning Elements

```javascript
const original = document.querySelector('.original');

// Shallow clone (no children)
const clone = original.cloneNode(false);

// Deep clone (with children)
const deepClone = original.cloneNode(true);

document.body.appendChild(deepClone);
```

---

## LocalStorage & SessionStorage

### LocalStorage

Data persists **forever** (until manually cleared).

```javascript
// Set item
localStorage.setItem('username', 'john');
localStorage.setItem('theme', 'dark');

// Get item
const username = localStorage.getItem('username');
console.log(username); // "john"

// Remove item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem('theme')) {
    console.log('Theme is set');
}
```

### Storing Objects

```javascript
const user = {
    name: 'John',
    age: 25,
    email: 'john@example.com'
};

// Store (must stringify)
localStorage.setItem('user', JSON.stringify(user));

// Retrieve (must parse)
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // "John"
```

### SessionStorage

Data persists **only for the session** (until tab/browser closes).

```javascript
// Same API as localStorage
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
sessionStorage.removeItem('token');
sessionStorage.clear();
```

### Practical Example: Dark Mode

```javascript
// Save preference
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
});
```

---

## Fetch API

### Basic GET Request

```javascript
fetch('https://api.example.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Async/Await Version

```javascript
async function fetchUsers() {
    try {
        const response = await fetch('https://api.example.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### POST Request

```javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data;
}

// Usage
createUser({
    name: 'John',
    email: 'john@example.com'
});
```

### All HTTP Methods

```javascript
// GET
fetch(url);

// POST
fetch(url, { method: 'POST', body: JSON.stringify(data) });

// PUT
fetch(url, { method: 'PUT', body: JSON.stringify(data) });

// PATCH
fetch(url, { method: 'PATCH', body: JSON.stringify(data) });

// DELETE
fetch(url, { method: 'DELETE' });
```

### Response Methods

```javascript
const response = await fetch(url);

// Parse JSON
const json = await response.json();

// Parse text
const text = await response.text();

// Parse blob (for images, files)
const blob = await response.blob();

// Parse form data
const formData = await response.formData();
```

---

## CORS & Same-Origin Policy

> **🔥 Critical Security Concept**
> Essential interview topic for web security and API integration!

### Same-Origin Policy (SOP)

The **Same-Origin Policy** is a security mechanism that restricts how documents or scripts from one origin can interact with resources from another origin.

#### What is an "Origin"?

An origin consists of three parts:
1. **Protocol** (http:// or https://)
2. **Domain** (example.com)
3. **Port** (:80, :443, :3000, etc.)

**Same Origin Examples:**

```
Origin: https://example.com:443

✅ Same Origin:
- https://example.com:443/page1
- https://example.com:443/api/users
- https://example.com:443/about

❌ Different Origin:
- http://example.com:443      (different protocol)
- https://api.example.com:443   (different subdomain)
- https://example.com:3000     (different port)
- https://example.org:443      (different domain)
```

#### What Does SOP Block?

```javascript
// Your site: https://mysite.com

// ❌ BLOCKED: Reading response from different origin
fetch('https://api.otherdomain.com/data')
    .then(res => res.json())
    .then(data => console.log(data));
// Error: CORS policy blocked

// ✅ ALLOWED: Same origin
fetch('https://mysite.com/api/data')
    .then(res => res.json())
    .then(data => console.log(data));
```

#### Why SOP Exists?

**Security Protection:**
- Prevents malicious site from reading sensitive data
- Stops unauthorized API access
- Protects cookies and authentication tokens

**Example Attack Without SOP:**

```javascript
// Malicious site: evil.com

// Without SOP, this would work:
fetch('https://bank.com/account')
    .then(res => res.json())
    .then(data => {
        // Steal user's bank account data!
        sendToEvilServer(data);
    });
```

---

### CORS (Cross-Origin Resource Sharing)

**CORS** is a mechanism that allows servers to specify who can access their resources, relaxing the Same-Origin Policy in a controlled way.

#### How CORS Works

```
Browser (mysite.com)     →     Server (api.otherdomain.com)
    |
    |  1. Preflight Request (OPTIONS)
    |     Headers:
    |     - Origin: https://mysite.com
    |     - Access-Control-Request-Method: POST
    |--------------------------------→
    |
    |  2. Server Response
    |     Headers:
    |     - Access-Control-Allow-Origin: https://mysite.com
    |     - Access-Control-Allow-Methods: POST, GET
    |←--------------------------------
    |
    |  3. Actual Request (POST)
    |--------------------------------→
    |
    |  4. Response with Data
    |←--------------------------------
```

#### CORS Headers (Server-Side)

**Basic CORS Response:**

```javascript
// Server (Node.js/Express example)
app.use((req, res, next) => {
    // Allow specific origin
    res.header('Access-Control-Allow-Origin', 'https://mysite.com');

    // Or allow all origins (not recommended for production)
    // res.header('Access-Control-Allow-Origin', '*');

    // Allow specific methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Allow specific headers
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Allow credentials (cookies)
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
});
```

#### Common CORS Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | Which origins can access | `https://mysite.com` or `*` |
| `Access-Control-Allow-Methods` | Allowed HTTP methods | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Allowed request headers | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Allow cookies/auth | `true` |
| `Access-Control-Max-Age` | Preflight cache time | `86400` (24 hours) |

#### Simple vs Preflight Requests

**Simple Request (No Preflight):**
- Methods: `GET`, `POST`, `HEAD`
- Headers: `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` (limited values)

```javascript
// Simple request - no preflight
fetch('https://api.example.com/data', {
    method: 'GET'
});
```

**Preflight Request (OPTIONS):**
- Methods: `PUT`, `DELETE`, `PATCH`, etc.
- Custom headers
- `Content-Type: application/json`

```javascript
// Triggers preflight
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ name: 'John' })
});
```

#### CORS Errors

**Common Error:**

```
Access to fetch at 'https://api.example.com/data' from origin 'https://mysite.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

**Solutions:**

1. **Server-side** (Correct way):
```javascript
// Server adds CORS headers
res.header('Access-Control-Allow-Origin', 'https://mysite.com');
```

2. **Development Proxy** (Local development):
```javascript
// package.json (React)
{
  "proxy": "https://api.example.com"
}
```

3. **CORS Proxy** (Last resort, not for production):
```javascript
fetch('https://cors-anywhere.herokuapp.com/https://api.example.com/data')
```

#### CORS with Credentials

```javascript
// Client-side
fetch('https://api.example.com/data', {
    method: 'GET',
    credentials: 'include'  // Send cookies
});

// Server-side
res.header('Access-Control-Allow-Origin', 'https://mysite.com'); // Cannot be *
res.header('Access-Control-Allow-Credentials', 'true');
```

#### Interview Questions

**Q1: What's the difference between Same-Origin Policy and CORS?**

**A:**
- **Same-Origin Policy** is a browser security restriction
- **CORS** is a mechanism to relax SOP in a controlled way
- SOP blocks by default, CORS allows specific access

**Q2: Why do some requests trigger preflight and others don't?**

**A:**
- **Simple requests** (GET, POST with basic headers) don't need preflight
- **Complex requests** (custom headers, PUT/DELETE, JSON) need preflight to check permissions

**Q3: Can you bypass CORS from the client side?**

**A:**
- ❌ No, CORS is enforced by the **browser**
- ✅ Server must set CORS headers
- CORS proxies work but not recommended for production

---

## Browser APIs

### Geolocation API

```javascript
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        // Error callback
        (error) => {
            console.error('Error:', error.message);
        }
    );
}
```

### Navigator API

```javascript
// Browser info
console.log(navigator.userAgent);
console.log(navigator.language);
console.log(navigator.onLine); // Online status

// Check online/offline
window.addEventListener('online', () => {
    console.log('You are online');
});

window.addEventListener('offline', () => {
    console.log('You are offline');
});
```

### Window API

```javascript
// Window size
console.log(window.innerWidth);
console.log(window.innerHeight);

// Scroll position
console.log(window.scrollY);
console.log(window.scrollX);

// Scroll to position
window.scrollTo(0, 500);
window.scrollTo({ top: 500, behavior: 'smooth' });

// Open new window
window.open('https://example.com', '_blank');

// Alert/Confirm/Prompt
alert('Message');
const confirmed = confirm('Are you sure?');
const input = prompt('Enter your name:');
```

### Timers

```javascript
// setTimeout: Run once after delay
const timeoutId = setTimeout(() => {
    console.log('Executed after 2 seconds');
}, 2000);

// Clear timeout
clearTimeout(timeoutId);

// setInterval: Run repeatedly
const intervalId = setInterval(() => {
    console.log('Every second');
}, 1000);

// Clear interval
clearInterval(intervalId);
```

### History API

```javascript
// Navigate
history.back();    // Go back
history.forward(); // Go forward
history.go(-2);    // Go back 2 pages

// Add to history
history.pushState({ page: 1 }, 'title', '/page1');

// Replace current history
history.replaceState({ page: 2 }, 'title', '/page2');

// Listen to history changes
window.addEventListener('popstate', (e) => {
    console.log(e.state);
});
```

---

## Memory Leaks & Garbage Collection

> **🔥 Important Performance Topic**
> Understanding memory management prevents performance issues!

### What is Garbage Collection?

**Garbage Collection (GC)** is the automatic process of freeing memory that's no longer needed.

JavaScript uses **Mark-and-Sweep** algorithm:
1. **Mark**: Identify all reachable objects from roots (global variables, current function stack)
2. **Sweep**: Remove objects that aren't marked (unreachable)

```javascript
let user = { name: "John" };  // Object created in heap

user = null;  // No more references

// Garbage Collector will automatically free memory
// because object is no longer reachable
```

### What is a Memory Leak?

A **memory leak** occurs when memory that's no longer needed is **NOT released**, causing:
- ❌ Increased memory usage
- ❌ Slower performance
- ❌ Browser crashes
- ❌ Application freezes

---

### Common Memory Leak Patterns

#### 1. Forgotten Event Listeners

**Problem:**

```javascript
// ❌ Memory Leak
function setupButton() {
    const button = document.getElementById('myButton');

    button.addEventListener('click', () => {
        console.log('Clicked!');
    });

    // Button removed from DOM but listener still in memory!
    button.remove();
}

setupButton();
// Listener still exists, causing memory leak
```

**Solution:**

```javascript
// ✅ Remove listener before removing element
function setupButton() {
    const button = document.getElementById('myButton');

    const handleClick = () => {
        console.log('Clicked!');
    };

    button.addEventListener('click', handleClick);

    // Clean up before removing
    button.removeEventListener('click', handleClick);
    button.remove();
}

// Or use AbortController (modern approach)
const controller = new AbortController();

button.addEventListener('click', () => {
    console.log('Clicked!');
}, { signal: controller.signal });

// Cleanup
controller.abort();  // Removes all listeners with this signal
button.remove();
```

#### 2. Forgotten Timers

**Problem:**

```javascript
// ❌ Memory Leak
function startPolling() {
    setInterval(() => {
        fetch('/api/data').then(/* ... */);
    }, 1000);
}

startPolling();

// navigateAway();  ← Interval keeps running!
// Timer continues to run and make requests
```

**Solution:**

```javascript
// ✅ Clear timers when done
function startPolling() {
    const intervalId = setInterval(() => {
        fetch('/api/data').then(/* ... */);
    }, 1000);

    // Return cleanup function
    return () => clearInterval(intervalId);
}

const cleanup = startPolling();

// When leaving page or component
cleanup();  // Clear the interval
```

#### 3. Closures Holding References

**Problem:**

```javascript
// ❌ Memory Leak
function createHeavyObject() {
    const hugeArray = new Array(1000000).fill('data');

    return function() {
        // Even though we don't use hugeArray,
        // closure keeps it in memory!
        console.log('Hello');
    };
}

const fn = createHeavyObject();
// hugeArray is still in memory because of closure
```

**Solution:**

```javascript
// ✅ Don't capture unnecessary variables
function createLightObject() {
    const hugeArray = new Array(1000000).fill('data');

    // Process data
    const result = hugeArray.length;

    // Return function that doesn't reference hugeArray
    return function() {
        console.log(result);  // Only captures result, not hugeArray
    };
}

const fn = createLightObject();
// hugeArray can be garbage collected
```

#### 4. Detached DOM Nodes

**Problem:**

```javascript
// ❌ Memory Leak
let elements = [];

function addElement() {
    const div = document.createElement('div');
    div.textContent = 'Content';
    document.body.appendChild(div);

    elements.push(div);  // Store reference
}

addElement();

// Remove from DOM but reference still exists
document.body.innerHTML = '';

// elements array still holds reference to detached DOM node!
console.log(elements);  // Still in memory
```

**Solution:**

```javascript
// ✅ Clear references when removing from DOM
let elements = [];

function addElement() {
    const div = document.createElement('div');
    div.textContent = 'Content';
    document.body.appendChild(div);

    elements.push(div);
}

function cleanup() {
    document.body.innerHTML = '';
    elements = [];  // Clear references
}
```

#### 5. Global Variables

**Problem:**

```javascript
// ❌ Memory Leak
function processData() {
    // Forgot 'let/const' - creates global variable!
    largeData = new Array(1000000).fill('data');

    // Process data...
}

processData();

// largeData is now global and never garbage collected
```

**Solution:**

```javascript
// ✅ Always use let/const
function processData() {
    const largeData = new Array(1000000).fill('data');

    // Process data...

    // largeData is automatically cleaned up after function
}

processData();
```

#### 6. Circular References (Old IE Issue)

**Problem (rare in modern browsers):**

```javascript
// ❌ Old IE memory leak
function createCircular() {
    const obj1 = {};
    const obj2 = {};

    obj1.ref = obj2;
    obj2.ref = obj1;

    // In old browsers, this could cause leaks
    // Modern browsers handle this fine
}
```

---

### Detecting Memory Leaks

#### Chrome DevTools Memory Profiler

**Steps:**
1. Open Chrome DevTools (F12)
2. Go to **Memory** tab
3. Take **Heap Snapshot**
4. Perform actions in your app
5. Take another **Heap Snapshot**
6. Compare snapshots to see memory growth

**Look for:**
- Increasing memory usage over time
- Detached DOM nodes
- Large arrays/objects not being released

#### Performance Monitor

```javascript
// Monitor memory in code
console.log(performance.memory.usedJSHeapSize);

// Check periodically
setInterval(() => {
    const mb = performance.memory.usedJSHeapSize / 1048576;
    console.log(`Memory used: ${mb.toFixed(2)} MB`);
}, 5000);
```

---

### Best Practices to Avoid Memory Leaks

#### React/Vue Components

```javascript
// React example
useEffect(() => {
    // Setup
    const timer = setInterval(() => {
        console.log('Tick');
    }, 1000);

    // ✅ Cleanup
    return () => {
        clearInterval(timer);
    };
}, []);
```

#### Event Listener Cleanup

```javascript
// ✅ Always remove listeners
class MyComponent {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
    }

    mount() {
        button.addEventListener('click', this.handleClick);
    }

    unmount() {
        button.removeEventListener('click', this.handleClick);
    }

    handleClick() {
        console.log('Clicked');
    }
}
```

#### Use WeakMap and WeakSet

```javascript
// ✅ WeakMap allows garbage collection
const cache = new WeakMap();

let user = { name: "John" };
cache.set(user, "some data");

user = null;
// user object can be garbage collected
// WeakMap doesn't prevent it
```

---

### Interview Questions

**Q1: What causes memory leaks in JavaScript?**

**A:**
- Forgotten event listeners
- Forgotten timers (setTimeout/setInterval)
- Closures holding unnecessary references
- Detached DOM nodes
- Global variables
- Circular references (old browsers)

**Q2: How do you detect memory leaks?**

**A:**
- Chrome DevTools Memory Profiler
- Heap Snapshots comparison
- Performance.memory API
- Monitor memory usage over time

**Q3: What's the difference between WeakMap and Map?**

**A:**
- **Map**: Strong references, prevents garbage collection
- **WeakMap**: Weak references, allows garbage collection
- WeakMap keys must be objects
- WeakMap is not iterable

**Q4: How does garbage collection work?**

**A:**
- Uses **Mark-and-Sweep** algorithm
- Marks all reachable objects from roots
- Sweeps (deletes) unmarked objects
- Automatic process in JavaScript

---

## Best Practices

### Performance

```javascript
// ✅ Cache DOM queries
const element = document.querySelector('.item');
// Use element multiple times

// ❌ Don't query repeatedly
document.querySelector('.item').style.color = 'red';
document.querySelector('.item').style.background = 'blue';

// ✅ Batch DOM changes
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
list.appendChild(fragment);

// ✅ Debounce scroll/resize
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

window.addEventListener('resize', debounce(() => {
    console.log('Resized');
}, 250));
```

### Security

```javascript
// ✅ Sanitize user input
element.textContent = userInput; // Safe

// ❌ Never use with user input
element.innerHTML = userInput; // XSS vulnerability

// ✅ Validate data
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## Interview Questions

### Q1: What's the difference between innerHTML and textContent?

**A:**
- `innerHTML`: Parses HTML, can cause XSS
- `textContent`: Plain text only, safe

### Q2: What is event delegation?

**A:** Adding event listener to parent instead of each child, using event bubbling.

### Q3: Explain localStorage vs sessionStorage

**A:**
- `localStorage`: Persists forever
- `sessionStorage`: Cleared when tab/browser closes

### Q4: What's the difference between addEventListener and onclick?

**A:**
- `addEventListener`: Can attach multiple handlers
- `onclick`: Only one handler, older syntax

### Q5: How to prevent default form submission?

**A:**
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
```

---

## Practice Projects

1. **Todo List** with localStorage
2. **Dark Mode Toggle** with persistence
3. **Weather App** using Fetch API
4. **Infinite Scroll** with pagination
5. **Form Validation** with real-time feedback

---

## Next Steps

✅ Complete: DOM & Browser APIs
⬜ Next: [Data Structures](../05-data-structures/README.md)
⬜ Build: Interactive web applications

---

**Now you can make websites truly interactive!** 🎨
