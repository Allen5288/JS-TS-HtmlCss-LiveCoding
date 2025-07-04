// write a function to achieve top 3 liked article
// when user click like, with an article, it will increase one
// and also a functio ncna get the top three
// initial there are no article

class ArticleLikesManager {
    constructor() {
        this.likes = new Map(); // article -> like count
        this.order = []; // maintain insertion order for tie-breaker
    }

    like(article) {
        if (!this.likes.has(article)) {
            this.likes.set(article, 1);
            this.order.push(article);
        } else {
            this.likes.set(article, this.likes.get(article) + 1);
        }
    }

    getTop3() {
        // Sort by like count desc, then by insertion order
        return Array.from(this.likes.entries())
            .sort((a, b) => {
                if (b[1] !== a[1]) return b[1] - a[1];
                // If tie, earlier inserted comes first
                return this.order.indexOf(a[0]) - this.order.indexOf(b[0]);
            })
            .slice(0, 3)
            .map(([article]) => article);
    }
}

// Optimized version for O(1) getTop3()
class ArticleLikesManagerOptimized {
    constructor() {
        this.likes = new Map(); // article -> like count
        this.order = []; // maintain insertion order for tie-breaker
        this.top3 = []; // array of top 3 articles
    }

    like(article) {
        if (!this.likes.has(article)) {
            this.likes.set(article, 1);
            this.order.push(article);
        } else {
            this.likes.set(article, this.likes.get(article) + 1);
        }
        this._updateTop3(article);
    }

    _updateTop3(article) {
        // Remove if already in top3
        this.top3 = this.top3.filter(a => a !== article);
        // Insert article in the right position
        let inserted = false;
        for (let i = 0; i < this.top3.length; i++) {
            const curr = this.top3[i];
            const currLikes = this.likes.get(curr);
            const artLikes = this.likes.get(article);
            if (
                artLikes > currLikes ||
                (artLikes === currLikes && this.order.indexOf(article) < this.order.indexOf(curr))
            ) {
                this.top3.splice(i, 0, article);
                inserted = true;
                break;
            }
        }
        if (!inserted) this.top3.push(article);
        // Keep only top 3
        if (this.top3.length > 3) this.top3.length = 3;
    }

    getTop3() {
        return this.top3.slice();
    }
}

// Example usage:
// const manager = new ArticleLikesManager();
// manager.like('A');
// manager.like('B');
// manager.like('A');
// manager.like('C');
// manager.like('B');
// manager.like('D');
// console.log(manager.getTop3()); // e.g. ['A', 'B', 'C']

// const manager2 = new ArticleLikesManagerOptimized();
// manager2.like('A');
// manager2.like('B');
// manager2.like('A');
// manager2.like('C');
// manager2.like('B');
// manager2.like('D');
// console.log(manager2.getTop3()); // e.g. ['A', 'B', 'C']

