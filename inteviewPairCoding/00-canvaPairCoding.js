
/**
 * Employee class representing nodes in an organizational hierarchy
 */
class Employee {
    /**
     * @param {number} id - The employee ID
     */
    constructor(id) {
        this.id = id;
        this.parent = null; // Manager (reference to parent Employee)
        this.children = []; // Subordinates (array of Employee objects)
    }

    /**
     * Add a subordinate to this employee
     * @param {Employee} employee - The subordinate employee
     */
    addSubordinate(employee) {
        this.children.push(employee);
        employee.parent = this; // Set this employee as the manager
    }

    /**
     * Check if this employee is a direct manager of another employee
     * @param {Employee} employee - The employee to check
     * @returns {boolean} - True if this employee is the direct manager
     */
    isDirectManagerOf(employee) {
        return employee.parent === this;
    }

    /**
     * Check if this employee is a skip manager (indirect manager) of another employee
     * @param {Employee} employee - The employee to check
     * @returns {boolean} - True if this employee is a skip manager
     */
    isSkipManagerOf(employee) {
        // Skip manager means not direct manager but still in the management chain
        if (!employee || !employee.parent) {
            return false;
        }
        
        // If direct parent is this employee, not a skip manager
        if (employee.parent === this) {
            return false;
        }
        
        // Traverse up the hierarchy to find all managers
        let currentManager = employee.parent;
        while (currentManager) {
            if (currentManager === this) {
                return true;
            }
            currentManager = currentManager.parent;
        }
        
        return false;
    }
      /**
     * Check the management relationship between this employee and another employee
     * @param {Employee} employee - The potential subordinate
     * @returns {string} - The relationship type
     */
    getManagementRelationship(employee) {
        if (this.isDirectManagerOf(employee)) {
            return "Direct Manager";
        } else if (this.isSkipManagerOf(employee)) {
            return "Skip Manager";
        } else {
            return "Not a Manager";
        }
    }
}

/**
 * Finds the common manager between two employees
 * - If one is a direct/skip manager of the other, return that manager
 * - Otherwise, find their nearest common manager
 * 
 * @param {Employee} employee1 - First employee
 * @param {Employee} employee2 - Second employee
 * @returns {Employee|null} - The common manager or null if none found
 */
function findCommonManager(employee1, employee2) {
    // Case 1: If one is a direct or skip manager of the other, return the manager
    if (employee1.isDirectManagerOf(employee2) || employee1.isSkipManagerOf(employee2)) {
        return employee1;
    }
    
    if (employee2.isDirectManagerOf(employee1) || employee2.isSkipManagerOf(employee1)) {
        return employee2;
    }
    
    // Case 2: Find the nearest common manager
    // Collect all ancestors of employee1
    const ancestors1 = new Set();
    let currentManager = employee1.parent;
    
    while (currentManager) {
        ancestors1.add(currentManager);
        currentManager = currentManager.parent;
    }
    
    // Check if any ancestor of employee2 is also an ancestor of employee1
    currentManager = employee2.parent;
    while (currentManager) {
        if (ancestors1.has(currentManager)) {
            return currentManager; // Found the common manager
        }
        currentManager = currentManager.parent;
    }
    
    // If we reach here, no common manager was found
    return null;
}

/**
 * Build the example organization structure from the problem:
 *    A 
 *   / \
 *  B  C
 * / \ / \
 * D E F G
 */
function buildExampleOrganization() {
    const employeeA = new Employee(1);
    const employeeB = new Employee(2);
    const employeeC = new Employee(3);
    const employeeD = new Employee(4);
    const employeeE = new Employee(5);
    const employeeF = new Employee(6);
    const employeeG = new Employee(7);

    // Set up the hierarchy
    employeeA.addSubordinate(employeeB);
    employeeA.addSubordinate(employeeC);
    
    employeeB.addSubordinate(employeeD);
    employeeB.addSubordinate(employeeE);
    
    employeeC.addSubordinate(employeeF);
    employeeC.addSubordinate(employeeG);

    return {
        A: employeeA,
        B: employeeB,
        C: employeeC,
        D: employeeD,
        E: employeeE,
        F: employeeF,
        G: employeeG
    };
}

// Test the implementation
function runTests() {
    const org = buildExampleOrganization();
    
    console.log("--- Testing Direct Manager Relationships ---");
    console.log(`A is direct manager of B: ${org.A.isDirectManagerOf(org.B)}`); // true
    console.log(`A is direct manager of C: ${org.A.isDirectManagerOf(org.C)}`); // true
    console.log(`A is direct manager of D: ${org.A.isDirectManagerOf(org.D)}`); // false
    
    console.log("\n--- Testing Skip Manager Relationships ---");
    console.log(`A is skip manager of D: ${org.A.isSkipManagerOf(org.D)}`); // true
    console.log(`A is skip manager of E: ${org.A.isSkipManagerOf(org.E)}`); // true
    console.log(`A is skip manager of B: ${org.A.isSkipManagerOf(org.B)}`); // false (direct, not skip)
    console.log(`B is skip manager of F: ${org.B.isSkipManagerOf(org.F)}`); // false (no relationship)
    
    console.log("\n--- Testing General Relationship Method ---");
    console.log(`A's relationship to B: ${org.A.getManagementRelationship(org.B)}`); // Direct Manager
    console.log(`A's relationship to D: ${org.A.getManagementRelationship(org.D)}`); // Skip Manager
    console.log(`B's relationship to F: ${org.B.getManagementRelationship(org.F)}`); // Not a Manager
    
    // Additional test case checking if arbitrary employees have relationships
    console.log("\n--- Testing Arbitrary Relationships ---");
    console.log(`B's relationship to G: ${org.B.getManagementRelationship(org.G)}`); // Not a Manager
    console.log(`E's relationship to D: ${org.E.getManagementRelationship(org.D)}`); // Not a Manager
    console.log(`C's relationship to F: ${org.C.getManagementRelationship(org.F)}`); // Direct Manager
    
    // Testing the findCommonManager function
    console.log("\n--- Testing Common Manager Function ---");
    
    // Case 1: Direct manager relationship
    const resultCF = findCommonManager(org.C, org.F);
    console.log(`Common manager of C and F: ${resultCF?.id} (expected: C's id = 3)`); // Should be C
    
    // Case 2: Skip manager relationship
    const resultAD = findCommonManager(org.A, org.D);
    console.log(`Common manager of A and D: ${resultAD?.id} (expected: A's id = 1)`); // Should be A
    
    // Case 3: No direct manager relationship, need to find common ancestor
    const resultBG = findCommonManager(org.B, org.G);
    console.log(`Common manager of B and G: ${resultBG?.id} (expected: A's id = 1)`); // Should be A
    
    // Additional test cases
    const resultDE = findCommonManager(org.D, org.E);
    console.log(`Common manager of D and E: ${resultDE?.id} (expected: B's id = 2)`); // Should be B
    
    const resultDG = findCommonManager(org.D, org.G);
    console.log(`Common manager of D and G: ${resultDG?.id} (expected: A's id = 1)`); // Should be A
    
    const resultCE = findCommonManager(org.C, org.E);
    console.log(`Common manager of C and E: ${resultCE?.id} (expected: A's id = 1)`); // Should be A
}

// Run the tests
runTests();

/**
 * Find the common manager of two employees without using parent references
 * @param {Employee} rootEmployee - The root of the organization tree
 * @param {Employee} employeeA - First employee
 * @param {Employee} employeeB - Second employee
 * @returns {Employee|null} - The common manager, or null if not found
 */
function findCommonManagerWithoutParents(rootEmployee, employeeA, employeeB) {
    // Find path from root to employeeA
    const pathToA = findPath(rootEmployee, employeeA);
    
    // Find path from root to employeeB
    const pathToB = findPath(rootEmployee, employeeB);
    
    // If either path is not found, there's no common manager
    if (!pathToA || !pathToB) {
        return null;
    }
    
    // Find the last common employee in both paths
    let commonManager = null;
    const minLength = Math.min(pathToA.length, pathToB.length);
    
    for (let i = 0; i < minLength; i++) {
        if (pathToA[i] === pathToB[i]) {
            commonManager = pathToA[i];
        } else {
            break; // Paths diverge, we've found the last common manager
        }
    }
    
    return commonManager;
}

/**
 * Find the path from root to the target employee using DFS
 * @param {Employee} root - The root of the tree or subtree to search
 * @param {Employee} target - The employee to find
 * @param {Array<Employee>} path - The current path (used internally for recursion)
 * @returns {Array<Employee>|null} - The path to the target, or null if not found
 */
function findPath(root, target, path = []) {
    // Base case: if root is null, target is not found in this path
    if (!root) {
        return null;
    }
    
    // Add current employee to the path
    path.push(root);
    
    // If we found the target, return the path
    if (root === target) {
        return [...path]; // Return a copy of the path
    }
    
    // Recursively search in children
    for (const child of root.children) {
        const foundPath = findPath(child, target, path);
        if (foundPath) {
            return foundPath;
        }
    }
    
    // If we get here, target was not found in this subtree
    path.pop(); // Backtrack
    return null;
}

/**
 * Test function for findCommonManagerWithoutParents
 */
function testCommonManagerWithoutParents() {
    const org = buildExampleOrganization();
    
    console.log("\n--- Testing Common Manager Without Parents ---");
    
    // Test cases
    const rootA = org.A;
    
    // Case 1: Direct subordinates of the same manager
    const resultDE = findCommonManagerWithoutParents(rootA, org.D, org.E);
    console.log(`Common manager of D and E: ${resultDE?.id} (expected: B's id = 2)`);
    
    // Case 2: Employees in different subtrees
    const resultDG = findCommonManagerWithoutParents(rootA, org.D, org.G);
    console.log(`Common manager of D and G: ${resultDG?.id} (expected: A's id = 1)`);
    
    // Case 3: One is higher in hierarchy than the other
    const resultAD = findCommonManagerWithoutParents(rootA, org.A, org.D);
    console.log(`Common manager of A and D: ${resultAD?.id} (expected: A's id = 1)`);
    
    // Case 4: Manager and direct subordinate
    const resultBD = findCommonManagerWithoutParents(rootA, org.B, org.D);
    console.log(`Common manager of B and D: ${resultBD?.id} (expected: B's id = 2)`);
}

// Run the tests for the new function
testCommonManagerWithoutParents();