interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
function solve(root:TreeNode| null):number{
  if(root === null) return 0 ;
  const leftHeight = solve(root.left);
  const rightHeight = solve(root.right);
  return 1+ Math.max(leftHeight,rightHeight);
}
export default function binaryTreeMaximumDepth(root: TreeNode | null): number {
  return solve(root);
}
