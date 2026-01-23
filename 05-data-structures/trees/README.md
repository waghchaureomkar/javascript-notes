# Trees - Complete Guide

> **Hierarchical Data Structure**
> Non-linear structure with root, branches, and leaves

---

## Table of Contents

1. [Tree Basics](#tree-basics)
2. [Binary Tree](#binary-tree)
3. [Binary Search Tree](#binary-search-tree)
4. [Tree Traversals](#tree-traversals)
5. [Common Patterns](#common-patterns)
6. [Top Interview Problems](#top-interview-problems)
7. [Trie](#trie)
8. [Practice Problems](#practice-problems)

---

## Tree Basics

### What is a Tree?

A **hierarchical** data structure with nodes connected by edges.

```
        1          ← Root
       / \
      2   3        ← Children of 1
     / \   \
    4   5   6      ← Leaves (no children)
```

### Tree Terminology

- **Root**: Top node (no parent)
- **Parent**: Node with children
- **Child**: Node with parent
- **Leaf**: Node with no children
- **Sibling**: Nodes with same parent
- **Ancestor**: Parent, grandparent, etc.
- **Descendant**: Child, grandchild, etc.
- **Height**: Longest path from node to leaf
- **Depth**: Path from root to node
- **Level**: Depth + 1

### Types of Trees

1. **Binary Tree**: Max 2 children per node
2. **Binary Search Tree (BST)**: Left < Parent < Right
3. **AVL Tree**: Self-balancing BST
4. **Red-Black Tree**: Self-balancing BST
5. **B-Tree**: Multi-way search tree
6. **Trie**: Prefix tree for strings
7. **Heap**: Complete binary tree

---

## Binary Tree

### Node Structure

```javascript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
```

### Types of Binary Trees

#### 1. Full Binary Tree
Every node has 0 or 2 children.

```
        1
       / \
      2   3
     / \
    4   5
```

#### 2. Complete Binary Tree
All levels filled except last, filled left to right.

```
        1
       / \
      2   3
     / \  /
    4  5 6
```

#### 3. Perfect Binary Tree
All internal nodes have 2 children, all leaves at same level.

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

#### 4. Balanced Binary Tree
Height difference between left and right ≤ 1.

```
        1
       / \
      2   3
     /
    4
```

---

## Binary Search Tree

### Properties

For every node:
- **Left subtree** values < node value
- **Right subtree** values > node value
- Both subtrees are BSTs

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

### Implementation

```javascript
class BST {
    constructor() {
        this.root = null;
    }

    // Insert - O(log n) average, O(n) worst
    insert(value) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) return undefined;

            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Search - O(log n) average, O(n) worst
    search(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }

        return false;
    }

    // Delete - O(log n)
    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // Case 1: No children
            if (!node.left && !node.right) return null;

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children
            let minRight = node.right;
            while (minRight.left) minRight = minRight.left;

            node.value = minRight.value;
            node.right = this._deleteNode(node.right, minRight.value);
        }

        return node;
    }
}
```

---

## Tree Traversals

### 1. Depth-First Search (DFS)

#### Inorder (Left → Root → Right)

Gives **sorted order** for BST.

```javascript
function inorder(root, result = []) {
    if (!root) return result;

    inorder(root.left, result);
    result.push(root.value);
    inorder(root.right, result);

    return result;
}

// BST: [4, 6, 7, 8, 10, 13, 14]
```

**Use:** Get sorted values from BST

#### Preorder (Root → Left → Right)

```javascript
function preorder(root, result = []) {
    if (!root) return result;

    result.push(root.value);
    preorder(root.left, result);
    preorder(root.right, result);

    return result;
}

// Result: [8, 3, 1, 6, 4, 7, 10, 14, 13]
```

**Use:** Copy tree, prefix expression

#### Postorder (Left → Right → Root)

```javascript
function postorder(root, result = []) {
    if (!root) return result;

    postorder(root.left, result);
    postorder(root.right, result);
    result.push(root.value);

    return result;
}

// Result: [1, 4, 7, 6, 3, 13, 14, 10, 8]
```

**Use:** Delete tree, postfix expression

### 2. Breadth-First Search (BFS)

Level-order traversal.

```javascript
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

// Result: [[8], [3, 10], [1, 6, 14], [4, 7, 13]]
```

---

## Common Patterns

### 1. Recursive DFS

```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

### 2. Iterative BFS

```javascript
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        const level = [];
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}
```

### 3. Path Tracking

```javascript
function hasPathSum(root, targetSum) {
    if (!root) return false;

    if (!root.left && !root.right) {
        return targetSum === root.value;
    }

    return hasPathSum(root.left, targetSum - root.value) ||
           hasPathSum(root.right, targetSum - root.value);
}
```

### 4. Parent-Child Relationship

```javascript
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    return left || right;
}
```

---

## Top Interview Problems

### 1. Maximum Depth

```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

**Time:** O(n) | **Space:** O(h)

### 2. Validate BST

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;

    if (root.value <= min || root.value >= max) {
        return false;
    }

    return isValidBST(root.left, min, root.value) &&
           isValidBST(root.right, root.value, max);
}
```

**Time:** O(n) | **Space:** O(h)

### 3. Invert Binary Tree

```javascript
function invertTree(root) {
    if (!root) return null;

    [root.left, root.right] = [root.right, root.left];

    invertTree(root.left);
    invertTree(root.right);

    return root;
}
```

**Time:** O(n) | **Space:** O(h)

### 4. Lowest Common Ancestor

```javascript
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    return left || right;
}
```

**Time:** O(n) | **Space:** O(h)

### 5. Symmetric Tree

```javascript
function isSymmetric(root) {
    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;

        return t1.value === t2.value &&
               isMirror(t1.left, t2.right) &&
               isMirror(t1.right, t2.left);
    }

    return !root || isMirror(root.left, root.right);
}
```

**Time:** O(n) | **Space:** O(h)

### 6. Diameter of Binary Tree

```javascript
function diameterOfBinaryTree(root) {
    let diameter = 0;

    function height(node) {
        if (!node) return 0;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        diameter = Math.max(diameter, leftHeight + rightHeight);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    height(root);
    return diameter;
}
```

**Time:** O(n) | **Space:** O(h)

### 7. Kth Smallest in BST

```javascript
function kthSmallest(root, k) {
    const result = [];

    function inorder(node) {
        if (!node || result.length >= k) return;

        inorder(node.left);
        result.push(node.value);
        inorder(node.right);
    }

    inorder(root);
    return result[k - 1];
}
```

**Time:** O(n) | **Space:** O(h)

---

## Trie

### What is a Trie?

A **prefix tree** for storing strings efficiently.

```
        root
       /  |  \
      c   d   t
     /    |    \
    a     o     o
   / \    |      \
  r   t   g       p
```

### Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert - O(m) where m = word length
    insert(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;
    }

    // Search - O(m)
    search(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }

        return node.isEndOfWord;
    }

    // Starts with prefix - O(m)
    startsWith(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }

        return true;
    }
}
```

---

## Practice Problems

### Easy
1. Maximum Depth of Binary Tree
2. Invert Binary Tree
3. Merge Two Binary Trees
4. Path Sum
5. Same Tree

### Medium
6. Validate Binary Search Tree
7. Lowest Common Ancestor
8. Binary Tree Level Order Traversal
9. Construct Binary Tree from Traversals
10. Kth Smallest Element in BST

### Hard
11. Serialize and Deserialize Binary Tree
12. Binary Tree Maximum Path Sum
13. Recover Binary Search Tree
14. Word Search II (Trie)
15. Count of Smaller Numbers After Self

---

## Interview Tips

### Key Patterns

1. **DFS**: Most tree problems
2. **BFS**: Level-order, shortest path
3. **Recursion**: Natural fit for trees
4. **BST Property**: Left < Root < Right

### Edge Cases

```javascript
// Always test:
- Empty tree: null
- Single node: root only
- Skewed tree: all left or all right
- Perfect tree: completely balanced
```

### Traversal Choice

| Need | Use |
|------|-----|
| Sorted values | Inorder (BST) |
| Copy tree | Preorder |
| Delete tree | Postorder |
| Level by level | BFS |

---

## Complexity Cheat Sheet

### BST
```
Search:  O(log n) avg, O(n) worst
Insert:  O(log n) avg, O(n) worst
Delete:  O(log n) avg, O(n) worst
Space:   O(n)
```

### Traversals
```
DFS: O(n) time, O(h) space
BFS: O(n) time, O(w) space (w = max width)
```

---

## Quick Reference

```javascript
// Node
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// DFS Template
function dfs(root) {
    if (!root) return;
    // Process root
    dfs(root.left);
    dfs(root.right);
}

// BFS Template
function bfs(root) {
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        // Process node
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}

// Max Depth
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

---

**Trees are everywhere - master recursion!** 🌳
