# Debouncing & Throttling 🔥🔥🔥

> **Most Asked Performance Optimization Pattern**
> Control function execution rate to improve performance

---

## Table of Contents

1. [The Problem](#the-problem)
2. [Debouncing](#debouncing)
3. [Throttling](#throttling)
4. [Comparison](#debouncing-vs-throttling)
5. [Implementations](#implementations)
6. [Real-World Examples](#real-world-examples)
7. [Interview Questions](#interview-questions)

---

## The Problem

### Expensive Operations on Frequent Events

```javascript
// ❌ Problem: Function called TOO MANY TIMES
window.addEventListener('resize', () => {
    console.log('Window resized');
    // Expensive operation: recalculate layout
    calculateLayout();
});

// Result: Function called 100+ times per second during resize!
// Performance: Browser becomes laggy
```

**Common Scenarios:**
- 🔍 **Search**: API call on every keystroke
- 📏 **Resize**: Layout recalculation on every pixel change
- 📜 **Scroll**: Loading more data on every scroll event
- 🖱️ **Mouse Move**: Complex calculations on every pixel moved
- 💾 **Auto-save**: Saving on every character typed

**Solution:** Use **Debouncing** or **Throttling** to control execution rate!

---

## Debouncing

### What is Debouncing?

**Debouncing** ensures a function is **only called after a delay** and **resets the timer** on each call.

**Simple Explanation:**
> "Wait for the user to stop doing something, then execute."

### Visual Representation

```
User Events:     ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓         (stops typing)
Time:           |---|---|---|---|---|---|
Debounced Call:                         ↓  (called once after delay)
```

### Basic Implementation

```javascript
function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        // Clear previous timer
        clearTimeout(timeoutId);

        // Set new timer
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
```

### How It Works

```javascript
const debouncedSearch = debounce(search, 500);

// User types: "J"
debouncedSearch('J');    // Timer starts: 500ms

// User types: "o" (after 100ms)
debouncedSearch('Jo');   // Previous timer cleared, new timer: 500ms

// User types: "h" (after 100ms)
debouncedSearch('Joh');  // Previous timer cleared, new timer: 500ms

// User types: "n" (after 100ms)
debouncedSearch('John'); // Previous timer cleared, new timer: 500ms

// User stops typing
// After 500ms: search('John') is finally called!
```

### Use Cases

#### 1. Search Autocomplete

```javascript
const searchInput = document.getElementById('search');

function searchAPI(query) {
    console.log('Searching for:', query);
    fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => console.log(data));
}

// Without debounce: API called on EVERY keystroke
// With debounce: API called only after user stops typing
const debouncedSearch = debounce(searchAPI, 500);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

**Benefit:**
- User types "JavaScript" (10 characters)
- **Without debounce:** 10 API calls
- **With debounce:** 1 API call
- **Savings:** 90% fewer API calls!

#### 2. Window Resize

```javascript
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`Window: ${width}x${height}`);
    // Expensive layout recalculation
    recalculateLayout();
}

// Without debounce: Called 100+ times during resize
// With debounce: Called once after resize ends
const debouncedResize = debounce(handleResize, 250);

window.addEventListener('resize', debouncedResize);
```

#### 3. Form Validation

```javascript
function validateForm(formData) {
    // Expensive validation logic
    console.log('Validating form...');
}

const debouncedValidate = debounce(validateForm, 500);

form.addEventListener('input', (e) => {
    debouncedValidate(new FormData(form));
});
```

---

## Throttling

### What is Throttling?

**Throttling** ensures a function is called **at most once per interval**, regardless of how many times it's triggered.

**Simple Explanation:**
> "Execute at regular intervals, no matter how many times called."

### Visual Representation

```
User Events:     ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
Time:           |---|---|---|---|---|---|
Throttled Call:     ↓       ↓       ↓     (called every interval)
```

### Basic Implementation

```javascript
function throttle(func, limit) {
    let inThrottle;

    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}
```

### How It Works

```javascript
const throttledScroll = throttle(handleScroll, 1000);

// User scrolls continuously:
throttledScroll(); // Called (t = 0ms)
throttledScroll(); // Ignored (t = 100ms)
throttledScroll(); // Ignored (t = 300ms)
throttledScroll(); // Ignored (t = 500ms)
throttledScroll(); // Ignored (t = 800ms)
throttledScroll(); // Called (t = 1000ms)
throttledScroll(); // Ignored (t = 1200ms)
throttledScroll(); // Called (t = 2000ms)
```

### Use Cases

#### 1. Infinite Scroll

```javascript
function loadMoreContent() {
    console.log('Loading more content...');
    fetch('/api/posts?page=' + currentPage)
        .then(res => res.json())
        .then(data => appendPosts(data));
}

// Without throttle: Called many times per second while scrolling
// With throttle: Called at most once per second
const throttledLoadMore = throttle(loadMoreContent, 1000);

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
        throttledLoadMore();
    }
});
```

#### 2. Button Click Prevention

```javascript
function submitForm(data) {
    console.log('Submitting form...');
    fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

// Prevent rapid clicking
const throttledSubmit = throttle(submitForm, 2000);

submitButton.addEventListener('click', () => {
    throttledSubmit(formData);
});
```

#### 3. Mouse Move Tracking

```javascript
function trackMousePosition(e) {
    console.log(`Mouse: ${e.clientX}, ${e.clientY}`);
    // Send analytics data
    sendAnalytics({ x: e.clientX, y: e.clientY });
}

// Without throttle: Called 100+ times per second
// With throttle: Called at most 10 times per second
const throttledMouseMove = throttle(trackMousePosition, 100);

document.addEventListener('mousemove', throttledMouseMove);
```

---

## Debouncing vs Throttling

### Key Differences

| Aspect | Debouncing | Throttling |
|--------|------------|------------|
| **Execution** | After delay, resets timer | At regular intervals |
| **Trigger** | When events stop | During continuous events |
| **Calls** | Once after inactivity | Multiple times at intervals |
| **Best For** | Search, resize, validation | Scroll, mouse move, resize |

### Visual Comparison

```
Events:         ↓ ↓ ↓ ↓ ↓ ↓ ↓        (stops)
                |---|---|---|---|---|---|

Debounce:                           ↓  (once, after delay)

Throttle:           ↓       ↓       ↓  (regular intervals)
```

### When to Use What?

#### Use Debouncing When:
✅ You want to wait for user to finish an action
✅ Last value matters most
✅ Example: Search autocomplete, form validation

#### Use Throttling When:
✅ You want consistent execution during continuous action
✅ Real-time updates matter
✅ Example: Scroll position, mouse tracking, window resize

### Example Comparison

```javascript
// Search Input
// ✅ Debounce: Wait for user to stop typing
const debouncedSearch = debounce(search, 500);

// Scroll Position
// ✅ Throttle: Update position while scrolling
const throttledScroll = throttle(updateScrollPosition, 100);

// Window Resize
// 🤔 Both work, but:
// - Debounce: Update once after resize ends (better for expensive layouts)
// - Throttle: Update during resize (better for responsive design)
```

---

## Implementations

### Advanced Debounce with Leading Edge

```javascript
function debounce(func, delay, options = {}) {
    let timeoutId;
    const { leading = false, trailing = true } = options;

    return function(...args) {
        const callNow = leading && !timeoutId;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (trailing) {
                func.apply(this, args);
            }
        }, delay);

        if (callNow) {
            func.apply(this, args);
        }
    };
}

// Usage
const debouncedClick = debounce(handleClick, 500, {
    leading: true,  // Call immediately on first click
    trailing: false // Don't call after delay
});
```

### Advanced Throttle with Leading/Trailing

```javascript
function throttle(func, limit, options = {}) {
    let inThrottle, lastFunc, lastTime;
    const { leading = true, trailing = true } = options;

    return function(...args) {
        if (!inThrottle) {
            if (leading) {
                func.apply(this, args);
            }
            inThrottle = true;
            lastTime = Date.now();

            setTimeout(() => {
                inThrottle = false;
                if (trailing && lastFunc) {
                    func.apply(this, lastFunc.args);
                    lastFunc = null;
                }
            }, limit);
        } else {
            lastFunc = { args };
        }
    };
}
```

### Cancel and Flush Methods

```javascript
function debounce(func, delay) {
    let timeoutId;

    const debounced = function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };

    // Cancel pending execution
    debounced.cancel = function() {
        clearTimeout(timeoutId);
        timeoutId = null;
    };

    // Execute immediately
    debounced.flush = function() {
        clearTimeout(timeoutId);
        func.apply(this, arguments);
    };

    return debounced;
}

// Usage
const debouncedSave = debounce(save, 1000);

// Cancel save if user navigates away
window.addEventListener('beforeunload', () => {
    debouncedSave.cancel();
});

// Force save immediately
saveButton.addEventListener('click', () => {
    debouncedSave.flush();
});
```

---

## Real-World Examples

### 1. Search with Debounce

```javascript
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

async function searchAPI(query) {
    if (!query) {
        resultsDiv.innerHTML = '';
        return;
    }

    try {
        resultsDiv.innerHTML = 'Searching...';
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();

        resultsDiv.innerHTML = data.map(item =>
            `<div>${item.title}</div>`
        ).join('');
    } catch (error) {
        resultsDiv.innerHTML = 'Error occurred';
    }
}

const debouncedSearch = debounce(searchAPI, 500);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### 2. Infinite Scroll with Throttle

```javascript
let currentPage = 1;
let isLoading = false;

async function loadMorePosts() {
    if (isLoading) return;

    isLoading = true;
    console.log('Loading page:', currentPage);

    try {
        const response = await fetch(`/api/posts?page=${currentPage}`);
        const posts = await response.json();

        appendPostsToDOM(posts);
        currentPage++;
    } catch (error) {
        console.error('Failed to load posts');
    } finally {
        isLoading = false;
    }
}

const throttledLoadMore = throttle(loadMorePosts, 1000);

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Near bottom of page
    if (scrollTop + clientHeight >= scrollHeight - 200) {
        throttledLoadMore();
    }
});
```

### 3. Auto-save with Debounce

```javascript
const editor = document.getElementById('editor');
let lastSaved = Date.now();

async function autoSave(content) {
    console.log('Auto-saving...');

    try {
        await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, timestamp: Date.now() })
        });

        lastSaved = Date.now();
        showNotification('Saved!');
    } catch (error) {
        showNotification('Save failed', 'error');
    }
}

const debouncedAutoSave = debounce(autoSave, 2000);

editor.addEventListener('input', (e) => {
    debouncedAutoSave(e.target.value);
});
```

---

## Interview Questions

### Q1: Implement debounce from scratch

```javascript
function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
```

### Q2: Implement throttle from scratch

```javascript
function throttle(func, limit) {
    let inThrottle;

    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### Q3: What's the difference between debounce and throttle?

**Answer:**
- **Debounce**: Delays execution until events stop. Resets timer on each call.
- **Throttle**: Executes at most once per interval, during continuous events.

**When to use:**
- Debounce: Search autocomplete, form validation (wait for user to finish)
- Throttle: Scroll, mouse move, window resize (regular updates during action)

### Q4: Why use `apply(this, args)` instead of just calling `func()`?

**Answer:**
- Preserves the **context** (`this` binding)
- Forwards all **arguments** to the original function
- Ensures function behaves the same as if called directly

```javascript
const obj = {
    name: 'John',
    greet: debounce(function(greeting) {
        console.log(`${greeting}, I'm ${this.name}`);
    }, 500)
};

obj.greet('Hello'); // Works correctly with preserved context
```

### Q5: How would you cancel a debounced function?

```javascript
function debounce(func, delay) {
    let timeoutId;

    const debounced = function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };

    debounced.cancel = function() {
        clearTimeout(timeoutId);
    };

    return debounced;
}

const debouncedSave = debounce(save, 1000);

// Cancel if needed
debouncedSave.cancel();
```

---

## Common Mistakes

### ❌ Mistake 1: Creating new debounced function on each render

```javascript
// Wrong
function Component() {
    return <input onChange={debounce(handleChange, 500)} />;
    // New debounced function created on each render!
}

// Correct
function Component() {
    const debouncedChange = useMemo(
        () => debounce(handleChange, 500),
        []
    );

    return <input onChange={debouncedChange} />;
}
```

### ❌ Mistake 2: Not preserving context

```javascript
// Wrong
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
        // Lost 'this' context!
    };
}

// Correct
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
```

---

## Summary

✅ **Debounce**: Wait for pause, then execute (search, validation)
✅ **Throttle**: Execute at regular intervals (scroll, mouse move)
✅ Both improve performance by reducing function calls
✅ Use `apply(this, args)` to preserve context
✅ Add cancel/flush methods for advanced control

---

**Next:** [Memoization](../memoization/README.md)
