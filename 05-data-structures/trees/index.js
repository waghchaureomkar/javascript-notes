/**
 * TREES - Data Structure
 * Hierarchical data structure with root and children
 */

// ===== BINARY TREE NODE =====

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// ===== BINARY TREE TRAVERSALS =====

// 1. Depth First Search (DFS)

// Inorder: Left -> Root -> Right (gives sorted order in BST)
function inorderTraversal(root, result = []) {
    if (!root) return result;

    inorderTraversal(root.left, result);
    result.push(root.value);
    inorderTraversal(root.right, result);

    return result;
}

// Preorder: Root -> Left -> Right
function preorderTraversal(root, result = []) {
    if (!root) return result;

    result.push(root.value);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);

    return result;
}

// Postorder: Left -> Right -> Root
function postorderTraversal(root, result = []) {
    if (!root) return result;

    postorderTraversal(root.left, result);
    postorderTraversal(root.right, result);
    result.push(root.value);

    return result;
}

// 2. Breadth First Search (BFS) / Level Order
function levelOrderTraversal(root) {
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

// ===== BINARY SEARCH TREE (BST) =====

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert: O(log n) average, O(n) worst
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

    // Search: O(log n) average, O(n) worst
    search(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }

        return false;
    }

    // Delete: O(log n)
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
            // Node to delete found

            // Case 1: No children
            if (!node.left && !node.right) {
                return null;
            }

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children
            // Find minimum in right subtree
            let minRight = node.right;
            while (minRight.left) {
                minRight = minRight.left;
            }

            node.value = minRight.value;
            node.right = this._deleteNode(node.right, minRight.value);
        }

        return node;
    }

    // Find Min/Max
    findMin() {
        let current = this.root;
        while (current && current.left) {
            current = current.left;
        }
        return current ? current.value : null;
    }

    findMax() {
        let current = this.root;
        while (current && current.right) {
            current = current.right;
        }
        return current ? current.value : null;
    }
}

// ===== AVL TREE (Self-Balancing BST) =====

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // New node has height 1
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Get height of node
    getHeight(node) {
        return node ? node.height : 0;
    }

    // Get balance factor
    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Update height of node
    updateHeight(node) {
        if (node) {
            node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        }
    }

    // Right rotation
    //       y                     x
    //      / \                   / \
    //     x   C    -->          A   y
    //    / \                       / \
    //   A   B                     B   C
    rotateRight(y) {
        const x = y.left;
        const B = x.right;

        // Perform rotation
        x.right = y;
        y.left = B;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x; // New root
    }

    // Left rotation
    //     x                       y
    //    / \                     / \
    //   A   y      -->          x   C
    //      / \                 / \
    //     B   C               A   B
    rotateLeft(x) {
        const y = x.right;
        const B = y.left;

        // Perform rotation
        y.left = x;
        x.right = B;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y; // New root
    }

    // Insert node
    insert(value) {
        this.root = this._insertNode(this.root, value);
    }

    _insertNode(node, value) {
        // 1. Perform standard BST insertion
        if (!node) return new AVLNode(value);

        if (value < node.value) {
            node.left = this._insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertNode(node.right, value);
        } else {
            return node; // Duplicate values not allowed
        }

        // 2. Update height
        this.updateHeight(node);

        // 3. Get balance factor
        const balance = this.getBalance(node);

        // 4. Balance the tree (4 cases)

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Search in AVL tree
    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // Delete node
    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        // 1. Perform standard BST delete
        if (!node) return null;

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // Node to delete found

            // Case 1 & 2: Node with 0 or 1 child
            if (!node.left || !node.right) {
                return node.left || node.right;
            }

            // Case 3: Node with 2 children
            // Get inorder successor (smallest in right subtree)
            let minRight = node.right;
            while (minRight.left) {
                minRight = minRight.left;
            }

            node.value = minRight.value;
            node.right = this._deleteNode(node.right, minRight.value);
        }

        // 2. Update height
        this.updateHeight(node);

        // 3. Get balance factor
        const balance = this.getBalance(node);

        // 4. Balance the tree (4 cases)

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Inorder traversal (gives sorted order)
    inorder(node = this.root, result = []) {
        if (!node) return result;
        this.inorder(node.left, result);
        result.push(node.value);
        this.inorder(node.right, result);
        return result;
    }

    // Check if tree is balanced
    isBalanced(node = this.root) {
        if (!node) return true;

        const balance = Math.abs(this.getBalance(node));
        return balance <= 1 &&
               this.isBalanced(node.left) &&
               this.isBalanced(node.right);
    }
}

// ===== COMMON TREE PROBLEMS =====

// 1. Maximum Depth of Binary Tree
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 2. Validate Binary Search Tree
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;

    if (root.value <= min || root.value >= max) {
        return false;
    }

    return isValidBST(root.left, min, root.value) &&
           isValidBST(root.right, root.value, max);
}

// 3. Invert Binary Tree
function invertTree(root) {
    if (!root) return null;

    [root.left, root.right] = [root.right, root.left];

    invertTree(root.left);
    invertTree(root.right);

    return root;
}

// 4. Lowest Common Ancestor
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    return left || right;
}

// 5. Path Sum
function hasPathSum(root, targetSum) {
    if (!root) return false;

    if (!root.left && !root.right) {
        return targetSum === root.value;
    }

    return hasPathSum(root.left, targetSum - root.value) ||
           hasPathSum(root.right, targetSum - root.value);
}

// 6. Symmetric Tree
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

// 7. Diameter of Binary Tree
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

// 8. Binary Tree Right Side View
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (i === levelSize - 1) {
                result.push(node.value);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

// 9. Kth Smallest Element in BST
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

// 8. Check if Binary Tree is Balanced
// Method 1: Naive approach - checks height multiple times
function isBalanced(root) {
    if (!root) return true;

    function getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);

    return Math.abs(leftHeight - rightHeight) <= 1 &&
           isBalanced(root.left) &&
           isBalanced(root.right);
}

// Method 2: Optimized - single pass, O(n) time
function isBalancedOptimized(root) {
    function checkHeight(node) {
        // Base case: empty node has height 0
        if (!node) return 0;

        // Check left subtree
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // Left subtree is unbalanced

        // Check right subtree
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // Right subtree is unbalanced

        // Check if current node is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Current node is unbalanced
        }

        // Return height of current node
        return 1 + Math.max(leftHeight, rightHeight);
    }

    return checkHeight(root) !== -1;
}

// 10. Serialize and Deserialize Binary Tree
function serialize(root) {
    if (!root) return 'null';

    const left = serialize(root.left);
    const right = serialize(root.right);

    return `${root.value},${left},${right}`;
}

function deserialize(data) {
    const values = data.split(',');

    function buildTree() {
        const val = values.shift();

        if (val === 'null') return null;

        const node = new TreeNode(Number(val));
        node.left = buildTree();
        node.right = buildTree();

        return node;
    }

    return buildTree();
}

// 11. Construct Binary Tree from Inorder and Preorder
function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;

    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    const mid = inorder.indexOf(rootVal);

    root.left = buildTree(
        preorder.slice(1, mid + 1),
        inorder.slice(0, mid)
    );

    root.right = buildTree(
        preorder.slice(mid + 1),
        inorder.slice(mid + 1)
    );

    return root;
}

// ===== TRIE (Prefix Tree) =====

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

    // Insert: O(m) where m is word length
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

    // Search: O(m)
    search(word) {
        let node = this.root;

        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        return node.isEndOfWord;
    }

    // Starts with prefix: O(m)
    startsWith(prefix) {
        let node = this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        return true;
    }
}

// ===== TEST CASES =====
console.log('\n===== Tree Tests =====\n');

// Create a sample tree:
//       5
//      / \
//     3   7
//    / \   \
//   2   4   8

const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(8);

console.log('Inorder:', inorderTraversal(bst.root));    // [2, 3, 4, 5, 7, 8]
console.log('Preorder:', preorderTraversal(bst.root));  // [5, 3, 2, 4, 7, 8]
console.log('Postorder:', postorderTraversal(bst.root)); // [2, 4, 3, 8, 7, 5]
console.log('Level Order:', levelOrderTraversal(bst.root)); // [[5], [3, 7], [2, 4, 8]]
console.log('Max Depth:', maxDepth(bst.root)); // 3
console.log('Is Valid BST:', isValidBST(bst.root)); // true

// Trie
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
console.log('\nTrie Search "apple":', trie.search('apple')); // true
console.log('Trie Search "app":', trie.search('app')); // true
console.log('Trie Starts With "app":', trie.startsWith('app')); // true

// Test Balanced Binary Tree
console.log('\n===== Balanced Binary Tree Tests =====\n');

// Balanced tree:
//       1
//      / \
//     2   3
//    /
//   4
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
balanced.left.left = new TreeNode(4);

console.log('Balanced Tree (Method 1):', isBalanced(balanced)); // true
console.log('Balanced Tree (Optimized):', isBalancedOptimized(balanced)); // true

// Unbalanced tree:
//       1
//      /
//     2
//    /
//   3
//  /
// 4
const unbalanced = new TreeNode(1);
unbalanced.left = new TreeNode(2);
unbalanced.left.left = new TreeNode(3);
unbalanced.left.left.left = new TreeNode(4);

console.log('\nUnbalanced Tree (Method 1):', isBalanced(unbalanced)); // false
console.log('Unbalanced Tree (Optimized):', isBalancedOptimized(unbalanced)); // false

// Perfectly balanced tree:
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7
const perfect = new TreeNode(1);
perfect.left = new TreeNode(2);
perfect.right = new TreeNode(3);
perfect.left.left = new TreeNode(4);
perfect.left.right = new TreeNode(5);
perfect.right.left = new TreeNode(6);
perfect.right.right = new TreeNode(7);

console.log('\nPerfect Tree (Method 1):', isBalanced(perfect)); // true
console.log('Perfect Tree (Optimized):', isBalancedOptimized(perfect)); // true

// Test AVL Tree (Self-Balancing)
console.log('\n===== AVL Tree (Self-Balancing BST) Tests =====\n');

const avl = new AVLTree();

// Insert nodes
console.log('Inserting: 10, 20, 30, 40, 50, 25');
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log('AVL Tree (Inorder):', avl.inorder()); // [10, 20, 25, 30, 40, 50]
console.log('Is Balanced:', avl.isBalanced()); // true
console.log('Root Value:', avl.root.value); // Should be balanced root
console.log('Root Height:', avl.root.height);

// Search
console.log('\nSearch 30:', avl.search(30)); // true
console.log('Search 100:', avl.search(100)); // false

// Delete
console.log('\nDeleting 20...');
avl.delete(20);
console.log('AVL Tree (Inorder):', avl.inorder()); // [10, 25, 30, 40, 50]
console.log('Is Balanced after delete:', avl.isBalanced()); // true

// Compare with regular BST (unbalanced)
console.log('\n===== Comparison: AVL vs Regular BST =====');
console.log('\nRegular BST with same insertions (10, 20, 30, 40, 50):');
const regularBST = new BinarySearchTree();
[10, 20, 30, 40, 50].forEach(val => regularBST.insert(val));
console.log('Regular BST Height:', maxDepth(regularBST.root)); // 5 (unbalanced)
console.log('Is Balanced:', isBalancedOptimized(regularBST.root)); // false

const avl2 = new AVLTree();
[10, 20, 30, 40, 50].forEach(val => avl2.insert(val));
console.log('\nAVL Tree Height:', avl2.root.height); // ~3 (balanced)
console.log('Is Balanced:', avl2.isBalanced()); // true

console.log('\n===== All Tests Complete! =====');
