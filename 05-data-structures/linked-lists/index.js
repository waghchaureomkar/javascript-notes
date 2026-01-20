/**
 * LINKED LISTS - Data Structure
 * Linear data structure with nodes pointing to next node
 */

// ===== SINGLY LINKED LIST =====

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

    // Add at end: O(1)
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
        return this;
    }

    // Add at beginning: O(1)
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        this.size++;
        return this;
    }

    // Insert at position: O(n)
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
        return true;
    }

    // Remove at position: O(n)
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

    // Search: O(n)
    find(value) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    // Reverse the list: O(n)
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
        return this;
    }

    // Print list
    print() {
        const values = [];
        let current = this.head;

        while (current) {
            values.push(current.value);
            current = current.next;
        }

        console.log(values.join(' -> '));
    }
}

// ===== COMMON LINKED LIST PROBLEMS =====

// 1. Reverse Linked List (using recursion)
function reverseListRecursive(head) {
    if (!head || !head.next) return head;

    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}

// 2. Find Middle of Linked List (Slow-Fast Pointer)
function findMiddle(head) {
    if (!head) return null;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// 3. Detect Cycle (Floyd's Cycle Detection)
function hasCycle(head) {
    if (!head) return false;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

// 4. Merge Two Sorted Lists
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

// 5. Remove Nth Node From End
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

// 6. Palindrome Linked List
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
        if (left.value !== right.value) {
            return false;
        }
        left = left.next;
        right = right.next;
    }

    return true;
}

// 7. Intersection of Two Linked Lists
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;

    let a = headA;
    let b = headB;

    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }

    return a;
}

// ===== DOUBLY LINKED LIST =====

class DoublyNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(value) {
        const newNode = new DoublyNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.size++;
        return this;
    }

    prepend(value) {
        const newNode = new DoublyNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
        return this;
    }
}

// ===== TEST CASES =====
console.log('\n===== Linked List Tests =====\n');

const list = new LinkedList();
list.append(1).append(2).append(3).append(4).append(5);
console.log('Original List:');
list.print(); // 1 -> 2 -> 3 -> 4 -> 5

list.reverse();
console.log('Reversed List:');
list.print(); // 5 -> 4 -> 3 -> 2 -> 1

const list2 = new LinkedList();
list2.append(1).append(2).append(3).append(4).append(5);
const middle = findMiddle(list2.head);
console.log('Middle element:', middle.value); // 3
