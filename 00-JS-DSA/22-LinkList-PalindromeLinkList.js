// PalindromeLinkList
// Given a singly linked list, determine if it is a palindrome.
// A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).

function isPalindrome(head) {
  if (!head || !head.next) return true; // Empty list or single node is a palindrome

  let slow = head;
  let fast = head;

  // Find the middle of the linked list
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the linked list
  let prev = null;
  while (slow) {
    const nextNode = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nextNode;
  }

  // Compare the first half and the reversed second half
  let left = head;
  let right = prev; // Start from the head of the reversed second half

  while (right) {
    if (left.data !== right.data) return false; // Not a palindrome
    left = left.next;
    right = right.next;
  }

  return true; // Is a palindrome
}
// time complexity: O(n)
// space complexity: O(1)

function isPalindromeMethod2(head) {
  let string1 = (string2 = "");
  let node = head;
  while (node) {
    string1 += node.data;
    string2 = node.data + string2;
    node = node.next;
  }
  return string1 === string2;
}
// time complexity: O(n)
// space complexity: O(n)

// test
function test() {
  const list = new LinkedList();
  list.addLast(1);
  list.addLast(2);
  list.addLast(3);
  list.addLast(2);
  list.addLast(1);

  console.log(isPalindrome(list.head)); // true
  console.log(isPalindromeMethod2(list.head)); // true

  const list2 = new LinkedList();
  list2.addLast(1);
  list2.addLast(2);
  list2.addLast(3);

  console.log(isPalindrome(list2.head)); // false
  console.log(isPalindromeMethod2(list2.head)); // false
}
