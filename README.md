# JavaScript Notes

Comprehensive JavaScript notes with practical examples covering basics to advanced concepts.

## Project Structure

```
JavaScript Notes/
├── 01-basics/              # Variables, Types, Operators, How JS Works 🔥
├── 02-functions-scope/     # Functions, Closures, Scope, Prototypes 🔥
├── 03-advanced/            # Async, Promises, Event Loop 🔥
├── 04-dom-browser/         # DOM, Browser APIs, CORS, Memory Leaks 🔥
├── 05-data-structures/     # DSA - Data Structures
│   ├── arrays/
│   ├── linked-lists/
│   ├── stacks-queues/
│   ├── trees/
│   ├── graphs/
│   ├── hash-tables/
│   └── heaps/
├── 06-algorithms/          # Algorithms & Problem Solving
│   ├── sorting/
│   ├── searching/
│   ├── recursion/
│   ├── dynamic-programming/
│   ├── greedy/
│   ├── two-pointers/
│   └── sliding-window/
├── 07-interview-prep/      # 🔥 Interview Preparation 🔥
│   ├── debouncing-throttling/  # Performance optimization patterns
│   ├── memoization/            # Caching expensive operations
│   ├── object-manipulation/    # Deep copy, freeze, seal
│   └── tricky-questions/       # 45+ output-based questions
├── 08-react-nextjs/        # 🔥 React & Next.js - Complete Guide 🔥
│   ├── 01-react-fundamentals/      # React basics, JSX, components
│   ├── 02-react-hooks/             # All hooks + custom hooks
│   ├── 03-react-advanced/          # Advanced patterns
│   ├── 04-react-performance/       # Optimization techniques
│   ├── 05-react-state-management/  # Context, Redux, Zustand
│   ├── 06-react-routing/           # React Router
│   ├── 07-react-forms/             # Form handling
│   ├── 08-react-testing/           # Jest, RTL
│   ├── 09-react-interview-prep/    # 🔥 React interview Q&A
│   ├── 10-nextjs-fundamentals/     # Next.js basics, SSR/SSG/ISR
│   ├── 11-nextjs-advanced/         # Advanced Next.js
│   ├── 12-nextjs-interview-prep/   # 🔥 Next.js interviews
│   └── TOPICS-PLAN.md              # Complete learning roadmap
├── examples/               # Additional practice examples
└── package.json
```

## Topics Covered

### 1. Basics (01-basics/) 🔥 ENHANCED
- Variables: `var`, `let`, `const`
- Data Types: Primitives and Reference types
- Type Conversion and Coercion
- Operators: Arithmetic, Comparison, Logical
- String Operations and Template Literals
- Array Basics
- Object Basics
- Conditional Statements
- Loops: `for`, `while`, `for...of`, `for...in`
- Spread and Rest operators
- Destructuring
- **🔥 NEW: How JavaScript Works**
  - Execution Context (Global & Function)
  - Call Stack (with visualization)
  - Memory Heap (Stack vs Heap)
  - JavaScript is Single-Threaded
  - Interview tricky questions

### 2. Functions & Scope (02-functions-scope/) 🔥 ENHANCED
- **🔥 NEW: First-Class Functions** (explicit deep dive)
- Function Declarations vs Expressions
- Arrow Functions
- Function Parameters (default, rest, destructuring)
- Return Values
- Scope: Global, Function, Block
- Hoisting
- Closures
- `this` Keyword
- `call`, `apply`, `bind`
- IIFE (Immediately Invoked Function Expression)
- Callback Functions
- Higher-Order Functions
- Pure Functions
- Recursion
- Currying
- **🔥 NEW: Function Composition** (pipe & compose)
- **🔥 NEW: Prototypes & Inheritance**
  - Prototype Chain
  - `__proto__` vs `prototype`
  - ES5 vs ES6 inheritance
  - Property lookup
  - Prototype pollution

### 3. Advanced JavaScript (03-advanced/) 🔥 ENHANCED
- Promises
- Promise Methods: `all`, `race`, `allSettled`, `any`
- Async/Await
- **🔥 NEW: Event Loop** (Most Asked!)
  - How Event Loop works
  - Call Stack, Web APIs, Queues
  - Microtask Queue vs Macrotask Queue
  - Execution order (Promise vs setTimeout)
  - Multiple complex examples
  - Common mistakes & traps
- Error Handling with try-catch
- Classes (ES6+)
- Inheritance
- Getters and Setters
- Private Fields
- ES6 Modules
- Advanced Destructuring
- Template Literals (Tagged templates)
- Symbols
- Iterators & Generators
- Proxy & Reflect
- Map & Set
- WeakMap & WeakSet
- Optional Chaining & Nullish Coalescing
- Array Methods (ES6+)
- Object Methods (ES6+)

### 4. DOM & Browser APIs (04-dom-browser/) 🔥 ENHANCED
- DOM Selection Methods
- DOM Manipulation
- Event Handling (Bubbling, Capturing, Delegation)
- Creating and Removing Elements
- CRUD Operations
- LocalStorage & SessionStorage API
- Fetch API (Async requests)
- **🔥 NEW: CORS & Same-Origin Policy**
  - What is Same-Origin Policy
  - How CORS works
  - Preflight requests
  - CORS headers
  - Common errors & solutions
- Window API
- Navigator API
- Geolocation API
- Timers: `setTimeout`, `setInterval`
- **🔥 NEW: Memory Leaks & Garbage Collection**
  - How Garbage Collection works
  - Common memory leak patterns
  - Event listener leaks
  - Timer leaks
  - Closure leaks
  - Detached DOM nodes
  - Detection & prevention

### 5. Data Structures (05-data-structures/)

#### Arrays
- Array Operations (Insert, Delete, Search)
- Two Sum, Maximum Subarray (Kadane's)
- Move Zeros, Rotate Array
- Remove Duplicates from Sorted Array
- Best Time to Buy/Sell Stock
- Prefix Sum, Sliding Window Maximum

#### Linked Lists
- Singly Linked List Implementation
- Doubly Linked List
- Reverse Linked List (Iterative & Recursive)
- Find Middle (Slow-Fast Pointer)
- Detect Cycle (Floyd's Algorithm)
- Merge Two Sorted Lists
- Remove Nth Node from End
- Palindrome Linked List
- Intersection of Two Lists

#### Stacks & Queues
- Stack Implementation (Array & Linked List)
- Queue Implementation (Optimized)
- Circular Queue, Deque
- Valid Parentheses
- Min Stack (Get Min in O(1))
- Daily Temperatures (Next Greater Element)
- Largest Rectangle in Histogram
- Implement Stack using Queues

#### Trees
- Binary Tree Traversals (Inorder, Preorder, Postorder)
- Level Order Traversal (BFS)
- Binary Search Tree (Insert, Search, Delete)
- Validate BST
- Invert Binary Tree
- Lowest Common Ancestor
- Path Sum, Symmetric Tree
- Diameter of Binary Tree
- Kth Smallest in BST
- Serialize/Deserialize Binary Tree
- Trie (Prefix Tree)

#### Graphs (Upcoming)
- Graph Representations
- BFS & DFS Traversals
- Dijkstra's Algorithm
- Topological Sort

#### Hash Tables (Upcoming)
- Hash Map Implementation
- Hash Set
- Collision Handling

#### Heaps (Upcoming)
- Min Heap & Max Heap
- Priority Queue
- Heap Sort

### 6. Algorithms (06-algorithms/)

#### Sorting Algorithms
- **O(n²)**: Bubble Sort, Selection Sort, Insertion Sort
- **O(n log n)**: Merge Sort, Quick Sort, Heap Sort
- **O(n + k)**: Counting Sort, Radix Sort, Bucket Sort
- Special Problems: Sort Colors, Merge Intervals, Kth Largest Element

#### Searching Algorithms
- Linear Search: O(n)
- Binary Search: O(log n) (Iterative & Recursive)
- Binary Search Variations:
  - First/Last Occurrence
  - Search in Rotated Array
  - Find Peak Element
  - Search in 2D Matrix
- Jump Search, Interpolation Search
- Exponential Search, Ternary Search
- Advanced: Median of Two Sorted Arrays, K Closest Elements

#### Recursion (Upcoming)
- Basic Recursion Patterns
- Backtracking Problems
- Divide and Conquer

#### Dynamic Programming
- Fibonacci (Memoization & Tabulation)
- Climbing Stairs
- Coin Change (Min Coins & Count Ways)
- 0/1 Knapsack Problem
- Longest Common Subsequence (LCS)
- Longest Increasing Subsequence (LIS)
- Edit Distance (Levenshtein)
- Word Break
- House Robber (Linear & Circular)
- Unique Paths (With/Without Obstacles)
- Partition Equal Subset Sum
- Maximum Product Subarray
- Longest Palindromic Substring
- Palindromic Substrings Count

#### Greedy Algorithms (Upcoming)
- Activity Selection
- Huffman Coding
- Fractional Knapsack

#### Two Pointers (Upcoming)
- Container With Most Water
- 3Sum, 4Sum

#### Sliding Window (Upcoming)
- Maximum Sum Subarray
- Longest Substring Without Repeating Characters

### 7. Interview Preparation (07-interview-prep/) 🔥 NEW SECTION 🔥

**Production-ready implementations of critical interview patterns**

#### Debouncing & Throttling (Most Asked!)
- What is Debouncing & Throttling
- Difference between them
- Implementation from scratch
- With leading/trailing edge options
- Real-world use cases:
  - Search autocomplete with debounce
  - Infinite scroll with throttle
  - Auto-save with debounce
- Cancel and flush methods
- Performance comparisons
- **Interview Probability: ⭐⭐⭐⭐⭐**

#### Memoization (Caching for Performance)
- What is Memoization
- Basic implementation
- Memoizing recursive functions:
  - Fibonacci (1000x+ speedup!)
  - Factorial
  - Grid Traveler
- LRU Cache implementation
  - Map-based approach
  - Doubly Linked List optimization
- Async memoization
- Cache with expiry
- Memory vs Speed trade-offs
- **Interview Probability: ⭐⭐⭐⭐**

#### Object Manipulation (Deep Understanding)
- **Shallow Copy vs Deep Copy**
  - Spread operator (`...`)
  - `Object.assign()`
  - `JSON.parse/stringify` (limitations!)
  - `structuredClone()` (modern)
  - Custom deep clone with circular references
- **Object.freeze vs Object.seal**
  - Immutability patterns
  - `const` vs `freeze`
  - Deep freeze implementation
  - `Object.preventExtensions()`
- Common pitfalls & edge cases
- **Interview Probability: ⭐⭐⭐⭐**

#### Tricky Output Questions (45+ Questions!)
- **Type Coercion**: `==` vs `===`, `typeof null`, `NaN`, `[] + []`, `{} + {}`
- **Hoisting**: `var` vs `let` vs `const`, TDZ, function hoisting
- **Closures**: `setTimeout` in loops, private variables, nested closures
- **Event Loop**: Promise vs setTimeout, microtask vs macrotask order
- **`this` Keyword**: Arrow functions, method extraction, `call/apply/bind`
- **Scope Chain**: Variable shadowing, lexical scope lookup
- **Miscellaneous**: Array tricks, operators, destructuring gotchas
- Each question with detailed explanation
- **Interview Probability: ⭐⭐⭐⭐⭐**

**Why This Section?**
- Most frequently asked in technical interviews
- Production-ready code patterns
- Performance optimization techniques
- Deep JavaScript understanding
- FAANG-level preparation

### 8. React & Next.js (08-react-nextjs/) 🔥 NEW SECTION 🔥

**Complete React & Next.js preparation for modern web development**

#### React Fundamentals (01-react-fundamentals/)
- What is React? (Library vs Framework)
- Virtual DOM vs Real DOM
- JSX (JavaScript XML)
- Components (Functional vs Class)
- Props (Properties)
- State (useState basics)
- Events in React
- Conditional Rendering
- Lists and Keys
- Forms (Controlled vs Uncontrolled)
- Component Lifecycle
- React 18 Features (Concurrent Rendering, Automatic Batching)
- **Interview Probability: ⭐⭐⭐⭐⭐**

#### React Hooks (02-react-hooks/) - MOST IMPORTANT!
- **Basic Hooks**: useState, useEffect, useContext
- **Additional Hooks**: useReducer, useCallback, useMemo, useRef
- **React 18+ Hooks**: useId, useTransition, useDeferredValue
- **Custom Hooks**: useLocalStorage, useFetch, useDebounce, useToggle, usePrevious
- Rules of Hooks
- Stale closure problem & solutions
- Dependencies array deep dive
- Complete working examples (useState, useEffect, Custom Hooks)
- **Interview Probability: ⭐⭐⭐⭐⭐**

#### React Interview Preparation (09-react-interview-prep/)
- **Core Concepts**: Virtual DOM, Reconciliation, JSX, Props vs State
- **Hooks Deep Dive**: All hooks with interview questions
- **Performance**: React.memo, useCallback, useMemo, Code Splitting
- **State Management**: Context API vs Redux
- **Common Patterns**: HOC, Render Props, Compound Components
- **Tricky Questions**: Output-based questions, common mistakes
- **Coding Challenges**: Todo App, Debounced Search, Infinite Scroll
- 25+ interview questions with detailed answers
- **Interview Probability: ⭐⭐⭐⭐⭐**

#### Next.js Fundamentals (10-nextjs-fundamentals/)
- What is Next.js and why use it
- App Router vs Pages Router (Next.js 13+)
- File-based routing (static, dynamic, catch-all)
- **Rendering Methods**:
  - Server Components (default)
  - Client Components ('use client')
  - SSR (Server-Side Rendering)
  - SSG (Static Site Generation)
  - ISR (Incremental Static Regeneration)
- Data Fetching strategies
- Built-in components (Image, Link, Script, Font)
- Layouts, Loading, and Error handling
- API Routes
- **Interview Probability: ⭐⭐⭐⭐⭐**

**Why React/Next.js Section?**
- React is the most in-demand frontend library
- Next.js is the industry-standard React framework
- Complete preparation from basics to advanced
- Interview-focused content with Q&A
- Production-ready patterns and best practices
- 200+ topics with 14-week learning plan
- Working code examples for all concepts

## How to Use

### For Node.js Examples (Basics, Functions, Advanced, DSA, Algorithms)

1. Install dependencies (if any added later):
```bash
npm install
```

2. Run specific topic examples:
```bash
# Run basics examples
npm run basics

# Run functions & scope examples
npm run functions

# Run advanced JavaScript examples
npm run advanced

# Run DSA examples
node 05-data-structures/arrays/index.js
node 05-data-structures/linked-lists/index.js
node 05-data-structures/stacks-queues/index.js
node 05-data-structures/trees/index.js

# Run Algorithm examples
node 06-algorithms/sorting/index.js
node 06-algorithms/searching/index.js
node 06-algorithms/dynamic-programming/index.js

# Run Interview Prep examples (NEW!)
node 07-interview-prep/debouncing-throttling/index.js
node 07-interview-prep/memoization/index.js
node 07-interview-prep/object-manipulation/index.js
node 07-interview-prep/tricky-questions/index.js
```

3. Or run files directly:
```bash
node 01-basics/index.js
node 02-functions-scope/index.js
node 03-advanced/index.js
```

### For DOM & Browser APIs

1. Open the HTML file in your browser:
```bash
open 04-dom-browser/index.html
```
Or simply double-click the `index.html` file in the `04-dom-browser/` folder.

2. Interact with the examples directly in the browser:
   - Click buttons to see DOM manipulation
   - Test event handlers
   - Try the Todo List
   - Experiment with LocalStorage
   - Fetch data from APIs
   - Test browser APIs

## Quick Start

```bash
# Clone or download this repository
cd "JavaScript Notes"

# Run all examples
npm run basics
npm run functions
npm run advanced

# For DOM examples, open in browser
open 04-dom-browser/index.html
```

## Learning Path

### 📚 Fundamentals (Weeks 1-4)
1. **Start with Basics** - Understand variables, types, operators, and how JavaScript works
2. **Master Functions & Scope** - Learn closures, callbacks, scope, and prototypes
3. **Dive into Advanced** - Explore async programming, Event Loop, and ES6+ features
4. **Practice DOM** - Build interactive web applications, understand CORS and memory management

### 🎯 Interview Preparation (Weeks 5-6)
5. **Learn Data Structures** - Arrays, Linked Lists, Stacks, Queues, Trees, Graphs
6. **Master Algorithms** - Sorting, Searching, DP, Greedy, Recursion
7. **🔥 Interview Patterns** - Debouncing/Throttling, Memoization, Object manipulation
8. **🔥 Tricky Questions** - Master 45+ output-based questions that interviewers love

### ⚛️ React & Next.js (Weeks 7-14)
9. **React Fundamentals** - Components, Props, State, JSX, Lifecycle
10. **React Hooks** - All hooks, custom hooks, performance optimization
11. **React Advanced** - Context API, HOC, Render Props, Patterns
12. **Next.js** - SSR/SSG/ISR, App Router, Data Fetching, API Routes
13. **Interview Prep** - React & Next.js interview questions and challenges

### 🚀 Recommended Order
1. 01-basics → 02-functions-scope → 03-advanced → 04-dom-browser
2. 05-data-structures → 06-algorithms
3. **07-interview-prep** (Practice this throughout your preparation)
4. **08-react-nextjs** - Complete React & Next.js preparation
5. Build projects combining all concepts

## Examples Include

- Variable declarations and scoping
- Type conversion and checking
- Array and Object manipulation
- Function patterns and closures
- Promise handling and async/await
- Class-based programming
- Event-driven programming
- API data fetching
- LocalStorage persistence
- Interactive Todo application
- Browser API demonstrations
- Data Structure implementations (Arrays, Linked Lists, Stacks, Queues, Trees, BST, Trie)
- Sorting algorithms (Bubble, Merge, Quick, Heap, Counting, Radix)
- Searching algorithms (Binary Search, Search variations)
- Dynamic Programming problems (Fibonacci, Knapsack, LCS, LIS, Edit Distance)
- Common interview problems with test cases

## Tips for Learning

1. **Read the code comments** - Each file has detailed explanations
2. **Run the examples** - Execute the code to see results
3. **Modify and experiment** - Change values and see what happens
4. **Check the console** - Many examples log output to console
5. **Build projects** - Apply what you learn in real projects

## 🔥 What Makes This Repository Special?

### Comprehensive Interview Coverage
- **30,000+ lines** of educational content
- **100+ interview questions** with detailed explanations
- **Production-ready patterns** (debouncing, throttling, memoization)
- **Critical concepts** (Event Loop, Execution Context, CORS, Memory Leaks, Virtual DOM)
- **45+ tricky questions** that interviewers actually ask
- **Complete React & Next.js preparation** - 200+ topics

### Enhanced Core Topics
✅ **Execution Context & Call Stack** - Understand how JavaScript executes code
✅ **Event Loop Deep Dive** - Master async JavaScript with visual examples
✅ **Prototypes & Inheritance** - Complete prototype chain understanding
✅ **CORS & Security** - Web security essentials
✅ **Memory Leaks** - Prevent and detect memory issues
✅ **React Hooks** - All 12+ hooks with working examples
✅ **Next.js Rendering** - SSR, SSG, ISR complete guide

### Interview-Focused Content

**JavaScript:**
- Debouncing & Throttling (with cancel/flush)
- Memoization (including LRU Cache)
- Object manipulation (shallow/deep copy, freeze/seal)
- Type coercion traps
- Hoisting gotchas
- Closure patterns
- Event Loop execution order

**React/Next.js:**
- Virtual DOM & Reconciliation
- All React Hooks (useState, useEffect, useCallback, useMemo, etc.)
- 13+ Custom Hooks with implementations
- Performance optimization (React.memo, lazy loading)
- Server Components vs Client Components
- SSR/SSG/ISR strategies
- 25+ React interview questions
- Coding challenges (Todo, Search, Infinite Scroll)

### Real Performance Gains
- Fibonacci: **1000x+ speedup** with memoization
- API calls: **90% reduction** with debouncing
- Memory usage: Proper **garbage collection** patterns
- Browser performance: Throttling for **smooth UX**
- React rendering: Proper memoization prevents unnecessary re-renders
- Next.js: SSG provides instant page loads

## Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ES6 Features](http://es6-features.org/)

## Notes

- All Node.js examples use ES6 modules (`type: "module"` in package.json)
- DOM examples require a modern browser
- Some browser APIs (like Geolocation) require user permission
- Async examples may take time to complete - check the console

## Practice Exercises

After going through the notes, try these exercises:

1. **Basics**: Build a simple calculator using variables and operators
2. **Functions**: Create a function that implements memoization
3. **Advanced**: Build a promise-based data fetching utility
4. **DOM**: Create a fully functional Todo app with filters and localStorage
5. **Data Structures**:
   - Implement a LRU Cache using HashMap and Doubly Linked List
   - Build a file system using Trees
   - Create a browser history using Stack
6. **Algorithms**:
   - Solve Two Sum, Three Sum problems
   - Implement Quick Sort and Merge Sort
   - Solve Longest Palindromic Substring
   - Practice top 50 LeetCode questions

## Contributing

Feel free to add more examples or improve existing ones!

## License

ISC

---

Happy Learning! 🚀

**Remember**: The best way to learn JavaScript is by writing code. Don't just read - experiment, break things, and build projects!
# javascript-notes
