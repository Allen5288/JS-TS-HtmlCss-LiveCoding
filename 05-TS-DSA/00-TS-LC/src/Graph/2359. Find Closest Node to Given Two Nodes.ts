import { TestHelper } from '../TestHelper';

/**
 * LeetCode 2359. Find Closest Node to Given Two Nodes
 * 
 * TODO: Add problem description
 */
export class FindClosestNodeToGivenTwoNodes {
  /**
   * Main solution method
   * Time Complexity: O(?)
   * Space Complexity: O(?)
   */
  closestMeetingNode(edges: any, node1: any, node2: any): number {
    let map1 = {}
        let map2 = {}
        let count = 0;
    
        while(map1[node1] == undefined && node1 != -1){
            map1[node1] = count;
            count++
            node1 = edges[node1];
        }
        count = 0;
        while(map2[node2] == undefined && node2 != -1){
            map2[node2] = count;
            count++
            node2 = edges[node2]
        }
        let max = Infinity;
        let res = -1;
    
        for(let i =0; i<edges.length;i++){
            if(map1[i] == undefined || map2[i] == undefined) continue;
            let localMax = Math.max(map1[i],map2[i])
            if(localMax<max){
                max = localMax;
                res = i;
            }
        }
    
        return res;
  }

  /**
   * Run test cases
   */
  static runTests(): void {
    TestHelper.printHeader('LeetCode 2359. Find Closest Node to Given Two Nodes');
    
    const solution = new FindClosestNodeToGivenTwoNodes();
    
    // TODO: Add comprehensive test cases
    console.log('✅ FindClosestNodeToGivenTwoNodes created successfully');
    console.log('📝 Please add test cases and problem description');
  }
}