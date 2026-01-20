# Algorithms - Interview Guide

Complete guide to algorithms with implementations and problem-solving strategies.

## Quick Reference

### Algorithm Time Complexities

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Sorting** |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) | Yes |
| **Searching** |
| Linear Search | O(1) | O(n) | O(n) | O(1) | - |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) | - |
| Jump Search | O(1) | O(√n) | O(√n) | O(1) | - |

*k = range of input, n = number of elements

## Study Plan

### Week 1: Sorting & Searching
- **Day 1-2**: Basic Sorting
  - Bubble, Selection, Insertion Sort
  - Understand when to use each

- **Day 3-4**: Advanced Sorting
  - Merge Sort, Quick Sort
  - Heap Sort
  - Practice: Sort Colors, Merge Intervals

- **Day 5-6**: Searching Algorithms
  - Binary Search and variations
  - Search in rotated array
  - Practice: Find Peak Element, Search 2D Matrix

- **Day 7**: Practice
  - Mixed sorting/searching problems

### Week 2: Recursion & Backtracking
- **Day 1-2**: Recursion Basics
  - Understanding call stack
  - Base cases and recursive cases
  - Practice: Fibonacci, Tower of Hanoi

- **Day 3-5**: Backtracking
  - N-Queens, Sudoku Solver
  - Generate Parentheses
  - Combination Sum

- **Day 6-7**: Divide and Conquer
  - Merge Sort, Quick Sort analysis
  - Practice: Maximum Subarray

### Week 3: Dynamic Programming
- **Day 1-2**: 1D DP
  - Fibonacci, Climbing Stairs
  - House Robber
  - Practice: Decode Ways, Jump Game

- **Day 3-4**: 2D DP
  - Longest Common Subsequence
  - Edit Distance
  - Practice: Unique Paths

- **Day 5-6**: Knapsack Problems
  - 0/1 Knapsack
  - Coin Change
  - Partition Equal Subset Sum

- **Day 7**: Advanced DP
  - LIS, Palindrome problems
  - Practice mixed DP problems

### Week 4: Greedy & Advanced
- **Day 1-2**: Greedy Algorithms
  - Activity Selection
  - Jump Game II
  - Practice: Gas Station

- **Day 3-4**: Graph Algorithms
  - DFS, BFS review
  - Dijkstra's Algorithm
  - Practice: Network Delay Time

- **Day 5-7**: Mixed Practice
  - Solve problems from all categories

## Algorithm Categories

### 1. Sorting Algorithms

**When to Use:**
- **Bubble/Selection/Insertion**: Small datasets, teaching purposes
- **Merge Sort**: Need stable sort, linked lists
- **Quick Sort**: Average case performance, in-place sorting
- **Heap Sort**: Guaranteed O(n log n), no extra space
- **Counting/Radix**: Integer arrays with limited range

**Key Problems:**
- Sort Colors (Dutch National Flag)
- Merge Intervals
- Kth Largest Element (Quick Select)
- Meeting Rooms II
- Largest Number

### 2. Searching Algorithms

**Binary Search Template:**
```javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

**Key Variations:**
- Find First/Last Occurrence
- Search in Rotated Sorted Array
- Find Peak Element
- Search 2D Matrix
- Find Minimum in Rotated Array

### 3. Dynamic Programming

**Approach:**
```
1. Define subproblem
2. Find recurrence relation
3. Identify base cases
4. Decide: Top-down (memoization) or Bottom-up (tabulation)
5. Optimize space if possible
```

**Common Patterns:**
- **Linear DP**: Fibonacci, House Robber, Decode Ways
- **2D DP**: LCS, Edit Distance, Unique Paths
- **Knapsack**: 0/1 Knapsack, Coin Change, Partition
- **Subsequence**: LIS, LCS
- **String**: Palindrome, Word Break

**Key Problems:**
- Climbing Stairs
- Coin Change (I & II)
- Longest Common Subsequence
- Longest Increasing Subsequence
- Edit Distance
- Word Break
- House Robber (I & II)
- Unique Paths
- Maximum Product Subarray
- Palindromic Substrings

### 4. Greedy Algorithms

**When to Use:**
- Local optimal choice leads to global optimal
- No need to reconsider previous choices
- Usually simpler than DP

**Key Problems:**
- Jump Game (I & II)
- Gas Station
- Partition Labels
- Task Scheduler
- Meeting Rooms

### 5. Two Pointers

**Patterns:**
- **Opposite Direction**: Two Sum (sorted), Container With Most Water
- **Same Direction**: Remove Duplicates, Move Zeros
- **Fast & Slow**: Linked List Cycle, Find Duplicate

**Key Problems:**
- Two Sum (sorted)
- 3Sum, 4Sum
- Container With Most Water
- Trapping Rain Water
- Remove Duplicates

### 6. Sliding Window

**Fixed Size Window:**
```javascript
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

**Variable Size Window:**
```javascript
function longestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

**Key Problems:**
- Maximum Sum Subarray of Size K
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Longest Substring with At Most K Distinct Characters
- Permutation in String

### 7. Recursion & Backtracking

**Backtracking Template:**
```javascript
function backtrack(state, choices) {
    if (isValidSolution(state)) {
        result.push([...state]);
        return;
    }

    for (let choice of choices) {
        // Make choice
        state.push(choice);

        // Recurse
        backtrack(state, getNextChoices());

        // Undo choice (backtrack)
        state.pop();
    }
}
```

**Key Problems:**
- Generate Parentheses
- Permutations & Combinations
- Subsets & Subsets II
- N-Queens
- Sudoku Solver
- Word Search
- Palindrome Partitioning

## Problem-Solving Patterns

### Pattern 1: Frequency Counter
**Use:** Compare frequencies of values
**Problems:** Anagrams, Two Sum variations

### Pattern 2: Multiple Pointers
**Use:** Search pairs in sorted array
**Problems:** Two Sum, 3Sum, Container With Most Water

### Pattern 3: Sliding Window
**Use:** Contiguous subarrays/substrings
**Problems:** Max subarray sum, Longest substring

### Pattern 4: Divide and Conquer
**Use:** Break into subproblems
**Problems:** Merge Sort, Binary Search

### Pattern 5: Dynamic Programming
**Use:** Overlapping subproblems
**Problems:** Fibonacci, Knapsack, LCS

### Pattern 6: Greedy
**Use:** Local optimal → Global optimal
**Problems:** Activity Selection, Jump Game

### Pattern 7: Binary Search
**Use:** Sorted data, search space reduction
**Problems:** Search in array, Find peak

## Top 50 Algorithm Problems

### Must Solve (Beginner)
1. Two Sum
2. Reverse String
3. Fibonacci Number
4. Valid Anagram
5. Maximum Subarray
6. Merge Two Sorted Lists
7. Binary Search
8. Climbing Stairs
9. Best Time to Buy and Sell Stock
10. Valid Palindrome

### Important (Intermediate)
11. 3Sum
12. Container With Most Water
13. Longest Substring Without Repeating Characters
14. Merge Intervals
15. Coin Change
16. Longest Common Subsequence
17. Word Break
18. Unique Paths
19. Jump Game
20. Sort Colors
21. Search in Rotated Sorted Array
22. Find Peak Element
23. Kth Largest Element
24. Top K Frequent Elements
25. Generate Parentheses
26. Permutations
27. Subsets
28. Combination Sum
29. Longest Increasing Subsequence
30. Edit Distance

### Advanced (Expert)
31. Median of Two Sorted Arrays
32. Trapping Rain Water
33. Largest Rectangle in Histogram
34. Minimum Window Substring
35. Regular Expression Matching
36. Wildcard Matching
37. Word Ladder
38. N-Queens
39. Sudoku Solver
40. Palindrome Partitioning
41. Word Search II
42. Maximum Product Subarray
43. House Robber II
44. Decode Ways
45. Partition Equal Subset Sum
46. Target Sum
47. Longest Palindromic Substring
48. Longest Palindromic Subsequence
49. Burst Balloons
50. Russian Doll Envelopes

## Interview Tips

### 1. Choosing the Right Algorithm

**Ask yourself:**
- Is the data sorted? → Binary Search
- Need all combinations? → Backtracking
- Overlapping subproblems? → DP
- Contiguous elements? → Sliding Window
- Finding pairs? → Two Pointers
- Local optimal works? → Greedy

### 2. Optimization Steps

```
1. Brute Force
   - Start with obvious solution
   - O(n²) or O(n³) is fine initially

2. Optimize
   - Can you eliminate redundant work?
   - Can you use a hash map?
   - Can you sort first?
   - Can you use binary search?

3. Walk Through Example
   - Use small input
   - Trace algorithm step by step
   - Verify correctness

4. Analyze Complexity
   - Time: Count nested loops, recursion depth
   - Space: Extra data structures, recursion stack
```

### 3. Common Mistakes to Avoid

- Off-by-one errors in loops
- Integer overflow (use `Math.floor` for division)
- Not handling edge cases (empty array, single element)
- Forgetting to return value
- Mutating input when not allowed
- Not considering negative numbers
- Assuming sorted when not mentioned

### 4. Communication Tips

**During Interview:**
1. Restate the problem
2. Ask clarifying questions
3. Discuss approach before coding
4. Think out loud
5. Test with examples
6. Discuss time/space complexity

**Example:**
```
"I'll use a sliding window approach because we need to find
contiguous elements. This will be O(n) time with O(1) space.
Let me walk through an example first..."
```

## Running the Examples

```bash
# Sorting
node 06-algorithms/sorting/index.js

# Searching
node 06-algorithms/searching/index.js

# Dynamic Programming
node 06-algorithms/dynamic-programming/index.js
```

## Resources

**Online Judges:**
- LeetCode (Most comprehensive)
- Codeforces (Competitive programming)
- HackerRank
- CodeChef

**Books:**
- Introduction to Algorithms (CLRS)
- Algorithm Design Manual (Skiena)
- Grokking Algorithms (Bhargava)

**Video Courses:**
- NeetCode (Problem patterns)
- Abdul Bari (Algorithm explanations)
- MIT OpenCourseWare (6.006)

**Websites:**
- VisuAlgo (Algorithm visualizations)
- Big-O Cheat Sheet
- LeetCode Patterns

## Practice Schedule

**Daily:**
- 2-3 problems per day
- Focus on understanding, not speed
- Review solutions even if you solve it

**Weekly:**
- 1-2 hard problems
- Revisit old problems
- Mock interview practice

**Before Interview:**
- Review top patterns
- Practice on whiteboard
- Time yourself

## Quick Prep Checklist

- [ ] Know all sorting algorithms
- [ ] Master binary search and variations
- [ ] Can solve 1D and 2D DP problems
- [ ] Understand backtracking template
- [ ] Comfortable with two pointers
- [ ] Can implement sliding window
- [ ] Solved top 50 problems
- [ ] Practiced on whiteboard
- [ ] Can explain time/space complexity
- [ ] Mock interview completed

## Remember

> "Understand the pattern, not just the problem. One pattern unlocks hundreds of problems."

**Focus Areas:**
1. Pattern Recognition
2. Time/Space Complexity Analysis
3. Edge Case Handling
4. Clean Code & Communication

Happy Coding! 🚀
