// SwapEveryTwoNodesInLinkedList

// Given a linked list, swap every two adjacent nodes and return its head.
// You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

ListNode = function(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function swapPairs(head) {
  if (!head || !head.next) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next && prev.next.next) {
    let first = prev.next;
    let second = first.next;

    // Swap the nodes
    first.next = second.next;
    second.next = first;
    prev.next = second;

    // Move to the next pair
    prev = first;
  }

  return dummy.next;
}

// Test cases
function testSwapPairs() {
  const testCases = [
    {
      input: [1, 2, 3, 4],
      expected: [2, 1, 4, 3],
    },
    {
      input: [1],
      expected: [1],
    },
    {
      input: [],
      expected: [],
    },
    {
      input: [1, 2, 3],
      expected: [2, 1, 3],
    },
  ];

  testCases.forEach((testCase, index) => {
    const head = createLinkedList(testCase.input);
    const result = swapPairs(head);
    const resultArray = linkedListToArray(result);
    console.log(`Test case ${index + 1}:`, resultArray);
    console.assert(
      JSON.stringify(resultArray) === JSON.stringify(testCase.expected),
      `Expected ${JSON.stringify(testCase.expected)} but got ${JSON.stringify(resultArray)}`
    );
  });
}

// Run the test function
testSwapPairs();
