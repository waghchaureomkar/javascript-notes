# Data Structures - Interview Guide

Complete guide to Data Structures with implementations and common interview problems.

## Quick Reference

### Time Complexities

| Data Structure | Access | Search | Insert | Delete | Space |
|---------------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) | O(n) |
| Hash Table | - | O(1)* | O(1)* | O(1)* | O(n) |
| Binary Search Tree | O(log n)* | O(log n)* | O(log n)* | O(log n)* | O(n) |
| Binary Tree | O(n) | O(n) | O(n) | O(n) | O(n) |
| Heap | - | O(n) | O(log n) | O(log n) | O(n) |
| Trie | - | O(k) | O(k) | O(k) | O(n*k) |

*Average case. Worst case can be O(n).

## Study Plan

### Week 1: Linear Data Structures
- **Day 1-2**: Arrays
  - Basic operations
  - Two pointers technique
  - Sliding window
  - Practice: Two Sum, Maximum Subarray, Move Zeros

- **Day 3-4**: Linked Lists
  - Singly & Doubly linked lists
  - Fast & slow pointers
  - Practice: Reverse List, Detect Cycle, Merge Lists

- **Day 5-6**: Stacks & Queues
  - Implementation using arrays/linked lists
  - Monotonic stack/queue
  - Practice: Valid Parentheses, Min Stack, Daily Temperatures

- **Day 7**: Review & Practice
  - Solve mixed problems
  - Implement all structures from memory

### Week 2: Trees & Advanced Structures
- **Day 1-3**: Binary Trees & BST
  - Tree traversals (DFS, BFS)
  - BST operations
  - Practice: Validate BST, LCA, Path Sum

- **Day 4-5**: Advanced Trees
  - Trie, Segment Tree, Fenwick Tree
  - Practice: Implement Trie, Word Search

- **Day 6-7**: Graphs
  - Graph representations
  - BFS, DFS, Topological Sort
  - Practice: Number of Islands, Course Schedule

### Week 3: Hash Tables & Heaps
- **Day 1-2**: Hash Tables
  - Hash function, collision handling
  - Practice: Group Anagrams, LRU Cache

- **Day 3-4**: Heaps & Priority Queues
  - Min/Max heap operations
  - Practice: Kth Largest, Merge K Sorted Lists

- **Day 5-7**: Mixed Practice
  - Solve problems combining multiple structures

## Common Interview Problems by Structure

### Arrays (Must Practice)
1. Two Sum
2. Best Time to Buy and Sell Stock
3. Maximum Subarray (Kadane's Algorithm)
4. Contains Duplicate
5. Product of Array Except Self
6. Move Zeros
7. Rotate Array
8. Find Missing Number
9. Remove Duplicates from Sorted Array
10. Merge Sorted Array

### Linked Lists (Must Practice)
1. Reverse Linked List
2. Merge Two Sorted Lists
3. Linked List Cycle Detection
4. Remove Nth Node From End
5. Middle of Linked List
6. Palindrome Linked List
7. Intersection of Two Linked Lists
8. Add Two Numbers
9. Copy List with Random Pointer
10. Flatten a Multilevel Doubly Linked List

### Stacks & Queues (Must Practice)
1. Valid Parentheses
2. Min Stack
3. Evaluate Reverse Polish Notation
4. Daily Temperatures
5. Next Greater Element
6. Largest Rectangle in Histogram
7. Implement Queue using Stacks
8. Implement Stack using Queues
9. Sliding Window Maximum
10. Decode String

### Trees (Must Practice)
1. Maximum Depth of Binary Tree
2. Validate Binary Search Tree
3. Invert Binary Tree
4. Lowest Common Ancestor
5. Binary Tree Level Order Traversal
6. Symmetric Tree
7. Path Sum
8. Serialize and Deserialize Binary Tree
9. Kth Smallest Element in BST
10. Binary Tree Right Side View
11. Diameter of Binary Tree
12. Maximum Path Sum
13. Construct Binary Tree from Traversals
14. Flatten Binary Tree to Linked List
15. Count Complete Tree Nodes

### Trie (Must Practice)
1. Implement Trie (Prefix Tree)
2. Word Search II
3. Design Add and Search Words Data Structure
4. Replace Words
5. Longest Word in Dictionary

## Tips for Interviews

### 1. Problem-Solving Approach
```
1. Understand the problem
   - Ask clarifying questions
   - Identify inputs and outputs
   - Consider edge cases

2. Plan your approach
   - Think of data structure that fits
   - Discuss time/space complexity
   - Start with brute force, then optimize

3. Implement
   - Write clean, readable code
   - Use meaningful variable names
   - Handle edge cases

4. Test
   - Walk through your code
   - Test with examples
   - Check edge cases

5. Optimize
   - Analyze complexity
   - Discuss trade-offs
   - Suggest improvements
```

### 2. Common Patterns

**Two Pointers**
- Use when you need to find pairs or compare elements
- Examples: Two Sum (sorted), Remove Duplicates, Container With Most Water

**Fast & Slow Pointers**
- Cycle detection in linked list
- Finding middle element
- Examples: Linked List Cycle, Happy Number

**Sliding Window**
- Fixed or variable size window
- Examples: Maximum Sum Subarray, Longest Substring Without Repeating

**Monotonic Stack/Queue**
- Maintain increasing/decreasing order
- Examples: Next Greater Element, Largest Rectangle

**DFS (Recursion/Stack)**
- Tree/graph traversal
- Backtracking problems
- Examples: All tree traversals, Path Sum

**BFS (Queue)**
- Level-order traversal
- Shortest path in unweighted graph
- Examples: Binary Tree Level Order, Word Ladder

### 3. Space-Time Tradeoffs

**Using Extra Space for Speed:**
- Hash map for O(1) lookup → Two Sum
- DP array to avoid recomputation → Fibonacci
- Visited set in graph → DFS/BFS

**Optimizing Space:**
- Two pointers instead of extra array
- Constant space solution over hash map
- In-place modifications

### 4. Edge Cases to Consider

**Arrays:**
- Empty array
- Single element
- All same elements
- Sorted vs unsorted
- Duplicates

**Linked Lists:**
- Empty list (null head)
- Single node
- Cycle presence
- Even/odd length

**Trees:**
- Empty tree (null root)
- Single node
- Skewed tree (all left/right)
- Balanced vs unbalanced

**Strings:**
- Empty string
- Single character
- All same characters
- Special characters

## Running the Examples

```bash
# Arrays
node 05-data-structures/arrays/index.js

# Linked Lists
node 05-data-structures/linked-lists/index.js

# Stacks & Queues
node 05-data-structures/stacks-queues/index.js

# Trees
node 05-data-structures/trees/index.js
```

## Resources

**Practice Platforms:**
- LeetCode (Most popular)
- HackerRank
- CodeSignal
- Pramp (Mock interviews)

**Books:**
- Cracking the Coding Interview
- Elements of Programming Interviews
- Algorithm Design Manual

**Videos:**
- NeetCode (YouTube)
- Abdul Bari (Algorithms)
- mycodeschool (Data Structures)

## Quick Interview Prep Checklist

- [ ] Can implement all basic structures from scratch
- [ ] Know time/space complexity of all operations
- [ ] Solved top 10 problems for each structure
- [ ] Can explain trade-offs between structures
- [ ] Practiced coding on whiteboard/paper
- [ ] Can handle edge cases consistently
- [ ] Understand common patterns (two pointers, sliding window, etc.)
- [ ] Mock interview practice completed

## Remember

> "The best way to learn data structures is to implement them yourself and solve problems using them."

**Focus on:**
1. Understanding > Memorization
2. Why a structure works > Just how it works
3. Pattern recognition > Individual problems
4. Communication > Just coding

Good luck with your preparation! 🚀
