console.log("Start");

function importantAction(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName) {
        resolve(`User ${userName} is logged in`);
      } else {
        reject("User not logged in");
      }
    }, 1000);
  });
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

importantAction("JohnDoe")
  .then((message) => {
    console.log(message + "1");
    return getUserData("JohnDoe");
  })
  .then((userData) => {
    console.log(userData + "2");
    return getUserData2("JohnDoe");
  })
  .then((userData2) => {
    console.log(userData2 + "3");
  })
  .catch((error) => {
    console.error(error);
  });
