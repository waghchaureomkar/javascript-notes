/**
 * STACKS & QUEUES - Data Structures
 * Stack: LIFO (Last In First Out)
 * Queue: FIFO (First In First Out)
 */

// ===== STACK IMPLEMENTATION =====

class Stack {
    constructor() {
        this.items = [];
    }

    // Push: O(1)
    push(element) {
        this.items.push(element);
    }

    // Pop: O(1)
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    // Peek: O(1)
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

    print() {
        console.log(this.items.toString());
    }
}

// ===== STACK PROBLEMS =====

// 1. Valid Parentheses
function isValidParentheses(s) {
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

// 2. Evaluate Reverse Polish Notation
function evalRPN(tokens) {
    const stack = [];

    for (let token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(Math.trunc(a / b)); break;
            }
        } else {
            stack.push(Number(token));
        }
    }

    return stack.pop();
}

// 3. Min Stack (get minimum in O(1))
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

// 4. Daily Temperatures (Next Greater Element)
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

// 5. Largest Rectangle in Histogram
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    heights.push(0); // Add sentinel

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

// ===== QUEUE IMPLEMENTATION =====

class Queue {
    constructor() {
        this.items = [];
    }

    // Enqueue: O(1)
    enqueue(element) {
        this.items.push(element);
    }

    // Dequeue: O(n) - not optimal, use linked list for O(1)
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    // Front: O(1)
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

    print() {
        console.log(this.items.toString());
    }
}

// ===== OPTIMIZED QUEUE (Using Linked List) =====

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

    // Enqueue: O(1)
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

    // Dequeue: O(1)
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

    size() {
        return this.length;
    }
}

// ===== CIRCULAR QUEUE =====

class CircularQueue {
    constructor(k) {
        this.queue = new Array(k);
        this.size = k;
        this.front = -1;
        this.rear = -1;
    }

    enQueue(value) {
        if (this.isFull()) return false;

        if (this.isEmpty()) {
            this.front = 0;
        }

        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = value;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) return false;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }

        return true;
    }

    Front() {
        return this.isEmpty() ? -1 : this.queue[this.front];
    }

    Rear() {
        return this.isEmpty() ? -1 : this.queue[this.rear];
    }

    isEmpty() {
        return this.front === -1;
    }

    isFull() {
        return (this.rear + 1) % this.size === this.front;
    }
}

// ===== DEQUE (Double-Ended Queue) =====

class Deque {
    constructor() {
        this.items = [];
    }

    addFront(element) {
        this.items.unshift(element);
    }

    addRear(element) {
        this.items.push(element);
    }

    removeFront() {
        return this.isEmpty() ? null : this.items.shift();
    }

    removeRear() {
        return this.isEmpty() ? null : this.items.pop();
    }

    peekFront() {
        return this.isEmpty() ? null : this.items[0];
    }

    peekRear() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// ===== QUEUE PROBLEMS =====

// 1. Implement Stack using Queues
class StackUsingQueues {
    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x) {
        this.q2.push(x);

        while (this.q1.length > 0) {
            this.q2.push(this.q1.shift());
        }

        [this.q1, this.q2] = [this.q2, this.q1];
    }

    pop() {
        return this.q1.shift();
    }

    top() {
        return this.q1[0];
    }

    empty() {
        return this.q1.length === 0;
    }
}

// ===== TEST CASES =====
console.log('\n===== Stack & Queue Tests =====\n');

// Stack tests
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('Stack:', stack.items); // [1, 2, 3]
console.log('Pop:', stack.pop()); // 3
console.log('Peek:', stack.peek()); // 2

// Valid Parentheses
console.log('\nValid Parentheses:');
console.log(isValidParentheses('()[]{}'));  // true
console.log(isValidParentheses('(]'));      // false

// Queue tests
const queue = new OptimizedQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log('\nDequeue:', queue.dequeue()); // 1
console.log('Front:', queue.peek()); // 2

// Daily Temperatures
console.log('\nDaily Temperatures:');
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]
