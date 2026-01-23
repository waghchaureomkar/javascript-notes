# Graphs - Complete Guide

> **Most Complex Data Structure**
> Network of nodes (vertices) connected by edges

---

## Table of Contents

1. [Graph Basics](#graph-basics)
2. [Graph Representations](#graph-representations)
3. [Graph Traversals](#graph-traversals)
4. [Common Algorithms](#common-algorithms)
5. [Top Interview Problems](#top-interview-problems)
6. [Practice Problems](#practice-problems)

---

## Graph Basics

### What is a Graph?

A **non-linear** data structure with nodes (vertices) connected by edges.

```
    1 --- 2
    |     |
    3 --- 4
```

**Real-world examples:**
- Social networks (friends)
- Maps (cities connected by roads)
- Web pages (linked by hyperlinks)
- Dependencies (package managers)

### Types of Graphs

#### 1. Directed Graph (Digraph)

Edges have direction (one-way).

```
    1 → 2
    ↓   ↓
    3 → 4
```

**Example:** Twitter follows, web pages

#### 2. Undirected Graph

Edges are bidirectional (two-way).

```
    1 --- 2
    |     |
    3 --- 4
```

**Example:** Facebook friends, roads

#### 3. Weighted Graph

Edges have weights (costs).

```
    1 -5- 2
    |3    |2
    3 -7- 4
```

**Example:** Road distances, flight costs

#### 4. Unweighted Graph

All edges have equal weight (1).

#### 5. Cyclic Graph

Contains cycles (can return to starting node).

```
    1 → 2
    ↑   ↓
    4 ← 3
```

#### 6. Acyclic Graph (DAG)

No cycles. **DAG** = Directed Acyclic Graph.

```
    1 → 2
    ↓   ↓
    3 → 4
```

---

## Graph Representations

### 1. Adjacency List (Most Common)

Store neighbors for each vertex in a list/array.

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(v1, v2) {
        // Undirected
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    addDirectedEdge(from, to) {
        // Directed
        this.adjacencyList[from].push(to);
    }
}

// Example
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');

// Result: { A: ['B', 'C'], B: ['A'], C: ['A'] }
```

**Pros:** Space-efficient for sparse graphs
**Cons:** Slow to check if edge exists

### 2. Adjacency Matrix

2D array where `matrix[i][j] = 1` if edge exists.

```javascript
class GraphMatrix {
    constructor(size) {
        this.matrix = Array(size).fill(0)
            .map(() => Array(size).fill(0));
    }

    addEdge(v1, v2, weight = 1) {
        this.matrix[v1][v2] = weight;
        this.matrix[v2][v1] = weight; // Undirected
    }

    hasEdge(v1, v2) {
        return this.matrix[v1][v2] !== 0;
    }
}

// Example: 3 vertices
// [0, 1, 1]
// [1, 0, 0]
// [1, 0, 0]
```

**Pros:** Fast edge lookup O(1)
**Cons:** Space O(V²), wasteful for sparse graphs

### Comparison

| Feature | Adjacency List | Adjacency Matrix |
|---------|---------------|------------------|
| Space | O(V + E) | O(V²) |
| Add vertex | O(1) | O(V²) |
| Add edge | O(1) | O(1) |
| Remove vertex | O(V + E) | O(V²) |
| Check edge | O(V) | O(1) |
| Better for | Sparse | Dense |

---

## Graph Traversals

### 1. Depth-First Search (DFS)

Explore as far as possible before backtracking.

```javascript
// Recursive DFS
dfs(start, visited = new Set()) {
    visited.add(start);
    console.log(start);

    for (let neighbor of this.adjacencyList[start]) {
        if (!visited.has(neighbor)) {
            this.dfs(neighbor, visited);
        }
    }

    return visited;
}

// Iterative DFS
dfsIterative(start) {
    const stack = [start];
    const visited = new Set();
    visited.add(start);

    while (stack.length) {
        const vertex = stack.pop();
        console.log(vertex);

        for (let neighbor of this.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }
}
```

**Use cases:**
- Detect cycles
- Topological sorting
- Pathfinding
- Connected components

**Time:** O(V + E) | **Space:** O(V)

### 2. Breadth-First Search (BFS)

Explore level by level (neighbors first).

```javascript
bfs(start) {
    const queue = [start];
    const visited = new Set();
    visited.add(start);

    while (queue.length) {
        const vertex = queue.shift();
        console.log(vertex);

        for (let neighbor of this.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

**Use cases:**
- Shortest path (unweighted)
- Level-order traversal
- Web crawling
- GPS navigation

**Time:** O(V + E) | **Space:** O(V)

### DFS vs BFS

| DFS | BFS |
|-----|-----|
| Stack (recursive) | Queue |
| Deep exploration | Wide exploration |
| Less memory | More memory |
| Pathfinding | Shortest path |
| Backtracking | Level-order |

---

## Common Algorithms

### 1. Detect Cycle (Undirected)

```javascript
function hasCycle(graph) {
    const visited = new Set();

    function dfs(node, parent) {
        visited.add(node);

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                return true; // Cycle detected
            }
        }

        return false;
    }

    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node, null)) return true;
        }
    }

    return false;
}
```

### 2. Detect Cycle (Directed)

```javascript
function hasCycleDirected(graph) {
    const visited = new Set();
    const recStack = new Set();

    function dfs(node) {
        visited.add(node);
        recStack.add(node);

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            } else if (recStack.has(neighbor)) {
                return true; // Cycle detected
            }
        }

        recStack.delete(node);
        return false;
    }

    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }

    return false;
}
```

### 3. Topological Sort (DAG only)

Linear ordering where u comes before v if edge u→v exists.

```javascript
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];

    function dfs(node) {
        visited.add(node);

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }

        stack.push(node);
    }

    for (let node in graph) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }

    return stack.reverse();
}
```

**Use cases:** Task scheduling, course prerequisites

### 4. Dijkstra's Algorithm (Shortest Path)

Find shortest path in **weighted graph** with non-negative weights.

```javascript
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]]; // [distance, node]

    // Initialize distances
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [dist, node] = pq.shift();

        if (visited.has(node)) continue;
        visited.add(node);

        for (let [neighbor, weight] of graph[node]) {
            const newDist = dist + weight;

            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }

    return distances;
}
```

**Time:** O((V + E) log V) with min-heap

### 5. Bellman-Ford (Negative Weights)

```javascript
function bellmanFord(graph, start, V) {
    const distances = Array(V).fill(Infinity);
    distances[start] = 0;

    // Relax edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (let [u, v, weight] of edges) {
            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
            }
        }
    }

    // Check for negative cycles
    for (let [u, v, weight] of edges) {
        if (distances[u] + weight < distances[v]) {
            return "Negative cycle detected";
        }
    }

    return distances;
}
```

**Time:** O(V × E)

---

## Top Interview Problems

### 1. Number of Islands (DFS)

```javascript
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    function dfs(i, j) {
        if (i < 0 || i >= rows || j < 0 || j >= cols ||
            grid[i][j] === '0') {
            return;
        }

        grid[i][j] = '0'; // Mark as visited

        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
}
```

**Time:** O(m × n) | **Space:** O(m × n)

### 2. Course Schedule (Cycle Detection)

```javascript
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const visited = Array(numCourses).fill(0);

    // Build graph
    for (let [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }

    function hasCycle(course) {
        if (visited[course] === 1) return true;  // Cycle
        if (visited[course] === 2) return false; // Processed

        visited[course] = 1; // Visiting

        for (let prereq of graph[course]) {
            if (hasCycle(prereq)) return true;
        }

        visited[course] = 2; // Visited
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }

    return true;
}
```

**Time:** O(V + E) | **Space:** O(V + E)

### 3. Clone Graph

```javascript
function cloneGraph(node) {
    if (!node) return null;

    const visited = new Map();

    function clone(node) {
        if (visited.has(node)) {
            return visited.get(node);
        }

        const cloneNode = { val: node.val, neighbors: [] };
        visited.set(node, cloneNode);

        for (let neighbor of node.neighbors) {
            cloneNode.neighbors.push(clone(neighbor));
        }

        return cloneNode;
    }

    return clone(node);
}
```

**Time:** O(V + E) | **Space:** O(V)

### 4. Pacific Atlantic Water Flow

```javascript
function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];

    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array(rows).fill(0).map(() => Array(cols).fill(false));
    const atlantic = Array(rows).fill(0).map(() => Array(cols).fill(false));

    function dfs(i, j, visited, prevHeight) {
        if (i < 0 || i >= rows || j < 0 || j >= cols ||
            visited[i][j] || heights[i][j] < prevHeight) {
            return;
        }

        visited[i][j] = true;

        dfs(i + 1, j, visited, heights[i][j]);
        dfs(i - 1, j, visited, heights[i][j]);
        dfs(i, j + 1, visited, heights[i][j]);
        dfs(i, j - 1, visited, heights[i][j]);
    }

    // DFS from borders
    for (let i = 0; i < rows; i++) {
        dfs(i, 0, pacific, heights[i][0]);
        dfs(i, cols - 1, atlantic, heights[i][cols - 1]);
    }

    for (let j = 0; j < cols; j++) {
        dfs(0, j, pacific, heights[0][j]);
        dfs(rows - 1, j, atlantic, heights[rows - 1][j]);
    }

    const result = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}
```

**Time:** O(m × n) | **Space:** O(m × n)

### 5. Word Ladder (BFS Shortest Path)

```javascript
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [[beginWord, 1]];

    while (queue.length) {
        const [word, level] = queue.shift();

        if (word === endWord) return level;

        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const newWord = word.slice(0, i) +
                               String.fromCharCode(c) +
                               word.slice(i + 1);

                if (wordSet.has(newWord)) {
                    queue.push([newWord, level + 1]);
                    wordSet.delete(newWord);
                }
            }
        }
    }

    return 0;
}
```

**Time:** O(M² × N) where M = word length, N = words

---

## Practice Problems

### Easy
1. Find if Path Exists in Graph
2. Find Center of Star Graph
3. Find the Town Judge
4. Number of Connected Components
5. All Paths From Source to Target

### Medium
6. Number of Islands
7. Clone Graph
8. Course Schedule
9. Pacific Atlantic Water Flow
10. Network Delay Time

### Hard
11. Word Ladder
12. Alien Dictionary
13. Minimum Height Trees
14. Critical Connections in Network
15. Reconstruct Itinerary

---

## Interview Tips

### When to Use DFS?

✅ **Pathfinding** - Find any path
✅ **Cycle detection** - Backtracking
✅ **Topological sort** - Dependencies
✅ **Connected components** - Islands

### When to Use BFS?

✅ **Shortest path** - Unweighted graphs
✅ **Level-order** - Distance from source
✅ **Web crawling** - Breadth exploration
✅ **Network flow** - Layer by layer

### Common Patterns

1. **DFS Template**: Visited set + recursion
2. **BFS Template**: Queue + visited set
3. **Cycle Detection**: Visiting/Visited states
4. **Topological Sort**: DFS + stack

### Edge Cases

```javascript
// Always test:
- Empty graph
- Single node
- Disconnected components
- Self-loops
- Cycles
```

---

## Complexity Cheat Sheet

```
DFS:       O(V + E) time, O(V) space
BFS:       O(V + E) time, O(V) space
Dijkstra:  O((V + E) log V) with heap
Bellman:   O(V × E)
Topo Sort: O(V + E)
```

---

## Quick Reference

```javascript
// Graph class
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(v) {
        if (!this.adjacencyList[v]) {
            this.adjacencyList[v] = [];
        }
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
}

// DFS Template
function dfs(node, visited = new Set()) {
    visited.add(node);

    for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor, visited);
        }
    }
}

// BFS Template
function bfs(start) {
    const queue = [start];
    const visited = new Set([start]);

    while (queue.length) {
        const node = queue.shift();

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

---

**Graphs are powerful - master DFS and BFS!** 🕸️
