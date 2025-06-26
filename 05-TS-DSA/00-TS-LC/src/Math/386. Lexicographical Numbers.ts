function lexicalOrder(n: number): number[] {
  const numbers = [];
  let currentNum = 1;
  for (let i = 0; i < n; i++) {
    numbers.push(currentNum);
    if (currentNum * 10 <= n) currentNum *= 10;
    else {
      while (currentNum % 10 === 9 || currentNum >= n) {
        currentNum = Math.floor(currentNum / 10);
      }
      currentNum += 1;
    }
  }
  return numbers;
}
