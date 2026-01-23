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
8. [Browser APIs](#browser-apis)
9. [Best Practices](#best-practices)
10. [Interview Questions](#interview-questions)

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
