# Stacks & Queues - Complete Guide

> **Linear Data Structures with Special Order**
> Stack: LIFO (Last In First Out) | Queue: FIFO (First In First Out)

---

## Table of Contents

1. [Stack](#stack)
2. [Queue](#queue)
3. [Common Patterns](#common-patterns)
4. [Top Interview Problems](#top-interview-problems)
5. [Practice Problems](#practice-problems)

---

## Stack

### What is a Stack?

A **LIFO** data structure - like a stack of plates.

```
    Push →  Pop
           ↓
         [30]  ← Top
         [20]
         [10]  ← Bottom
```

**Real-world examples:**
- Browser back button
- Undo functionality
- Function call stack
- Expression evaluation

### Implementation

```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    // Push - O(1)
    push(element) {
        this.items.push(element);
    }

    // Pop - O(1)
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    // Peek - O(1)
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}
```

### Time Complexity

| Operation | Time |
|-----------|------|
| Push | O(1) |
| Pop | O(1) |
| Peek | O(1) |
| Search | O(n) |

---

## Queue

### What is a Queue?

A **FIFO** data structure - like people in a line.

```
Front                    Rear
  ↓                       ↓
[10] [20] [30] [40] [50]
  ↑                   ↑
Dequeue              Enqueue
```

**Real-world examples:**
- Print queue
- Task scheduling
- BFS traversal
- Message queues

### Implementation (Array-based)

```javascript
class Queue {
    constructor() {
        this.items = [];
    }

    // Enqueue - O(1)
    enqueue(element) {
        this.items.push(element);
    }

    // Dequeue - O(n) ⚠️
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}
```

### Optimized Queue (Linked List)

```javascript
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class OptimizedQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }

    // Enqueue - O(1)
    enqueue(value) {
        const newNode = new QueueNode(value);

        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }

        this.length++;
    }

    // Dequeue - O(1) ✅
    dequeue() {
        if (this.isEmpty()) return null;

        const value = this.front.value;
        this.front = this.front.next;

        if (!this.front) {
            this.rear = null;
        }

        this.length--;
        return value;
    }

    peek() {
        return this.isEmpty() ? null : this.front.value;
    }

    isEmpty() {
        return this.length === 0;
    }
}
```

### Time Complexity

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(n) | O(1) ✅ |
| Front | O(1) | O(1) |
| Search | O(n) | O(n) |

---

## Common Patterns

### 1. Monotonic Stack

Stack that maintains **increasing** or **decreasing** order.

**Use:** Next greater/smaller element problems

```javascript
// Next Greater Element
function nextGreaterElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = arr[i];
        }
        stack.push(i);
    }

    return result;
}

console.log(nextGreaterElement([4, 5, 2, 10]));
// [5, 10, 10, -1]
```

### 2. Two Stacks for Min/Max

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);

        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const val = this.stack.pop();
        if (val === this.getMin()) {
            this.minStack.pop();
        }
        return val;
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

**Time:** O(1) for all operations

### 3. Queue using Two Stacks

```javascript
class QueueUsingStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    enqueue(x) {
        this.stack1.push(x);
    }

    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    }

    front() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }
}
```

**Amortized:** O(1) per operation

---

## Top Interview Problems

### 1. Valid Parentheses

```javascript
function isValid(s) {
    const stack = [];
    const pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if (pairs[last] !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(isValid("()[]{}"));  // true
console.log(isValid("([)]"));    // false
```

**Time:** O(n) | **Space:** O(n)

### 2. Min Stack

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const val = this.stack.pop();
        if (val === this.getMin()) {
            this.minStack.pop();
        }
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

**Time:** O(1) all operations | **Space:** O(n)

### 3. Evaluate Reverse Polish Notation

```javascript
function evalRPN(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };

    for (let token of tokens) {
        if (operators[token]) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack.pop();
}

console.log(evalRPN(["2","1","+","3","*"])); // 9
```

**Time:** O(n) | **Space:** O(n)

### 4. Daily Temperatures

```javascript
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }

    return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]
```

**Time:** O(n) | **Space:** O(n)

### 5. Largest Rectangle in Histogram

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    heights.push(0);

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }

    return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
```

**Time:** O(n) | **Space:** O(n)

### 6. Sliding Window Maximum (Queue)

```javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// [3, 3, 5, 5, 6, 7]
```

**Time:** O(n) | **Space:** O(k)

---

## Practice Problems

### Easy (Stack)
1. Valid Parentheses
2. Min Stack
3. Backspace String Compare
4. Remove All Adjacent Duplicates
5. Baseball Game

### Medium (Stack)
6. Evaluate Reverse Polish Notation
7. Daily Temperatures
8. Next Greater Element
9. Score of Parentheses
10. Decode String

### Hard (Stack)
11. Largest Rectangle in Histogram
12. Maximal Rectangle
13. Trapping Rain Water
14. Basic Calculator
15. Remove K Digits

### Queue Problems
16. Implement Stack using Queues
17. Implement Queue using Stacks
18. Moving Average from Data Stream
19. Design Circular Queue
20. Design Hit Counter

---

## Interview Tips

### When to Use Stack?

✅ **Matching/Validation** - Parentheses, brackets
✅ **Reverse/Undo** - Browser history, text editor
✅ **Next Greater/Smaller** - Stock span, temperatures
✅ **Expression Evaluation** - Calculator, postfix
✅ **DFS** - Tree/graph traversal

### When to Use Queue?

✅ **Order Preservation** - Task scheduling
✅ **BFS** - Level-order traversal
✅ **Streaming** - Data processing
✅ **Rate Limiting** - Sliding window
✅ **Buffering** - Print queue

### Common Patterns

1. **Monotonic Stack**: Next greater/smaller
2. **Two Stacks**: Min/max tracking
3. **Stack + HashMap**: Valid parentheses variations
4. **Deque**: Sliding window maximum

### Edge Cases

```javascript
// Always test:
- Empty stack/queue
- Single element
- All same elements
- Push/Pop alternating
- Overflow/Underflow
```

---

## Complexity Cheat Sheet

### Stack
```
Push:    O(1)
Pop:     O(1)
Peek:    O(1)
Search:  O(n)
Space:   O(n)
```

### Queue
```
Enqueue: O(1)
Dequeue: O(1) (with linked list) or O(n) (with array)
Front:   O(1)
Search:  O(n)
Space:   O(n)
```

---

## Quick Reference

```javascript
// Stack
const stack = [];
stack.push(1);          // Add
stack.pop();            // Remove
stack[stack.length-1];  // Peek

// Queue (array - not optimal)
const queue = [];
queue.push(1);          // Enqueue
queue.shift();          // Dequeue (O(n))
queue[0];               // Front

// Monotonic Stack Pattern
const stack = [];
for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length-1]]) {
        const idx = stack.pop();
        // Process idx
    }
    stack.push(i);
}

// Valid Parentheses Pattern
const stack = [];
const pairs = { '(': ')', '{': '}', '[': ']' };
for (let char of s) {
    if (pairs[char]) {
        stack.push(char);
    } else {
        if (pairs[stack.pop()] !== char) return false;
    }
}
return stack.length === 0;
```

---

**Stacks and Queues are fundamental - master them!** 📚
