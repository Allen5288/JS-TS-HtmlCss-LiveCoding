
var maxCandies = function (
    status,
    candies,
    keys,
    containedBoxes,
    initialBoxes,
) {
    const n = status.length;
    const canOpen = new Array(n).fill(false);
    const hasBox = new Array(n).fill(false);
    const used = new Array(n).fill(false);

    for (let i = 0; i < n; ++i) {
        canOpen[i] = status[i] === 1;
    }
    const q = [];
    let ans = 0;
    for (const box of initialBoxes) {
        hasBox[box] = true;
        if (canOpen[box]) {
            q.push(box);
            used[box] = true;
            ans += candies[box];
        }
    }
    while (q.length > 0) {
        const bigBox = q.shift();
        for (const key of keys[bigBox]) {
            canOpen[key] = true;
            if (!used[key] && hasBox[key]) {
                q.push(key);
                used[key] = true;
                ans += candies[key];
            }
        }
        for (const box of containedBoxes[bigBox]) {
            hasBox[box] = true;
            if (!used[box] && canOpen[box]) {
                q.push(box);
                used[box] = true;
                ans += candies[box];
            }
        }
    }

    return ans;
};