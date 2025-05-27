// implement a bizbuz function that takes a number n and returns an array of strings.
function bizbuz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('BizBuz');
    } else if (i % 3 === 0) {
      result.push('Biz');
    } else if (i % 5 === 0) {
      result.push('Buz');
    } else {
      result.push(i.toString());
    }
  }
  return result;
}

// if we add more after biz buz and we add more after biz buz bn 
// we can add more conditions to the function
// to make this code could be more flexible with various conditions
function addCondition(condition, output) {
  return function(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
      if (condition(i)) {
        result.push(output);
      } else {
        result.push(i.toString());
      }
    }
    return result;
  };
}
function addBizBuzCondition(n) {
  return addCondition(
    (i) => i % 3 === 0 && i % 5 === 0, 'BizBuz',
    (i) => i % 3 === 0, 'Biz',
    (i) => i % 5 === 0, 'Buz',
  )(n);
}

// Example usage:
console.log(bizbuz(15)); // ["1", "2", "Biz", "4", "Buz", "Biz", "7", "8", "Biz", "Buz", "11", "Biz", "13", "14", "BizBuz"]
console.log(addBizBuzCondition(15)); // ["1", "2", "Biz", "4", "Buz", "Biz", "7", "8", "Biz", "Buz", "11", "Biz", "13", "14", "BizBuz"]