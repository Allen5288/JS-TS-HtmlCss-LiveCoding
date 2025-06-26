/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function(dominoes) {
    const n = dominoes.length;
    const forces = new Array(n).fill(0);
    
    // Compute right forces (R)
    let force = 0;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === 'R') force = n; // Max force applied
        else if (dominoes[i] === 'L') force = 0; // Counter force cancels R
        else force = Math.max(0, force - 1); // Gradual decrease
        forces[i] += force;
    }
    
    // Compute left forces (L)
    force = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === 'L') force = n;
        else if (dominoes[i] === 'R') force = 0;
        else force = Math.max(0, force - 1);
        forces[i] -= force; // Subtract because L opposes R
    }
    
    // Construct final result
    return forces.map(f => f > 0 ? 'R' : f < 0 ? 'L' : '.').join('');
};