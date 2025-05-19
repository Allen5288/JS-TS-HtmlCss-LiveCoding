// using promise and fetch to get data
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
        reject(error);
      });
  });
};

// fetch from url: https://api.example.com/data
fetchData("https://api.example.com/data")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
