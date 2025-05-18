// merge intervals

function mergeIntervals(intervals) {
  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];

  for (const interval of intervals) {
    // If the merged array is empty or the current interval does not overlap with the last merged interval
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      // There is an overlap, so merge the current interval with the last merged interval
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }

  return merged;
}

// Example usage
function testMergeIntervals() {
  const intervals = [
    [1, 3], 
    [2, 6],
    [8, 10],
    [15, 18],
    [17, 20]
  ];

  const mergedIntervals = mergeIntervals(intervals);
  console.log("Merged Intervals:", mergedIntervals);
}
testMergeIntervals();