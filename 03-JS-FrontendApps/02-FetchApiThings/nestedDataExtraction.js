/**
 * nestedDataExtraction.js - Working with nested JSON data from APIs
 * 
 * Common interview questions:
 * 1. How would you extract specific data from deeply nested JSON?
 * 2. How can you safely access nested properties without errors?
 * 3. What techniques can you use to transform nested API data?
 * 4. How would you flatten a nested structure?
 */

// Display results function (reusing from previous file)
const displayNestedResult = (data, error = false) => {
  const resultsElement = document.getElementById('results');
  if (error) {
    resultsElement.innerHTML = `<span style="color: red;">ERROR: ${data}</span>`;
  } else {
    resultsElement.innerHTML = typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : data;
  }
};

// Sample nested data (like what you might get from an API)
const getSampleNestedData = async () => {
  try {
    // Fetch nested company data that includes employees, departments and projects
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const users = await response.json();
    
    // Let's enhance the data to make it more deeply nested
    // This simulates complex nested API responses
    return {
      organization: {
        name: "Example Corp",
        founded: 2010,
        headquarters: {
          city: "San Francisco",
          state: "CA",
          address: {
            street: "123 Tech Ave",
            zipcode: "94107",
            building: {
              name: "Innovation Tower",
              floor: 12
            }
          }
        },
        departments: [
          {
            id: 1,
            name: "Engineering",
            employees: users.slice(0, 3).map(user => ({
              ...user,
              role: "Developer",
              skills: ["JavaScript", "React", "Node.js"],
              performance: {
                ratings: [4, 5, 3, 4],
                average: 4,
                details: {
                  strengths: ["Technical skills", "Problem solving"],
                  improvements: ["Communication"]
                }
              }
            }))
          },
          {
            id: 2,
            name: "Marketing",
            employees: users.slice(3, 5).map(user => ({
              ...user,
              role: "Marketing Specialist",
              campaigns: [
                { id: 1, name: "Summer Promotion", performance: 0.87 },
                { id: 2, name: "Product Launch", performance: 0.92 }
              ]
            }))
          }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching nested data:', error);
    throw error;
  }
};

// 1. Basic extraction of nested data
const extractNestedData = async () => {
  try {
    const data = await getSampleNestedData();
    
    // Let's extract various pieces of nested data
    const results = {
      // Basic dot notation for simple nesting
      organizationName: data.organization.name,
      headquartersCity: data.organization.headquarters.city,
      
      // Deeper nesting
      buildingName: data.organization.headquarters.address.building.name,
      
      // Array + nesting
      firstDepartmentName: data.organization.departments[0].name,
      
      // Deeper array + nesting
      firstEmployeeName: data.organization.departments[0].employees[0].name,
      
      // Multiple levels of arrays and objects
      firstEmployeeFirstSkill: data.organization.departments[0].employees[0].skills[0],
      
      // Complex extraction
      firstEmployeeAvgPerformance: data.organization.departments[0].employees[0].performance.average,
      
      // Practical example: Get all employee names across all departments
      allEmployeeNames: data.organization.departments.flatMap(
        dept => dept.employees.map(emp => emp.name)
      )
    };
    
    displayNestedResult(results);
    return results;
  } catch (error) {
    displayNestedResult(`Failed to extract nested data: ${error.message}`, true);
    console.error('Error in extractNestedData:', error);
  }
};

// 2. Safe access to deeply nested properties (handling potential undefined values)
const extractDeepNestedData = async () => {
  try {
    const data = await getSampleNestedData();
    
    // Several techniques for safe access:
    
    // TECHNIQUE 1: Optional chaining (?.) - Modern approach (ES2020)
    const optionalChainingResults = {
      // This won't throw even if any part of the path is undefined
      deepProperty: data?.organization?.departments?.[0]?.employees?.[0]?.performance?.details?.strengths?.[0],
      
      // Property that doesn't exist (returns undefined instead of throwing)
      nonExistentProperty: data?.organization?.nonExistent?.somethingElse
    };
    
    // TECHNIQUE 2: Using a utility function (pre-ES2020 approach)
    const getNestedValue = (obj, path, defaultValue = undefined) => {
      return path.split('.')
        .reduce((o, key) => {
          // Handle array access with [n] notation
          if (key.includes('[') && key.includes(']')) {
            const keyName = key.substring(0, key.indexOf('['));
            const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
            return (o && o[keyName] && o[keyName][index] !== undefined) ? o[keyName][index] : undefined;
          }
          return (o && o[key] !== undefined) ? o[key] : undefined;
        }, obj) || defaultValue;
    };
    
    const utilityResults = {
      // Same property accessed with utility function
      deepProperty: getNestedValue(data, 'organization.departments[0].employees[0].performance.details.strengths[0]', 'Not found'),
      
      // Property that doesn't exist
      nonExistentProperty: getNestedValue(data, 'organization.nonExistent.somethingElse', 'Default value')
    };
    
    // TECHNIQUE 3: Using try/catch (least elegant but sometimes necessary)
    let tryCatchResult;
    try {
      tryCatchResult = data.organization.departments[10].name; // Intentional error - index out of bounds
    } catch (e) {
      tryCatchResult = 'Error: This path does not exist';
    }
    
    const allResults = {
      "Modern (Optional Chaining)": optionalChainingResults,
      "Utility Function": utilityResults,
      "Try/Catch Approach": { result: tryCatchResult }
    };
    
    displayNestedResult(allResults);
    return allResults;
  } catch (error) {
    displayNestedResult(`Failed to safely extract deep nested data: ${error.message}`, true);
    console.error('Error in extractDeepNestedData:', error);
  }
};

// 3. Practical transformation of nested data (interview favorite)
const transformNestedData = async () => {
  try {
    const data = await getSampleNestedData();
    
    // Let's transform this nested data into a different structure
    // Common interview question: flatten a nested structure
    const flattenedEmployees = data.organization.departments.flatMap(dept => 
      dept.employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        department: dept.name,
        role: emp.role,
        headquarters: `${data.organization.headquarters.city}, ${data.organization.headquarters.state}`,
        // Add more flattened properties as needed
      }))
    );
    
    // Transform into a different grouping
    const employeesByRole = flattenedEmployees.reduce((acc, employee) => {
      const role = employee.role;
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(employee);
      return acc;
    }, {});
    
    const result = {
      flattenedEmployees,
      employeesByRole,
      employeeCount: flattenedEmployees.length,
      roleCount: Object.keys(employeesByRole).length
    };
    
    displayNestedResult(result);
    return result;
  } catch (error) {
    displayNestedResult(`Failed to transform nested data: ${error.message}`, true);
    console.error('Error in transformNestedData:', error);
  }
};

// Function to initialize event listeners
const initNestedDataListeners = () => {
  document.getElementById('nestedDataBtn').addEventListener('click', extractNestedData);
  document.getElementById('deepNestedBtn').addEventListener('click', extractDeepNestedData);
  
  // Add listener for the transformation example if button exists
  const transformBtn = document.getElementById('transformDataBtn');
  if (transformBtn) {
    transformBtn.addEventListener('click', transformNestedData);
  }
};

// Export functions for potential reuse
window.extractNestedData = extractNestedData;
window.extractDeepNestedData = extractDeepNestedData;
window.transformNestedData = transformNestedData;
window.initNestedDataListeners = initNestedDataListeners;
