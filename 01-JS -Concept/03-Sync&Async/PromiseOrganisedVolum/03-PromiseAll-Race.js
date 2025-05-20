// promise.all

function importantAction(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName) {
        resolve(`User ${userName} is logged in`);
      } else {
        reject("User not logged in");
      } 
function getUserData(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName) {
        resolve(`User data for ${userName}`);
      } else {
        reject("No user data found");
      }
    }, 1000);
  });
}

function getUserData2(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName) {
        resolve(`User data 2 for ${userName}`);
      } else {
        reject("No user data found");
      }
    }, 1000);
  });
}

// Using Promise.all to handle multiple promises
Promise.all([
  importantAction("JohnDoe"),
  getUserData("JohnDoe2"),
  getUserData2("JohnDoe3"),
])
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch((error) => {
    console.error(error);
  });

Promise.race([
  importantAction("JohnDoe"),
  getUserData("JohnDoe2"),
  getUserData2("JohnDoe3"),
])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
