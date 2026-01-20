/**
 * GREEDY ALGORITHMS
 * Make locally optimal choice at each step
 * Hope to find global optimum
 */

// ===== BASIC GREEDY PROBLEMS =====

// 1. Jump Game
function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}

// 2. Jump Game II (Minimum jumps)
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

// 3. Gas Station
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

// 4. Partition Labels
function partitionLabels(s) {
    const lastIndex = {};

    // Record last occurrence of each character
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
            start = i + 1;
        }
    }

    return result;
}

// 5. Task Scheduler
function leastInterval(tasks, n) {
    const freq = new Array(26).fill(0);

    for (let task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }

    freq.sort((a, b) => b - a);

    const maxFreq = freq[0];
    let idleTime = (maxFreq - 1) * n;

    for (let i = 1; i < 26; i++) {
        idleTime -= Math.min(freq[i], maxFreq - 1);
    }

    idleTime = Math.max(0, idleTime);

    return tasks.length + idleTime;
}

// 6. Non-overlapping Intervals
function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[1] - b[1]); // Sort by end time

    let count = 0;
    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }

    return count;
}

// 7. Minimum Number of Arrows to Burst Balloons
function findMinArrowShots(points) {
    if (points.length === 0) return 0;

    points.sort((a, b) => a[1] - b[1]);

    let arrows = 1;
    let end = points[0][1];

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }

    return arrows;
}

// 8. Queue Reconstruction by Height
function reconstructQueue(people) {
    // Sort by height descending, then by k ascending
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        }
        return a[1] - b[1];
    });

    const result = [];

    for (let person of people) {
        result.splice(person[1], 0, person);
    }

    return result;
}

// 9. Assign Cookies
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

// 10. Candy
function candy(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);

    // Left to right
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to left
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    return candies.reduce((a, b) => a + b, 0);
}

// ===== ACTIVITY SELECTION =====

function activitySelection(start, finish) {
    const activities = start.map((s, i) => [s, finish[i]]);
    activities.sort((a, b) => a[1] - b[1]);

    const selected = [activities[0]];
    let lastEnd = activities[0][1];

    for (let i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i][1];
        }
    }

    return selected;
}

// ===== FRACTIONAL KNAPSACK =====

function fractionalKnapsack(weights, values, capacity) {
    const items = weights.map((w, i) => ({
        weight: w,
        value: values[i],
        ratio: values[i] / w
    }));

    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (let item of items) {
        if (remainingCapacity === 0) break;

        const amountToTake = Math.min(item.weight, remainingCapacity);
        totalValue += amountToTake * item.ratio;
        remainingCapacity -= amountToTake;
    }

    return totalValue;
}

// ===== HUFFMAN CODING =====

class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function huffmanCoding(text) {
    // Count frequencies
    const freqMap = {};
    for (let char of text) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    // Create priority queue (min heap)
    const pq = Object.keys(freqMap).map(char =>
        new HuffmanNode(char, freqMap[char])
    );

    pq.sort((a, b) => a.freq - b.freq);

    // Build Huffman tree
    while (pq.length > 1) {
        const left = pq.shift();
        const right = pq.shift();

        const newNode = new HuffmanNode(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;

        pq.push(newNode);
        pq.sort((a, b) => a.freq - b.freq);
    }

    const root = pq[0];

    // Generate codes
    const codes = {};

    function generateCodes(node, code = '') {
        if (!node) return;

        if (node.char !== null) {
            codes[node.char] = code || '0';
            return;
        }

        generateCodes(node.left, code + '0');
        generateCodes(node.right, code + '1');
    }

    generateCodes(root);

    return codes;
}

// ===== MEETING ROOMS =====

// 1. Meeting Rooms (Can attend all?)
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}

// 2. Meeting Rooms II (Min rooms needed)
function minMeetingRooms(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0;
    let endIdx = 0;

    for (let i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endIdx]) {
            rooms++;
        } else {
            endIdx++;
        }
    }

    return rooms;
}

// ===== BEST TIME TO BUY AND SELL STOCK =====

// 1. One Transaction
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
}

// 2. Unlimited Transactions
function maxProfitII(prices) {
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }

    return profit;
}

// 3. At Most Two Transactions
function maxProfitIII(prices) {
    let buy1 = -Infinity;
    let sell1 = 0;
    let buy2 = -Infinity;
    let sell2 = 0;

    for (let price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }

    return sell2;
}

// ===== GREEDY STRING PROBLEMS =====

// 1. Remove K Digits
function removeKdigits(num, k) {
    const stack = [];

    for (let digit of num) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }

    // Remove remaining k digits
    while (k > 0) {
        stack.pop();
        k--;
    }

    // Remove leading zeros
    const result = stack.join('').replace(/^0+/, '');

    return result || '0';
}

// 2. Wildcard Matching
function isMatch(s, p) {
    let i = 0, j = 0;
    let starIdx = -1, matchIdx = 0;

    while (i < s.length) {
        if (j < p.length && (s[i] === p[j] || p[j] === '?')) {
            i++;
            j++;
        } else if (j < p.length && p[j] === '*') {
            starIdx = j;
            matchIdx = i;
            j++;
        } else if (starIdx !== -1) {
            j = starIdx + 1;
            matchIdx++;
            i = matchIdx;
        } else {
            return false;
        }
    }

    while (j < p.length && p[j] === '*') {
        j++;
    }

    return j === p.length;
}

// ===== TEST CASES =====
console.log('\n===== Greedy Algorithm Tests =====\n');

console.log('Can Jump [2,3,1,1,4]:', canJump([2, 3, 1, 1, 4])); // true
console.log('Can Jump [3,2,1,0,4]:', canJump([3, 2, 1, 0, 4])); // false

console.log('\nJump Game II [2,3,1,1,4]:', jump([2, 3, 1, 1, 4])); // 2

console.log('\nGas Station:', canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3

console.log('\nPartition Labels "ababcbacadefegdehijhklij":',
    partitionLabels('ababcbacadefegdehijhklij')); // [9, 7, 8]

console.log('\nNon-overlapping Intervals:',
    eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1

console.log('\nAssign Cookies:', findContentChildren([1, 2, 3], [1, 1])); // 1

console.log('\nActivity Selection:',
    activitySelection([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9]));

console.log('\nFractional Knapsack:',
    fractionalKnapsack([10, 20, 30], [60, 100, 120], 50)); // 240

console.log('\nHuffman Codes:', huffmanCoding('hello world'));

console.log('\nMax Profit:', maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log('Max Profit II:', maxProfitII([7, 1, 5, 3, 6, 4])); // 7
