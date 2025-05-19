console.log("Start");

const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) {
      resolve("sub");
    } else {
      reject("error");
    }
  }, 1000);
});

sub
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });

console.log("End");
// result: start end sub


console.log("Start");

console.log(Promise.resolve("sub2"));

console.log("End");



