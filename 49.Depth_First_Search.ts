function dfs(
  currentNode: string,
  visited: Set<string>,
  dfsTraversal: Array<string>,
  graph: Record<string, Array<string>>,
): void {
  visited.add(currentNode);
  dfsTraversal.push(currentNode);
  for (let neighbour of graph[currentNode] ?? []) {
    if (!visited.has(neighbour)) {
      dfs(neighbour, visited, dfsTraversal, graph);
    }
  }
}
export default function depthFirstSearch(
  graph: Record<string, Array<string>>,
  source: string,
): Array<string> {
  const visited = new Set<string>();
  const dfsTraversal: Array<string> = [];
  if (graph[source]) {
    dfs(source, visited, dfsTraversal, graph);
  }

  return dfsTraversal;
}
