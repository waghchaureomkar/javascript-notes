// ============================================
// DOM & BROWSER APIs - Interactive Examples
// ============================================

// Global interval variable
let intervalId = null;

// ============================================
// 1. DOM SELECTION & MANIPULATION
// ============================================

function demonstrateSelection() {
  const output = document.getElementById('selection-output');

  // Different ways to select elements
  const byId = document.getElementById('demo-element');
  const byClass = document.getElementsByClassName('output');
  const byTag = document.getElementsByTagName('button');
  const byQuery = document.querySelector('.section');
  const byQueryAll = document.querySelectorAll('.section');

  output.innerHTML = `
    <div>getElementById: ${byId ? 'Found' : 'Not found'}</div>
    <div>getElementsByClassName: ${byClass.length} elements</div>
    <div>getElementsByTagName: ${byTag.length} buttons</div>
    <div>querySelector: ${byQuery ? 'Found first section' : 'Not found'}</div>
    <div>querySelectorAll: ${byQueryAll.length} sections</div>
  `;
}

function changeContent() {
  const element = document.getElementById('demo-element');

  // Different ways to change content
  element.innerHTML = '<strong>Changed with innerHTML!</strong>';

  setTimeout(() => {
    element.textContent = 'Changed with textContent!';
  }, 1000);

  setTimeout(() => {
    element.innerText = 'Changed with innerText!';
  }, 2000);
}

function changeStyles() {
  const element = document.getElementById('demo-element');

  // Inline styles
  element.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
  element.style.color = 'white';
  element.style.padding = '20px';
  element.style.borderRadius = '10px';
  element.style.fontWeight = 'bold';
  element.style.textAlign = 'center';
  element.textContent = 'Styled with JavaScript!';

  // Reset after 3 seconds
  setTimeout(() => {
    element.style = '';
    element.textContent = 'Original Content';
  }, 3000);
}

// ============================================
// 2. EVENT HANDLING
// ============================================

function clickEvent() {
  const output = document.getElementById('event-output');
  const time = new Date().toLocaleTimeString();
  output.innerHTML = `Button clicked at ${time}`;
  output.style.background = '#d4edda';
  output.style.color = '#155724';
}

function hoverEvent() {
  const output = document.getElementById('event-output');
  output.innerHTML = 'Mouse is hovering!';
  output.style.background = '#fff3cd';
  output.style.color = '#856404';
}

function resetHover() {
  const output = document.getElementById('event-output');
  output.innerHTML = 'Event output will appear here';
  output.style.background = '';
  output.style.color = '';
}

// Input event listener
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input-demo');
  const output = document.getElementById('event-output');

  if (input) {
    input.addEventListener('input', (e) => {
      output.innerHTML = `You typed: <strong>${e.target.value}</strong>`;
    });

    input.addEventListener('focus', () => {
      input.style.borderColor = '#667eea';
      input.style.boxShadow = '0 0 5px rgba(102, 126, 234, 0.5)';
    });

    input.addEventListener('blur', () => {
      input.style.boxShadow = 'none';
    });
  }
});

// ============================================
// 3. CREATING & ADDING ELEMENTS
// ============================================

function addBox() {
  const container = document.getElementById('box-container');

  // Create new element
  const box = document.createElement('div');
  box.className = 'box';

  // Random color
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  box.style.background = randomColor;

  // Add click event
  box.addEventListener('click', function() {
    this.style.transform = 'scale(1.2) rotate(45deg)';
    setTimeout(() => {
      this.style.transform = '';
    }, 300);
  });

  // Append to container
  container.appendChild(box);
}

function removeBox() {
  const container = document.getElementById('box-container');
  const boxes = container.getElementsByClassName('box');

  if (boxes.length > 0) {
    container.removeChild(boxes[boxes.length - 1]);
  }
}

function clearBoxes() {
  const container = document.getElementById('box-container');
  container.innerHTML = '';
}

// ============================================
// 4. TODO LIST (CRUD OPERATIONS)
// ============================================

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
    `;
    list.appendChild(li);
  });

  // Save to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const todoText = input.value.trim();

  if (todoText) {
    todos.push(todoText);
    input.value = '';
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Load todos on page load
document.addEventListener('DOMContentLoaded', renderTodos);

// Add todo on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }
});

// ============================================
// 5. LOCALSTORAGE API
// ============================================

function saveToStorage() {
  const key = document.getElementById('storage-key').value;
  const value = document.getElementById('storage-value').value;
  const output = document.getElementById('storage-output');

  if (key && value) {
    localStorage.setItem(key, value);
    output.innerHTML = `Saved: <code>${key}</code> = <code>${value}</code>`;
    output.style.background = '#d4edda';
  } else {
    output.innerHTML = 'Please enter both key and value';
    output.style.background = '#f8d7da';
  }
}

function loadFromStorage() {
  const key = document.getElementById('storage-key').value;
  const output = document.getElementById('storage-output');

  if (key) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      output.innerHTML = `Loaded: <code>${key}</code> = <code>${value}</code>`;
      output.style.background = '#d4edda';
      document.getElementById('storage-value').value = value;
    } else {
      output.innerHTML = `Key <code>${key}</code> not found`;
      output.style.background = '#f8d7da';
    }
  }
}

function clearStorage() {
  const output = document.getElementById('storage-output');
  localStorage.clear();
  output.innerHTML = 'LocalStorage cleared (todos will be gone on refresh)';
  output.style.background = '#fff3cd';
}

// ============================================
// 6. FETCH API
// ============================================

async function fetchData() {
  const output = document.getElementById('fetch-output');
  output.innerHTML = 'Loading...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();

    output.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>City:</strong> ${data.address.city}</p>
    `;
    output.style.background = '#d4edda';
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
    output.style.background = '#f8d7da';
  }
}

async function fetchPosts() {
  const output = document.getElementById('fetch-output');
  output.innerHTML = 'Loading posts...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await response.json();

    output.innerHTML = '<h3>Latest Posts:</h3>' +
      posts.map(post => `
        <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 5px;">
          <strong>${post.title}</strong>
          <p>${post.body.substring(0, 100)}...</p>
        </div>
      `).join('');
    output.style.background = '#d4edda';
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
    output.style.background = '#f8d7da';
  }
}

// ============================================
// 7. WINDOW & NAVIGATOR APIs
// ============================================

function showWindowInfo() {
  const output = document.getElementById('window-info');

  output.innerHTML = `
    <div><strong>Width:</strong> ${window.innerWidth}px</div>
    <div><strong>Height:</strong> ${window.innerHeight}px</div>
    <div><strong>URL:</strong> ${window.location.href}</div>
    <div><strong>Protocol:</strong> ${window.location.protocol}</div>
  `;
}

function showNavigatorInfo() {
  const output = document.getElementById('navigator-info');

  output.innerHTML = `
    <div><strong>Browser:</strong> ${navigator.userAgent.split(' ').pop()}</div>
    <div><strong>Language:</strong> ${navigator.language}</div>
    <div><strong>Online:</strong> ${navigator.onLine ? 'Yes' : 'No'}</div>
    <div><strong>Platform:</strong> ${navigator.platform}</div>
  `;
}

function getLocation() {
  const output = document.getElementById('location-info');

  if ('geolocation' in navigator) {
    output.innerHTML = 'Getting location...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        output.innerHTML = `
          <div><strong>Latitude:</strong> ${position.coords.latitude.toFixed(4)}</div>
          <div><strong>Longitude:</strong> ${position.coords.longitude.toFixed(4)}</div>
          <div><strong>Accuracy:</strong> ${position.coords.accuracy.toFixed(0)}m</div>
        `;
        output.style.background = '#d4edda';
      },
      (error) => {
        output.innerHTML = `Error: ${error.message}`;
        output.style.background = '#f8d7da';
      }
    );
  } else {
    output.innerHTML = 'Geolocation not supported';
    output.style.background = '#f8d7da';
  }
}

// ============================================
// 8. TIMERS
// ============================================

function startTimeout() {
  const output = document.getElementById('timer-output');
  output.innerHTML = 'Waiting for 3 seconds...';

  setTimeout(() => {
    output.innerHTML = '3 seconds have passed!';
    output.style.background = '#d4edda';

    setTimeout(() => {
      output.innerHTML = 'Timer output...';
      output.style.background = '';
    }, 2000);
  }, 3000);
}

function startInterval() {
  if (intervalId) {
    return; // Already running
  }

  const output = document.getElementById('timer-output');
  let count = 0;

  intervalId = setInterval(() => {
    count++;
    output.innerHTML = `Interval running: ${count} seconds`;
    output.style.background = '#fff3cd';
  }, 1000);
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;

    const output = document.getElementById('timer-output');
    output.innerHTML = 'Interval stopped!';
    output.style.background = '#f8d7da';

    setTimeout(() => {
      output.innerHTML = 'Timer output...';
      output.style.background = '';
    }, 2000);
  }
}

// ============================================
// ADDITIONAL EVENT LISTENERS
// ============================================

// Detect window resize
window.addEventListener('resize', () => {
  console.log(`Window resized to: ${window.innerWidth}x${window.innerHeight}`);
});

// Detect scroll
window.addEventListener('scroll', () => {
  console.log(`Scrolled to: ${window.scrollY}px`);
});

// Page visibility
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page is hidden');
  } else {
    console.log('Page is visible');
  }
});

console.log('DOM & Browser APIs loaded! Open this file in a browser to see interactive examples.');
