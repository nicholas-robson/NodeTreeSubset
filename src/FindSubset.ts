export type Node = { id : string, type:string, adjacent?: Node[] };
export default function findSubset(startNode: Node, targets:string[]) {
  // Use a queue to perform a breadth-first search of the graph
  const queue = [startNode];
  const visited:Node[] = [];
  const matches:Node[] = [];
  while (queue.length > 0) {
    const curNode = queue.shift();
    if (curNode === undefined || visited.indexOf(curNode) !== -1) {
      continue;
    }
    visited.push(curNode);

    // Check if the current node is in the specified subset
    const firstTargetIndex = targets.findIndex(t => t === curNode.type);
    if (firstTargetIndex !== -1) {
      matches.push(curNode);
      // Remove the current node from the subset and continue searching
      targets.splice(firstTargetIndex, 1);
      if (targets.length === 0) {
        // The entire subset has been found, so return the array of node IDs
        return Array.from(matches);
      }
      if (curNode.adjacent !== undefined) {
        // Add the current node's neighbors to the queue
        for (const neighbor of curNode.adjacent) {
          if (visited.indexOf(neighbor) === -1) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  // The entire subset was not found, so return null
  return null;
}
