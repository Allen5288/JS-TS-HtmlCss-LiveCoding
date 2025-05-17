// achieve your own promise

// Define promise states
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(this.value));
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // Handle optional callbacks
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    // For async resolution
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }

    // For sync resolution
    if (this.state === FULFILLED) {
      setTimeout(() => onFulfilled(this.value), 0);
    }

    if (this.state === REJECTED) {
      setTimeout(() => onRejected(this.reason), 0);
    }

    return this; // For simple chaining
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Example usage
console.log('Creating promise...');

const fetchData = (shouldSucceed) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve('Data successfully fetched');
      } else {
        reject('Error fetching data');
      }
    }, 1000);
  });
};

// Success example
fetchData(true)
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Failure example
fetchData(false)
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.log('Error:', error);
  });

console.log('Promise created. Waiting for resolution...');
