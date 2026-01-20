/**
 * GRAPHS - Data Structure
 * Collection of nodes (vertices) connected by edges
 */

// ===== GRAPH REPRESENTATIONS =====

// 1. Adjacency List (Most Common)
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }

    // For directed graph
    addDirectedEdge(from, to) {
        this.adjacencyList[from].push(to);
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    // Depth First Search (Recursive)
    dfsRecursive(start) {
        const result = [];
        const visited = {};

        const dfs = (vertex) => {
            if (!vertex) return null;

            visited[vertex] = true;
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        };

        dfs(start);
        return result;
    }

    // Depth First Search (Iterative)
    dfsIterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

        while (stack.length) {
            const vertex = stack.pop();
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }

    // Breadth First Search
    bfs(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

        while (queue.length) {
            const vertex = queue.shift();
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

// 2. Adjacency Matrix
class GraphMatrix {
    constructor(size) {
        this.size = size;
        this.matrix = Array(size).fill(0).map(() => Array(size).fill(0));
    }

    addEdge(v1, v2, weight = 1) {
        this.matrix[v1][v2] = weight;
        this.matrix[v2][v1] = weight; // For undirected graph
    }

    removeEdge(v1, v2) {
        this.matrix[v1][v2] = 0;
        this.matrix[v2][v1] = 0;
    }

    hasEdge(v1, v2) {
        return this.matrix[v1][v2] !== 0;
    }
}

// ===== COMMON GRAPH PROBLEMS =====

// 1. Number of Islands (DFS)
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    function dfs(i, j) {
        if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') {
            return;
        }

        grid[i][j] = '0'; // Mark as visited

        dfs(i + 1, j); // down
        dfs(i - 1, j); // up
        dfs(i, j + 1); // right
        dfs(i, j - 1); // left
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

// 2. Clone Graph
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

// 3. Course Schedule (Detect Cycle - Topological Sort)
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const visited = new Array(numCourses).fill(0); // 0: unvisited, 1: visiting, 2: visited

    // Build graph
    for (let [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }

    function hasCycle(course) {
        if (visited[course] === 1) return true;  // Cycle detected
        if (visited[course] === 2) return false; // Already processed

        visited[course] = 1; // Mark as visiting

        for (let prereq of graph[course]) {
            if (hasCycle(prereq)) return true;
        }

        visited[course] = 2; // Mark as visited
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }

    return true;
}

// 4. Course Schedule II (Topological Sort)
function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const visited = new Array(numCourses).fill(0);
    const result = [];

    for (let [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }

    function dfs(course) {
        if (visited[course] === 1) return false; // Cycle
        if (visited[course] === 2) return true;  // Processed

        visited[course] = 1;

        for (let prereq of graph[course]) {
            if (!dfs(prereq)) return false;
        }

        visited[course] = 2;
        result.push(course);
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return [];
    }

    return result;
}

// 5. Pacific Atlantic Water Flow
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

    // Start from Pacific borders
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

// 6. Dijkstra's Algorithm (Shortest Path)
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const path = [];

    // Initialize
    for (let vertex in graph.adjacencyList) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (pq.values.length) {
        const smallest = pq.dequeue().val;

        if (smallest === end) {
            // Build path
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }

        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in graph.adjacencyList[smallest]) {
                const nextNode = graph.adjacencyList[smallest][neighbor];
                const candidate = distances[smallest] + nextNode.weight;

                if (candidate < distances[nextNode.node]) {
                    distances[nextNode.node] = candidate;
                    previous[nextNode.node] = smallest;
                    pq.enqueue(nextNode.node, candidate);
                }
            }
        }
    }

    return path.concat(smallest).reverse();
}

// 7. Network Delay Time (Dijkstra variant)
function networkDelayTime(times, n, k) {
    const graph = Array(n + 1).fill(0).map(() => []);

    for (let [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    const pq = [[0, k]]; // [distance, node]

    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, node] = pq.shift();

        if (d > dist[node]) continue;

        for (let [neighbor, weight] of graph[node]) {
            const newDist = d + weight;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }

    let maxDist = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxDist = Math.max(maxDist, dist[i]);
    }

    return maxDist;
}

// 8. Word Ladder (BFS)
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [[beginWord, 1]];

    while (queue.length) {
        const [word, level] = queue.shift();

        if (word === endWord) return level;

        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

                if (wordSet.has(newWord)) {
                    queue.push([newWord, level + 1]);
                    wordSet.delete(newWord);
                }
            }
        }
    }

    return 0;
}

// 9. Alien Dictionary (Topological Sort)
function alienOrder(words) {
    const graph = {};
    const inDegree = {};

    // Initialize
    for (let word of words) {
        for (let char of word) {
            if (!(char in graph)) {
                graph[char] = new Set();
                inDegree[char] = 0;
            }
        }
    }

    // Build graph
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const minLen = Math.min(word1.length, word2.length);

        for (let j = 0; j < minLen; j++) {
            if (word1[j] !== word2[j]) {
                if (!graph[word1[j]].has(word2[j])) {
                    graph[word1[j]].add(word2[j]);
                    inDegree[word2[j]]++;
                }
                break;
            }
        }
    }

    // Topological sort (Kahn's algorithm)
    const queue = [];
    for (let char in inDegree) {
        if (inDegree[char] === 0) {
            queue.push(char);
        }
    }

    let result = '';
    while (queue.length) {
        const char = queue.shift();
        result += char;

        for (let neighbor of graph[char]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return result.length === Object.keys(graph).length ? result : '';
}

// ===== TEST CASES =====
console.log('\n===== Graph Tests =====\n');

// Create graph
const g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log('DFS Recursive:', g.dfsRecursive('A'));
console.log('DFS Iterative:', g.dfsIterative('A'));
console.log('BFS:', g.bfs('A'));

// Number of Islands
const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
];
console.log('\nNumber of Islands:', numIslands(grid)); // 3

// Course Schedule
console.log('Can Finish Courses:', canFinish(2, [[1, 0]])); // true
console.log('Course Order:', findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // [0,1,2,3] or [0,2,1,3]
