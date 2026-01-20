# JavaScript Notes

Comprehensive JavaScript notes with practical examples covering basics to advanced concepts.

## Project Structure

```
JavaScript Notes/
├── 01-basics/              # Variables, Types, Operators
├── 02-functions-scope/     # Functions, Closures, Scope
├── 03-advanced/            # Async, Promises, ES6+
├── 04-dom-browser/         # DOM Manipulation, Browser APIs
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
├── examples/               # Additional practice examples
└── package.json
```

## Topics Covered

### 1. Basics (01-basics/)
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

### 2. Functions & Scope (02-functions-scope/)
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

### 3. Advanced JavaScript (03-advanced/)
- Promises
- Promise Methods: `all`, `race`, `allSettled`, `any`
- Async/Await
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

### 4. DOM & Browser APIs (04-dom-browser/)
- DOM Selection Methods
- DOM Manipulation
- Event Handling
- Creating and Removing Elements
- CRUD Operations
- LocalStorage API
- Fetch API (Async requests)
- Window API
- Navigator API
- Geolocation API
- Timers: `setTimeout`, `setInterval`

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

1. **Start with Basics** - Understand variables, types, and operators
2. **Master Functions & Scope** - Learn closures, callbacks, and scope
3. **Dive into Advanced** - Explore async programming and ES6+ features
4. **Practice DOM** - Build interactive web applications
5. **Learn Data Structures** - Arrays, Linked Lists, Stacks, Queues, Trees, Graphs
6. **Master Algorithms** - Sorting, Searching, DP, Greedy, Recursion

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
