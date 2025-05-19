// Topological Sort
// Topological Sort is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v in the ordering.
// It is only applicable for Directed Acyclic Graphs (DAGs).

function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(graph, node, visited, stack);
    }
  }

  return stack.reverse();
}

function dfs(graph, node, visited, stack) {
  visited.add(node);

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, stack);
    }
  }

  stack.push(node);
}

// using array list of expected result to compare to test
function testTopologicalSort() {
    const testCases = [
        {
            graph: {
                A: ['B', 'C'],
                B: ['D'],
                C: ['D'],
                D: []
            },
            expected: ['A', 'B', 'C', 'D']
        },
        {
            graph: {
                A: ['B'],
                B: ['C'],
                C: ['D'],
                D: []
            },
            expected: ['A', 'B', 'C', 'D']
        },
        {
            graph: {
                A: [],
                B: [],
                C: [],
                D: []
            },
            expected: ['A', 'B', 'C', 'D']
        }
    ];

    testCases.forEach(({ graph, expected }) => {
        const result = topologicalSort(graph);
        console.assert(JSON.stringify(result) === JSON.stringify(expected), `For graph: ${JSON.stringify(graph)}, expected ${JSON.stringify(expected)} but got ${JSON.stringify(result)}`);
    });
}
// Run the test function
testTopologicalSort();