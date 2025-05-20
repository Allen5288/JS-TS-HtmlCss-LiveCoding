// using promise, fetch, recursion to get data

const fetchData = (url, page = 1) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
        reject(error);
      });
  });
};
// using promise, fetch, recursion to get data
const fetchAllData = async (url) => {
  let allData = [];
  let page = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    const data = await fetchData(url, page);
    allData = allData.concat(data);
    hasMoreData = data.length > 0;
    page++;
  }

  return allData;
};

// recursive function to fetch data from fake api
const fetchDataRecursively = async (url, page = 1) => {
  try {
    const response = await fetch(`${url}?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.length > 0) {
      return data.concat(await fetchDataRecursively(url, page + 1));
    } else {
      return [];
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

// fetching data from endpoints, handling promises, extarcting data from nested objects and recursive function
const fetchDataFromEndpoints = async (endpoints) => {
  try {
    const results = await Promise.all(
      endpoints.map((endpoint) => fetch(endpoint).then((response) => response.json()))
    );

    const extractedData = results.map((data) => {
      return data.map((item) => item.title);
    });

    return extractedData;
  } catch (error) {
    console.error("Error fetching data from endpoints:", error);
  }
};