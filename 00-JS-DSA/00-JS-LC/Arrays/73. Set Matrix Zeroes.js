// Single‐pass
const setZeroes = (a) => {
    const m = a.length;
    const n = a[0].length;
    let killp = a[0].includes(0);
    for (let i = 1; i < m; ++i) {
        const rowp = a[i - 1];
        const row = a[i];
        let kill = false;
        for (let j = 0; j < n; ++j) {
            if (row[j] === 0) {
                kill = true;
                if (rowp[j] !== 0)
                    for (let k = 0; k < i; a[k++][j] = 0);
            } else if (rowp[j] === 0) row[j] = 0;
        }
        if (killp === true) rowp.fill(0);
        killp = kill;
    }
    if (killp === true) a[m - 1].fill(0);
};