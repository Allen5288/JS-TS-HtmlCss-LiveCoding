// batch fetch data

const fetchBatchData = async (urls) => {
  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${response.url}`);
      }
      return response.json();
    }));
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}


// with large data using multiple time to seperate and batch fetch
const fetchLargeData = async (url, batchSize) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const totalData = await response.json();
    const totalLength = totalData.length;
    const batches = Math.ceil(totalLength / batchSize);
    const urls = Array.from({ length: batches }, (_, i) => `${url}?page=${i + 1}`);
    
    return await fetchBatchData(urls);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}