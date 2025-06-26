const maxTaskAssign = (e, t, s, l) => {
	t.sort((e, t) => e - t), e.sort((e, t) => e - t);
	let r = -1,
		f = Math.min(e.length, t.length) - 1;
	for (; r < f;) {
		let n = r + f + 1 >> 1,
			_ = n;
		for (let i = t.length - 1, o = s, h = []; _ >= 0; _--)
			if (h[0] >= e[_]) h.shift();
			else if (t[i] >= e[_]) i--;
		else if (o > 0) {
			for (; i >= 0 && t[i] + l >= e[_];) h.push(t[i--]);
			if (0 == h.length) break;
			h.pop(), o--
		} else break; - 1 == _ ? r = n : f = n - 1
	}
	return r + 1
};