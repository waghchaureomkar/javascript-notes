# Greedy Algorithms - Complete Guide

> **Make Locally Optimal Choices**
> Choose the best option at each step to find global optimum

---

## Table of Contents

1. [Greedy Basics](#greedy-basics)
2. [Greedy vs DP](#greedy-vs-dp)
3. [Common Greedy Patterns](#common-greedy-patterns)
4. [Classic Greedy Problems](#classic-greedy-problems)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Greedy Basics

### What is Greedy Algorithm?

An approach that makes the **locally optimal choice** at each step, hoping to find a **global optimum**.

**Key idea:** Make the best decision now without worrying about future consequences.

### When Does Greedy Work?

Greedy works when the problem has:
1. **Greedy Choice Property**: Local optimum leads to global optimum
2. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems

**Warning:** Greedy doesn't always work! Need to prove correctness.

### Greedy vs Brute Force

```javascript
// Coin Change (Greedy may fail!)
// Coins: [1, 3, 4], Target: 6

// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins ❌

// Greedy works for standard coins: [1, 5, 10, 25]
```

---

## Greedy vs DP

| Greedy | Dynamic Programming |
|--------|---------------------|
| Makes one choice at each step | Explores all possibilities |
| Never reconsiders | May reconsider choices |
| O(n) or O(n log n) | O(n²) or higher |
| Works for specific problems | Works for more problems |
| Example: Activity Selection | Example: 0/1 Knapsack |

---

## Common Greedy Patterns

### 1. Activity Selection

Choose maximum non-overlapping activities.

```javascript
function activitySelection(start, end) {
    const n = start.length;
    const activities = [];

    for (let i = 0; i < n; i++) {
        activities.push({ start: start[i], end: end[i], index: i });
    }

    // Sort by end time
    activities.sort((a, b) => a.end - b.end);

    const result = [activities[0].index];
    let lastEnd = activities[0].end;

    for (let i = 1; i < n; i++) {
        if (activities[i].start >= lastEnd) {
            result.push(activities[i].index);
            lastEnd = activities[i].end;
        }
    }

    return result;
}

const start = [1, 3, 0, 5, 8, 5];
const end = [2, 4, 6, 7, 9, 9];
console.log(activitySelection(start, end)); // [0, 1, 3, 4]
```

**Time:** O(n log n) | **Space:** O(n)

**Strategy:** Always pick activity that finishes first

### 2. Fractional Knapsack

```javascript
function fractionalKnapsack(weights, values, capacity) {
    const n = weights.length;
    const items = [];

    for (let i = 0; i < n; i++) {
        items.push({
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i]
        });
    }

    // Sort by value/weight ratio (descending)
    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (let item of items) {
        if (remainingCapacity >= item.weight) {
            // Take whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Take fraction
            totalValue += item.ratio * remainingCapacity;
            break;
        }
    }

    return totalValue;
}

console.log(fractionalKnapsack([10, 20, 30], [60, 100, 120], 50));
// 240
```

**Time:** O(n log n) | **Space:** O(n)

**Strategy:** Pick items with highest value/weight ratio

### 3. Huffman Coding

Build optimal prefix-free binary code.

```javascript
class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function huffmanCoding(chars, freqs) {
    const n = chars.length;
    const heap = [];

    // Create leaf nodes
    for (let i = 0; i < n; i++) {
        heap.push(new Node(chars[i], freqs[i]));
    }

    // Build tree (simplified - use real min heap)
    while (heap.length > 1) {
        heap.sort((a, b) => a.freq - b.freq);

        const left = heap.shift();
        const right = heap.shift();

        const parent = new Node(null, left.freq + right.freq);
        parent.left = left;
        parent.right = right;

        heap.push(parent);
    }

    const codes = {};

    function getCodes(node, code = '') {
        if (!node) return;

        if (node.char !== null) {
            codes[node.char] = code;
            return;
        }

        getCodes(node.left, code + '0');
        getCodes(node.right, code + '1');
    }

    getCodes(heap[0]);
    return codes;
}

const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
const freqs = [5, 9, 12, 13, 16, 45];
console.log(huffmanCoding(chars, freqs));
// { f: '0', c: '100', d: '101', a: '1100', b: '1101', e: '111' }
```

**Time:** O(n log n) | **Space:** O(n)

---

## Classic Greedy Problems

### 1. Minimum Coins

```javascript
function minCoins(coins, amount) {
    coins.sort((a, b) => b - a); // Descending
    let count = 0;

    for (let coin of coins) {
        if (amount === 0) break;

        count += Math.floor(amount / coin);
        amount %= coin;
    }

    return amount === 0 ? count : -1;
}

console.log(minCoins([1, 5, 10, 25], 63)); // 6 (25+25+10+1+1+1)
```

**Time:** O(n log n) | **Space:** O(1)

**Note:** Only works for standard coin systems!

### 2. Job Sequencing

```javascript
function jobSequencing(jobs) {
    // jobs = [{id, deadline, profit}]
    jobs.sort((a, b) => b.profit - a.profit);

    const maxDeadline = Math.max(...jobs.map(j => j.deadline));
    const slots = Array(maxDeadline).fill(null);
    let totalProfit = 0;

    for (let job of jobs) {
        for (let i = job.deadline - 1; i >= 0; i--) {
            if (slots[i] === null) {
                slots[i] = job.id;
                totalProfit += job.profit;
                break;
            }
        }
    }

    return { schedule: slots.filter(s => s !== null), totalProfit };
}

const jobs = [
    { id: 'a', deadline: 2, profit: 100 },
    { id: 'b', deadline: 1, profit: 19 },
    { id: 'c', deadline: 2, profit: 27 },
    { id: 'd', deadline: 1, profit: 25 },
    { id: 'e', deadline: 3, profit: 15 }
];

console.log(jobSequencing(jobs));
// { schedule: ['d', 'a', 'e'], totalProfit: 140 }
```

**Time:** O(n²) | **Space:** O(n)

### 3. Minimum Platforms

```javascript
function minPlatforms(arrivals, departures) {
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);

    let platforms = 0;
    let maxPlatforms = 0;
    let i = 0, j = 0;

    while (i < arrivals.length) {
        if (arrivals[i] <= departures[j]) {
            platforms++;
            maxPlatforms = Math.max(maxPlatforms, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }

    return maxPlatforms;
}

console.log(minPlatforms([900, 940, 950, 1100, 1500, 1800],
                         [910, 1200, 1120, 1130, 1900, 2000]));
// 3
```

**Time:** O(n log n) | **Space:** O(1)

---

## Top Interview Problems

### 1. Jump Game

```javascript
function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false
```

**Time:** O(n) | **Space:** O(1)

### 2. Jump Game II (Minimum Jumps)

```javascript
function jump(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}

console.log(jump([2, 3, 1, 1, 4])); // 2
```

**Time:** O(n) | **Space:** O(1)

### 3. Gas Station

```javascript
function canCompleteCircuit(gas, cost) {
    let totalGas = 0;
    let totalCost = 0;
    let tank = 0;
    let start = 0;

    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        tank += gas[i] - cost[i];

        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return totalGas >= totalCost ? start : -1;
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
// 3
```

**Time:** O(n) | **Space:** O(1)

### 4. Meeting Rooms II

```javascript
function minMeetingRooms(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0;
    let endPtr = 0;

    for (let i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }

    return rooms;
}

console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]));
// 2
```

**Time:** O(n log n) | **Space:** O(n)

### 5. Non-overlapping Intervals

```javascript
function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[1] - b[1]);

    let end = intervals[0][1];
    let count = 0;

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }

    return count;
}

console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
// 1
```

**Time:** O(n log n) | **Space:** O(1)

### 6. Partition Labels

```javascript
function partitionLabels(s) {
    const lastIndex = {};

    for (let i = 0; i < s.length; i++) {
        lastIndex[s[i]] = i;
    }

    const result = [];
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex[s[i]]);

        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }

    return result;
}

console.log(partitionLabels("ababcbacadefegdehijhklij"));
// [9, 7, 8]
```

**Time:** O(n) | **Space:** O(1)

### 7. Assign Cookies

```javascript
function findContentChildren(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    let child = 0;
    let cookie = 0;

    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) {
            child++;
        }
        cookie++;
    }

    return child;
}

console.log(findContentChildren([1, 2, 3], [1, 1])); // 1
```

**Time:** O(n log n + m log m) | **Space:** O(1)

### 8. Queue Reconstruction by Height

```javascript
function reconstructQueue(people) {
    // Sort by height desc, then k asc
    people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

    const result = [];

    for (let person of people) {
        result.splice(person[1], 0, person);
    }

    return result;
}

console.log(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]));
// [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
```

**Time:** O(n²) | **Space:** O(n)

---

## Practice Problems

### Easy
1. Assign Cookies
2. Lemonade Change
3. Best Time to Buy and Sell Stock II
4. Two City Scheduling
5. Minimum Cost to Move Chips

### Medium
6. Jump Game
7. Jump Game II
8. Gas Station
9. Partition Labels
10. Non-overlapping Intervals
11. Meeting Rooms II
12. Task Scheduler
13. Remove K Digits

### Hard
14. Candy
15. Minimum Number of Arrows to Burst Balloons
16. Queue Reconstruction by Height
17. Course Schedule III
18. Split Array into Consecutive Subsequences

---

## Interview Tips

### When to Use Greedy?

✅ **Optimization problems** with local choices
✅ **Interval/scheduling** problems
✅ **Array/string partitioning** problems
✅ **Minimum/maximum** with sorting strategy
✅ **Resource allocation** problems

### Greedy Strategies

1. **Sort first**: Most greedy problems need sorting
   - By start/end time
   - By value, ratio, or size

2. **Make locally optimal choice**:
   - Earliest finish time
   - Highest value
   - Minimum cost

3. **Prove correctness**:
   - Exchange argument
   - Induction
   - Contradiction

### Common Patterns

| Pattern | Strategy | Example |
|---------|----------|---------|
| Interval | Sort by end time | Activity Selection |
| Value/Weight | Sort by ratio | Fractional Knapsack |
| Two arrays | Sort both | Assign Cookies |
| Partition | Track boundaries | Partition Labels |
| Reconstruction | Sort + Insert | Queue Reconstruction |

### Edge Cases

```javascript
// Always test:
- Empty array
- Single element
- All same elements
- Already sorted
- Overlapping intervals
- Negative numbers
```

---

## Complexity Cheat Sheet

```
Sorting-based:     O(n log n) time
Linear scan:       O(n) time
Two pointers:      O(n) time after sort
Interval problems: O(n log n) time, O(1) or O(n) space

Space is usually O(1) or O(n)
```

---

## Quick Reference

```javascript
// Greedy Template
function greedyTemplate(arr) {
    // 1. Sort if needed
    arr.sort((a, b) => /* comparison */);

    // 2. Initialize result
    let result = 0;
    let state = initialState;

    // 3. Make greedy choice at each step
    for (let item of arr) {
        if (isValidChoice(item, state)) {
            // Make choice
            updateState(state, item);
            result += computeValue(item);
        }
    }

    return result;
}

// Interval Problems Pattern
function intervalGreedy(intervals) {
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let end = -Infinity;
    let count = 0;

    for (let [start, finish] of intervals) {
        if (start >= end) {
            count++;
            end = finish;
        }
    }

    return count;
}

// Value/Weight Pattern
function valueWeightGreedy(items, capacity) {
    // Sort by value/weight ratio
    items.sort((a, b) => b.value / b.weight - a.value / a.weight);

    let totalValue = 0;
    let remaining = capacity;

    for (let item of items) {
        if (remaining >= item.weight) {
            totalValue += item.value;
            remaining -= item.weight;
        } else {
            totalValue += (item.value / item.weight) * remaining;
            break;
        }
    }

    return totalValue;
}
```

---

**Greedy: Think local, achieve global (when it works)!** 🎯
