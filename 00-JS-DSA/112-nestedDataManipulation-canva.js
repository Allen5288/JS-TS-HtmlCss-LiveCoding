// Sample Data Structure
const designElements = [
  {
    id: '1',
    type: 'group',
    name: 'Header Group',
    children: [
      { id: '1.1', type: 'text', content: 'Welcome!', color: 'blue', size: 24 },
      { id: '1.2', type: 'image', src: 'logo.png', width: 100, height: 50 },
    ],
  },
  {
    id: '2',
    type: 'shape',
    shapeType: 'rectangle',
    color: 'red',
    width: 200,
    height: 100,
  },
  {
    id: '3',
    type: 'group',
    name: 'Footer Group',
    children: [
      {
        id: '3.1',
        type: 'group',
        name: 'Social Icons',
        children: [
          { id: '3.1.1', type: 'icon', iconName: 'facebook', color: 'grey' },
          { id: '3.1.2', type: 'icon', iconName: 'twitter', color: 'grey' },
        ],
      },
      { id: '3.2', type: 'text', content: '© 2025 Canva', color: 'black', size: 12 },
    ],
  },
];

console.log('Original Design Elements:', JSON.stringify(designElements, null, 2));

// 1. Flatten the nested structure
function flattenElements(elements, parentId = null, depth = 0) {
  let flatList = [];
  for (const element of elements) {
    const { children, ...rest } = element;
    flatList.push({ ...rest, parentId, depth });
    if (children && children.length > 0) {
      flatList = flatList.concat(flattenElements(children, element.id, depth + 1));
    }
  }
  return flatList;
}

const flattened = flattenElements(designElements);
console.log('\n1. Flattened Elements:', JSON.stringify(flattened, null, 2));
/*
Time Complexity: O(N), where N is the total number of elements (including nested ones). Each element is visited once.
Space Complexity: O(N) in the worst case for the new flat list. If recursion depth is high, O(D) for call stack where D is max depth.
*/


// 2. Filter/Find elements meeting certain criteria (e.g., all text elements)
function findElementsByCriteria(elements, criteriaFn) {
  let foundElements = [];
  function traverse(currentElements) {
    for (const element of currentElements) {
      if (criteriaFn(element)) {
        foundElements.push(element);
      }
      if (element.children && element.children.length > 0) {
        traverse(element.children);
      }
    }
  }
  traverse(elements);
  return foundElements;
}

const textElements = findElementsByCriteria(designElements, (el) => el.type === 'text');
console.log('\n2. Text Elements:', JSON.stringify(textElements, null, 2));

const redElements = findElementsByCriteria(designElements, (el) => el.color === 'red');
console.log('\n2. Red Elements:', JSON.stringify(redElements, null, 2));
/*
Time Complexity: O(N), where N is the total number of elements. Each element is visited once.
Space Complexity: O(M) for the result array, where M is the number of matching elements. O(D) for call stack if recursive.
*/

// 3. Update/Modify a property on all elements that meet certain criteria (e.g., increase size of all text elements)
// This function modifies the original array. Create a deep copy if you need to preserve the original.
function updateElementsByCriteria(elements, criteriaFn, updateFn) {
  function traverse(currentElements) {
    for (const element of currentElements) {
      if (criteriaFn(element)) {
        updateFn(element);
      }
      if (element.children && element.children.length > 0) {
        traverse(element.children);
      }
    }
  }
  // To avoid modifying the original directly, you might want to deep clone 'elements' first
  // For simplicity, this example modifies in place.
  traverse(elements);
}

// Example: Increase font size of all text elements by 2
// Create a deep copy to demonstrate modification without altering the original `designElements` for subsequent examples.
const elementsToUpdate = JSON.parse(JSON.stringify(designElements));
updateElementsByCriteria(
  elementsToUpdate,
  (el) => el.type === 'text',
  (el) => {
    if (el.size) el.size += 2;
    else el.size = 14; // Default size if not present, then increment
  }
);
console.log('\n3. Updated Text Elements (font size +2):', JSON.stringify(findElementsByCriteria(elementsToUpdate, el => el.type === 'text'), null, 2));
/*
Time Complexity: O(N), where N is the total number of elements. Each element is visited once.
Space Complexity: O(D) for the call stack due to recursion, where D is the maximum depth of the structure. If modifying in place. If a deep copy is made first, then O(N).
*/

// 4. Calculate Aggregates (e.g., count total number of 'icon' elements)
function countElementsByType(elements, type) {
  let count = 0;
  function traverse(currentElements) {
    for (const element of currentElements) {
      if (element.type === type) {
        count++;
      }
      if (element.children && element.children.length > 0) {
        traverse(element.children);
      }
    }
  }
  traverse(elements);
  return count;
}

const iconCount = countElementsByType(designElements, 'icon');
console.log('\n4. Total number of icon elements:', iconCount);

// Example: Calculate total area of 'shape' and 'image' elements
function calculateTotalArea(elements) {
  let totalArea = 0;
  function traverse(currentElements) {
    for (const element of currentElements) {
      if ((element.type === 'shape' || element.type === 'image') && element.width && element.height) {
        totalArea += element.width * element.height;
      }
      if (element.children && element.children.length > 0) {
        traverse(element.children);
      }
    }
  }
  traverse(elements);
  return totalArea;
}
const totalImageAndShapeArea = calculateTotalArea(designElements);
console.log('\n4. Total area of image and shape elements:', totalImageAndShapeArea);
/*
Time Complexity: O(N), where N is the total number of elements. Each element is visited once.
Space Complexity: O(D) for the call stack due to recursion, where D is the maximum depth.
*/

// Unit Test / Usage Examples (already included above with console.log)

/*
General Interview Tips for these types of problems:
1.  Clarify Requirements:
    *   Ask about the expected structure of the input and output.
    *   Are there any constraints on the depth of nesting?
    *   Should the original data be mutated, or should a new structure be returned? (Very important!)
    *   How to handle empty inputs or invalid data?

2.  Discuss Approach:
    *   Recursion is a natural fit for tree-like or nested structures.
    *   Iterative approaches using a stack or queue are also possible (e.g., for BFS/DFS traversal if recursion depth is a concern).
    *   Mention trade-offs (e.g., recursion is often more concise but can lead to stack overflow for very deep structures).

3.  Write Clean Code:
    *   Use meaningful variable names.
    *   Break down complex logic into smaller helper functions if needed.
    *   Handle base cases and recursive steps correctly in recursive solutions.

4.  Test Thoroughly:
    *   Consider edge cases: empty array, single element, no nested elements, deeply nested elements.
    *   Test with different criteria for filtering/updating.

5.  Analyze Complexity:
    *   Be ready to discuss the time and space complexity of your solution. For most tree traversal algorithms, time complexity is O(N) where N is the number of nodes/elements, as each is visited once. Space complexity depends on whether you're creating new data structures (O(N)) and the recursion depth (O(D) for the call stack, where D is max depth).

These examples use recursion for simplicity and clarity, which is often well-received in interviews for this type of problem.
*/
