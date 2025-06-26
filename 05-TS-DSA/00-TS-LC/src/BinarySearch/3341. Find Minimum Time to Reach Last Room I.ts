import { TestHelper } from '../TestHelper';

/**
 * LeetCode 3341. Find Minimum Time to Reach Last Room I
 * 
 * TODO: Add problem description
 */
export class FindMinimumTimeToReachLastRoomI {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  minTimeToReach(moveTime: any): number {
    const n = moveTime.length,
            m = moveTime[0].length;
        const d = Array.from({ length: n }, () => Array(m).fill(Infinity));
        const v = Array.from({ length: n }, () => Array(m).fill(false));
        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        const q = new PriorityQueue((a, b) => {
            return a.dist < b.dist ? -1 : 1;
        });
    
        d[0][0] = 0;
        q.enqueue({ x: 0, y: 0, dist: 0 });
        while (!q.isEmpty()) {
            const s = q.dequeue();
            if (v[s.x][s.y]) {
                continue;
            }
            v[s.x][s.y] = true;
            for (const [dx, dy] of dirs) {
                const nx = s.x + dx,
                    ny = s.y + dy;
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }
                const dist = Math.max(d[s.x][s.y], moveTime[nx][ny]) + 1;
                if (d[nx][ny] > dist) {
                    d[nx][ny] = dist;
                    q.enqueue({ x: nx, y: ny, dist: dist });
                }
            }
        }
    
        return d[n - 1][m - 1];
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 3341. Find Minimum Time to Reach Last Room I');
    
    const solution = new FindMinimumTimeToReachLastRoomI();
    
    // TODO: Add comprehensive test cases
    console.log('✅ FindMinimumTimeToReachLastRoomI created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}