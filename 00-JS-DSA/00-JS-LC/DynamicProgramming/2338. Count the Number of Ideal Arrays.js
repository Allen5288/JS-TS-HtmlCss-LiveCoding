const MODULO = 10n ** 9n + 7n;
const MAX_VALUE = 10000;

const STRICT_COUNTS = [Array.from({ length: MAX_VALUE }, (_, i) => BigInt(i + 1))];

let prev_row = Array(MAX_VALUE).fill(1n);
let next_row = Array(MAX_VALUE).fill(0n);
let prev_base = 1;

while ((prev_base << 1) <= MAX_VALUE) {
  const next_base = prev_base << 1;

  for (let i = next_base - 1; i < MAX_VALUE; i++) {
    next_row[i] = 0n;
  }

  for (let prev_num = prev_base; prev_num <= MAX_VALUE; prev_num++) {
    const prev_count = prev_row[prev_num - 1];
    for (let mult = 2; ; mult++) {
      const product = prev_num * mult;
      if (product > MAX_VALUE) break;
      next_row[product - 1] = (next_row[product - 1] + prev_count) % MODULO;
    }
  }

  const current_counts = Array(MAX_VALUE + 1 - next_base).fill(next_row[next_base - 1]);
  for (let next_num = next_base + 1; next_num <= MAX_VALUE; next_num++) {
    current_counts[next_num - next_base] =
      (current_counts[next_num - 1 - next_base] + next_row[next_num - 1]) % MODULO;
  }

  STRICT_COUNTS.push(current_counts);
  prev_base = next_base;
  [prev_row, next_row] = [next_row, prev_row];
}

function idealArrays(n, maxValue) {
  let count = 0n;
  let combo = 1n;
  let topFactor = BigInt(n - 1);
  let bottomFactor = 1n;
  let base = 1;

  const maxK = Math.min(n, STRICT_COUNTS.length);

  for (let k = 0; k < maxK; k++) {
    if (base <= maxValue) {
      const idx = maxValue - base;
      count = (count + combo * STRICT_COUNTS[k][idx]) % MODULO;
    } else {
      break;
    }

    combo = (combo * topFactor) / bottomFactor;
    topFactor -= 1n;
    bottomFactor += 1n;
    base <<= 1;
  }

  return Number(count);
}

 