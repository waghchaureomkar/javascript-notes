# Linked Lists - Complete Guide

> **Dynamic Linear Data Structure**
> Collection of nodes where each node points to the next

---

## Table of Contents

1. [Linked List Basics](#linked-list-basics)
2. [Types of Linked Lists](#types-of-linked-lists)
3. [Operations](#operations)
4. [Common Patterns](#common-patterns)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Linked List Basics

### What is a Linked List?

A **linear collection** of nodes where each node contains:
- **Data** (value)
- **Pointer** (reference to next node)

```
[10|•]--->[20|•]--->[30|•]--->[40|null]
 head                          tail
```

### Array vs Linked List

| Feature | Array | Linked List |
|---------|-------|-------------|
| Memory | Contiguous | Non-contiguous |
| Access | O(1) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1) | O(1) with tail |
| Insert at middle | O(n) | O(n) |
| Delete at start | O(n) | O(1) |
| Memory | Fixed | Dynamic |

### When to Use?

**✅ Use Linked List when:**
- Frequent insertions/deletions at beginning
- Unknown size
- Memory needs to be allocated dynamically

**❌ Don't use when:**
- Need random access
- Memory is continuous
- Cache locality is important

---

## Types of Linked Lists

### 1. Singly Linked List

Each node points to **next** node only.

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}
```

```
[1]→[2]→[3]→[4]→null
```

### 2. Doubly Linked List

Each node has **next** and **prev** pointers.

```javascript
class DoublyNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
```

```
null←[1]⇄[2]⇄[3]⇄[4]→null
```

### 3. Circular Linked List

Last node points back to **first** node.

```
[1]→[2]→[3]→[4]→(back to 1)
```

---

## Operations

### 1. Append (Add at End)

```javascript
append(value) {
    const newNode = new Node(value);

    if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        this.tail = newNode;
    }

    this.size++;
}
```

**Time:** O(1) with tail reference

### 2. Prepend (Add at Start)

```javascript
prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.tail) {
        this.tail = newNode;
    }

    this.size++;
}
```

**Time:** O(1)

### 3. Insert at Position

```javascript
insertAt(index, value) {
    if (index < 0 || index > this.size) return false;

    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const newNode = new Node(value);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
        current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
}
```

**Time:** O(n)

### 4. Delete at Position

```javascript
removeAt(index) {
    if (index < 0 || index >= this.size) return null;

    let removedNode;

    if (index === 0) {
        removedNode = this.head;
        this.head = this.head.next;

        if (this.size === 1) {
            this.tail = null;
        }
    } else {
        let current = this.head;

        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        removedNode = current.next;
        current.next = removedNode.next;

        if (index === this.size - 1) {
            this.tail = current;
        }
    }

    this.size--;
    return removedNode.value;
}
```

**Time:** O(n)

### 5. Reverse

```javascript
reverse() {
    let prev = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    this.head = prev;
}
```

**Time:** O(n)

---

## Common Patterns

### 1. Fast & Slow Pointers (Floyd's Cycle Detection)

**Use:** Find middle, detect cycle, find cycle start

```javascript
// Find Middle
function findMiddle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// Detect Cycle
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true;
    }

    return false;
}
```

### 2. Reverse Pattern

```javascript
// Reverse Iteratively
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

// Reverse Recursively
function reverseListRecursive(head) {
    if (!head || !head.next) return head;

    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}
```

### 3. Merge Pattern

```javascript
// Merge Two Sorted Lists
function mergeTwoLists(l1, l2) {
    const dummy = new Node(0);
    let current = dummy;

    while (l1 && l2) {
        if (l1.value < l2.value) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
}
```

### 4. Dummy Node Pattern

**Use:** Simplify edge cases

```javascript
function deleteNodes(head, value) {
    const dummy = new Node(0);
    dummy.next = head;
    let current = dummy;

    while (current.next) {
        if (current.next.value === value) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return dummy.next;
}
```

---

## Top Interview Problems

### 1. Reverse Linked List

```javascript
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}
```

**Time:** O(n) | **Space:** O(1)

### 2. Merge Two Sorted Lists

```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new Node(0);
    let current = dummy;

    while (l1 && l2) {
        if (l1.value < l2.value) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
}
```

**Time:** O(m + n) | **Space:** O(1)

### 3. Linked List Cycle Detection

```javascript
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true;
    }

    return false;
}
```

**Time:** O(n) | **Space:** O(1)

### 4. Remove Nth Node From End

```javascript
function removeNthFromEnd(head, n) {
    const dummy = new Node(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both until fast reaches end
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove nth node
    slow.next = slow.next.next;

    return dummy.next;
}
```

**Time:** O(n) | **Space:** O(1)

### 5. Palindrome Linked List

```javascript
function isPalindrome(head) {
    if (!head || !head.next) return true;

    // Find middle
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let prev = null;
    let current = slow;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    // Compare both halves
    let left = head;
    let right = prev;

    while (right) {
        if (left.value !== right.value) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}
```

**Time:** O(n) | **Space:** O(1)

### 6. Intersection of Two Linked Lists

```javascript
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;

    let a = headA;
    let b = headB;

    // When they meet, they're at intersection
    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }

    return a;
}
```

**Time:** O(m + n) | **Space:** O(1)

### 7. Add Two Numbers

```javascript
function addTwoNumbers(l1, l2) {
    const dummy = new Node(0);
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.value : 0;
        const val2 = l2 ? l2.value : 0;

        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);

        current.next = new Node(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
}
```

**Time:** O(max(m, n)) | **Space:** O(max(m, n))

---

## Practice Problems

### Easy
1. Delete Node in a Linked List
2. Middle of the Linked List
3. Convert Binary Number in Linked List to Integer
4. Remove Linked List Elements
5. Merge Two Sorted Lists

### Medium
6. Remove Nth Node From End
7. Reorder List
8. Odd Even Linked List
9. Swap Nodes in Pairs
10. Rotate List

### Hard
11. Reverse Nodes in k-Group
12. Merge k Sorted Lists
13. Copy List with Random Pointer
14. LRU Cache (uses doubly linked list)
15. Flatten a Multilevel Doubly Linked List

---

## Interview Tips

### Key Techniques

1. **Fast & Slow Pointers** - Find middle, detect cycles
2. **Dummy Node** - Simplify head operations
3. **Recursion** - Clean solution for reversal
4. **Two Pointers** - Gap-based problems

### Edge Cases to Test

```javascript
// Always consider:
- Empty list: null
- Single node: [1]→null
- Two nodes: [1]→[2]→null
- Cycle: [1]→[2]→[3]→(back to 2)
- Even vs odd length
```

### Common Mistakes

❌ **Forgetting to update tail**
❌ **Losing reference to next node**
❌ **Not handling null head**
❌ **Infinite loops in cycles**

### Drawing Helps!

Always **draw** the linked list before coding:

```
Before:  [1]→[2]→[3]→[4]→null
After:   [1]→[3]→[4]→null  (delete 2)
```

---

## Complexity Cheat Sheet

```
Access:         O(n)
Search:         O(n)
Insert at head: O(1)
Insert at tail: O(1) with tail reference
Insert middle:  O(n)
Delete at head: O(1)
Delete at tail: O(n) (need to find previous)
Delete middle:  O(n)
Reverse:        O(n)
```

---

## Quick Reference

```javascript
// Node class
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Dummy node pattern
const dummy = new Node(0);
dummy.next = head;
// ... operations
return dummy.next;

// Fast & Slow pointers
let slow = head;
let fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}

// Reverse pattern
let prev = null;
let current = head;
while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
}

// Traverse
let current = head;
while (current) {
    console.log(current.value);
    current = current.next;
}
```

---

**Master linked lists to understand pointer manipulation!** 🔗
