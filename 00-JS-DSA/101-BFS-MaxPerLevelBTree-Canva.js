// a binary tree, return array containing the largest node value at each level

function maxPerLevelBTree(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    let levelSize = queue.length;
    let maxVal = -Infinity;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      maxVal = Math.max(maxVal, node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(maxVal);
  }

  return result;
}
// time complexity: O(n), where n is the number of nodes in the tree
// space complexity: O(n), where n is the maximum number of nodes at any level

// using DFS
function maxPerLevelBTreeDFS(root) {
  if (!root) return [];
  const result = [];

  function dfs(node, level) {
    if (!node) return;

    if (result[level] === undefined || node.val > result[level]) {
      result[level] = node.val;
    }

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return result;
}
// time complexity: O(n), where n is the number of nodes in the tree
// space complexity: O(h), where h is the height of the tree

function testMaxPerLevelBTree() {
  const testCases = [
    {
      input: {
        val: 1,
        left: {
          val: 2,
          left: { val: 4, left: null, right: null },
          right: { val: 5, left: null, right: null },
        },
        right: {
          val: 3,
          left: { val: 6, left: null, right: null },
          right: { val: 7, left: null, right: null },
        },
      },
      expected: [1, 3, 7],
    },
    {
      input: {
        val: 10,
        left: {
          val: 20,
          left: { val: 40, left: null, right: null },
          right: { val: 50, left: null, right: null },
        },
        right: {
          val: 30,
          left: { val: 60, left: null, right: null },
          right: { val: 70, left: null, right: null },
        },
      },
      expected: [10, 30, 70],
    },
    {
      input: {
        val: -1,
        left: {
          val: -2,
          left: { val: -4, left: null, right: null },
          right: { val: -5, left: null, right: null },
        },
        right: {
          val: -3,
          left: { val: -6, left: null, right: null },
          right: { val: -7, left:null ,right:null},
        }
      }, 
      expected:[-1,-2,-4]
    }

  ];

  testCases.forEach((testCase, index) => {
    const result = maxPerLevelBTree(testCase.input);
    console.log(`Test case ${index + 1}:`, result);
    console.assert(
      JSON.stringify(result) === JSON.stringify(testCase.expected),
      `Expected ${JSON.stringify(testCase.expected)} but got ${JSON.stringify(result)}`
    );
  });
}

// Run the test function
testMaxPerLevelBTree();
