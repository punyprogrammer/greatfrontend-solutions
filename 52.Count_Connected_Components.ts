function dfs(source: number, visited: boolean[], graph: number[][]) {
  visited[source] = true;

  for (const neighbour of graph[source]) {
    if (!visited[neighbour]) {
      dfs(neighbour, visited, graph);
    }
  }
}

export default function graphCountConnectedComponents(
  n: number,
  edges: Array<[number, number]>,
): number {
  const graph: number[][] = Array.from({ length: n }, () => []);

  const visited: boolean[] = Array(n).fill(false);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let connectedComponents = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      connectedComponents++;
      dfs(i, visited, graph);
    }
  }

  return connectedComponents;
}
