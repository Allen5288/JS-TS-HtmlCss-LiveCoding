// show all usage of Fetch API

// 1. Basic Fetch
const fetchData = fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));

// 2. Fetch with Headers
const fetchWithHeaders = fetch("https://api.example.com/data", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN_HERE",
    "Custom-Header": "Custom Value"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch with headers error:", error));

// 6. Fetch with Async/Await
async function fetchDataAsync() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Async fetch error:", error);
    throw error; // Rethrow for further handling if needed
  }
}

// 3. Fetch with Query Parameters
const url = new URL("https://api.example.com/search");
url.searchParams.append("query", "javascript");
url.searchParams.append("limit", "10");

const fetchWithParams = fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch with params error:", error));

// 4. Fetch with Body
const postData = {
  title: "New Post",
  body: "This is the content of the post",
  userId: 1
};

const fetchWithBody = fetch("https://api.example.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(postData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch with body error:", error));

// 5. Fetch with Error Handling
const fetchWithErrorHandling = fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Resource not found");
      } else if (response.status === 401) {
        throw new Error("Authentication required");
      } else if (response.status >= 500) {
        throw new Error("Server error");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    console.error("Error details:", error.message);
    // Handle error appropriately, e.g., show message to user
  });



// Call the async function
fetchDataAsync().catch(error => console.error("Caught in main:", error));

// 7. Fetch with Abort
const controller = new AbortController();
const { signal } = controller;

// Set a timeout to abort the fetch after 5 seconds
const timeout = setTimeout(() => {
  controller.abort();
  console.log("Fetch aborted due to timeout");
}, 5000);

const fetchWithAbort = fetch("https://api.example.com/data", { signal })
  .then(response => {
    clearTimeout(timeout); // Clear the timeout if the fetch completes
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === "AbortError") {
      console.log("Fetch was aborted");
    } else {
      console.error("Fetch error:", error);
    }
  });

// 8. Fetch with CORS
const fetchWithCORS = fetch("https://api.example.com/data", {
  mode: "cors", // Default, but explicit for demonstration
  credentials: "same-origin" // Options: 'omit', 'same-origin', 'include'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("CORS fetch error:", error));

// 9. Fetch with JSON
const jsonData = { name: "John", age: 30 };

const fetchWithJSON = fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(jsonData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("JSON fetch error:", error));

// 10. Fetch with FormData
const formData = new FormData();
formData.append("username", "johndoe");
formData.append("password", "secret123");
formData.append("profileImage", new Blob(["image data"], { type: "image/jpeg" }), "profile.jpg");

const fetchWithFormData = fetch("https://api.example.com/login", {
  method: "POST",
  body: formData // FormData is automatically set with the right Content-Type
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("FormData fetch error:", error));

// 11. Fetch with Blob
const fetchBlob = fetch("https://example.com/image.jpg")
  .then(response => response.blob())
  .then(blob => {
    // Use the blob, e.g., create an object URL
    const imageURL = URL.createObjectURL(blob);
    console.log("Blob URL:", imageURL);
    
    // Example: display the image
    // const img = document.createElement('img');
    // img.src = imageURL;
    // document.body.appendChild(img);
  })
  .catch(error => console.error("Blob fetch error:", error));

// 12. Fetch with ArrayBuffer
const fetchArrayBuffer = fetch("https://example.com/binary-data")
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // Work with the binary data
    console.log("Buffer size:", buffer.byteLength);
    const view = new Uint8Array(buffer);
    console.log("First byte:", view[0]);
  })
  .catch(error => console.error("ArrayBuffer fetch error:", error));

// 13. Fetch with URLSearchParams
const params = new URLSearchParams();
params.append("q", "javascript fetch");
params.append("sort", "relevance");

const fetchWithURLSearchParams = fetch(`https://api.example.com/search?${params.toString()}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("URLSearchParams fetch error:", error));

// 14. Fetch with Response Type
const fetchResponseTypes = async () => {
  try {
    // JSON response
    const jsonResponse = await fetch("https://api.example.com/data");
    const jsonData = await jsonResponse.json();
    
    // Text response
    const textResponse = await fetch("https://example.com/text-file.txt");
    const textData = await textResponse.text();
    
    // Blob response
    const blobResponse = await fetch("https://example.com/image.jpg");
    const blobData = await blobResponse.blob();
    
    console.log({ jsonData, textData, blobSize: blobData.size });
  } catch (error) {
    console.error("Response type fetch error:", error);
  }
};

fetchResponseTypes();

// 15. Fetch with Redirect
const fetchWithRedirect = fetch("https://api.example.com/redirect", {
  redirect: "follow" // Options: 'follow', 'error', 'manual'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Redirect fetch error:", error));

// 16. Fetch with Keepalive
// Useful for sending analytics or logging data before page unload
const sendAnalytics = () => {
  fetch("https://analytics.example.com/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ event: "page_exit", timestamp: Date.now() }),
    keepalive: true // Makes the request persist after page unload
  }).catch(error => console.error("Keepalive fetch error:", error));
};

// Add an event listener for page unload
// window.addEventListener('unload', sendAnalytics);

// 17. Fetch with Credentials
const fetchWithCredentials = fetch("https://api.example.com/user/profile", {
  credentials: "include" // Options: 'omit', 'same-origin', 'include'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Credentials fetch error:", error));

// 18. Fetch with Mode
// Controls CORS mode for the request
const fetchWithMode = fetch("https://api.example.com/data", {
  mode: "cors" // Options: 'cors', 'no-cors', 'same-origin', 'navigate'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Mode fetch error:", error));

// 19. Fetch with Cache
const fetchWithCache = fetch("https://api.example.com/data", {
  cache: "no-cache" // Options: 'default', 'no-cache', 'reload', 'force-cache', 'only-if-cached'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Cache fetch error:", error));

// 20. Fetch with Referrer
const fetchWithReferrer = fetch("https://api.example.com/data", {
  referrer: "https://example.com/previous-page"
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Referrer fetch error:", error));

// 21. Fetch with ReferrerPolicy
const fetchWithReferrerPolicy = fetch("https://api.example.com/data", {
  referrerPolicy: "no-referrer-when-downgrade" 
  // Options: 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 
  // 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("ReferrerPolicy fetch error:", error));

// 22. Fetch with Signal
// Similar to Abort example, but separated for clarity
const abortController = new AbortController();
const abortSignal = abortController.signal;

const fetchWithSignal = fetch("https://api.example.com/data", {
  signal: abortSignal
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === "AbortError") {
      console.log("Fetch was aborted with signal");
    } else {
      console.error("Signal fetch error:", error);
    }
  });

// To abort the fetch:
// abortController.abort();

// 23. Fetch with ReadableStream
// Process a stream of data incrementally
const fetchWithStream = fetch("https://api.example.com/large-data")
  .then(response => {
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    let chunks = [];

    return new Promise((resolve, reject) => {
      function processStream({ done, value }) {
        if (done) {
          const allChunks = new Uint8Array(receivedLength);
          let position = 0;
          for (const chunk of chunks) {
            allChunks.set(chunk, position);
            position += chunk.length;
          }
          resolve(allChunks);
          return;
        }

        chunks.push(value);
        receivedLength += value.length;
        
        // Calculate and log progress
        const progress = (receivedLength / contentLength) * 100;
        console.log(`Received ${receivedLength} of ${contentLength} bytes (${progress.toFixed(2)}%)`);
        
        // Continue reading
        return reader.read().then(processStream);
      }

      reader.read().then(processStream).catch(reject);
    });
  })
  .then(data => {
    console.log("Stream complete, total bytes:", data.length);
    // Use the data, e.g., convert to string if it's text
    // const text = new TextDecoder().decode(data);
    // console.log(text);
  })
  .catch(error => console.error("Stream fetch error:", error));
