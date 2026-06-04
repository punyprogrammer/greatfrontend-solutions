const directions: [number, number][] = [
  [-1, 0], // Up
  [1, 0],  // Down
  [0, -1], // Left
  [0, 1],  // Right
];

function dfs(grid:number[][],visited:number[][],x:number,y:number,m:number,n:number):void{

  visited[x][y] = 1;
  for( const [dx,dy] of directions){
    const xNew = dx+x;
    const yNew = dy+y;
    if(xNew >=0 && xNew < m && y>=0 && y<n && !visited[xNew][yNew] && grid[xNew][yNew]){
      dfs(grid,visited,xNew,yNew,m,n)
    }

  }

}

export default function countGridIslands(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(0));
  let islands = 0;
  for(let x = 0 ;x<m;x++){
    for(let y =0 ;y<n;y++){
      if(!visited[x][y] && grid[x][y]){
        islands++;
        dfs(grid,visited,x,y,m,n);
      }
    }
  }
  return islands;

}
