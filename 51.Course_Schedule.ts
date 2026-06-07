export default function canCompleteCourse(
  courses: number,
  prerequisites: number[][],
): boolean {
  // Example:
  // courses = 4
  // prerequisites = [
  //   [1, 0], // To take course 1, first complete 0
  //   [2, 0], // To take course 2, first complete 0
  //   [3, 1], // To take course 3, first complete 1
  //   [3, 2], // To take course 3, first complete 2
  // ]

  const graph: number[][] = Array.from(
    { length: courses },
    () => []
  );

  const indegree = Array(courses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    indegree[course]++;
  }

  // Graph representation:
  //
  // 0 ──► 1 ──► 3
  // │
  // └──► 2 ──► 3
  //
  // graph =
  // [
  //   [1, 2], // 0 -> 1, 2
  //   [3],    // 1 -> 3
  //   [3],    // 2 -> 3
  //   []      // 3
  // ]
  //
  // indegree =
  // [
  //   0, // course 0 has no prerequisites
  //   1, // prerequisite: 0
  //   1, // prerequisite: 0
  //   2  // prerequisites: 1 and 2
  // ]

  const queue: number[] = [];

  // Add all courses with no prerequisites
  for (let i = 0; i < courses; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  // Initial queue = [0]

  let processed = 0;
  let front = 0;

  while (front < queue.length) {
    const current = queue[front++];
    processed++;

    // Process current course and remove its outgoing edges
    for (const neighbor of graph[current]) {
      indegree[neighbor]--;

      // When all prerequisites are satisfied,
      // add course to queue
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }

    // Iteration walkthrough:
    //
    // Process 0:
    // indegree = [0,0,0,2]
    // queue = [0,1,2]
    //
    // Process 1:
    // indegree = [0,0,0,1]
    //
    // Process 2:
    // indegree = [0,0,0,0]
    // queue = [0,1,2,3]
    //
    // Process 3:
    // done
  }

  // If all courses were processed,
  // no cycle exists.
  return processed === courses;
}
