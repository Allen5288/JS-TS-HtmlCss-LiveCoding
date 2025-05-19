// sync & async
// async function
console.log("Start");
setTimeout(() => {
  console.log("Timeout1");
}, 1000);
console.log("End");
// result: start end timeout

console.log("Start");
function action() {
    setTimeout(() => {
        console.log("Timeout2");
    }, 1000);
}
console.log(action());
console.log("End");
// result: start undefined end timeout2


// callback hell
function callbackHell() {
    setTimeout(() => {
        console.log("Timeout3");
        setTimeout(() => {
            console.log("Timeout4");
            setTimeout(() => {
                console.log("Timeout5");
            }, 1000);
        }, 1000);
    }, 1000);
}
callbackHell();
// result: timeout3 timeout4 timeout5