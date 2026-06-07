
export default function topologicalSort(
  graph: Record<string, Array<string>>,
): Array<string> {
  const indegree = new Map<string, number>();
  const nodes = new Set<string>();
  const queue = new Queue<string>();
  const results = Array<string>();

  for (const [src, neighbors] of Object.entries(graph)) {
    nodes.add(src);

    if (!indegree.has(src)) {
      indegree.set(src, 0);
    }

    for (const dest of neighbors) {
      nodes.add(dest);
      indegree.set(dest, (indegree.get(dest) ?? 0) + 1);
    }
  }

  for (const node of nodes) {
    if ((indegree.get(node) ?? 0) === 0) {
      queue.enqueue(node);
    }
  }
  // bfs traversal
  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()!;
    results.push(currentNode);
    for (const neighbour of graph[currentNode] ?? []) {
      // reduce indegree
      indegree.set(neighbour, indegree.get(neighbour)! - 1);

      if (indegree.get(neighbour) === 0) {
        queue.enqueue(neighbour);
      }
    }
  }
  return results.length === nodes.size ? results : [];
}

// `Queue` data structure is provided in case you want to use it.
class Node<T> {
  value: T | undefined;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value?: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue<T> {
  _dummyHead: Node<T>;
  _dummyTail: Node<T>;
  _length: number;

  constructor() {
    this._dummyHead = new Node<T>();
    this._dummyTail = new Node<T>();
    this._dummyHead.prev = this._dummyTail;
    this._dummyTail.next = this._dummyHead;
    this._length = 0;
  }

  /**
   * Adds an item to the back of the queue.
   */
  enqueue(item: T) {
    const node = new Node(item);
    const prevLast = this._dummyTail.next;
    prevLast!.prev = node;

    node.next = prevLast;
    node.prev = this._dummyTail;
    this._dummyTail.next = node;
    this._length++;
    return this._length;
  }

  /**
   * Remove an item from the front of the queue.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._dummyHead.prev;
    const newFirst = node!.prev;
    this._dummyHead.prev = newFirst;
    newFirst!.next = this._dummyHead;
    // Unlink the node to be dequeued.
    node!.prev = null;
    node!.next = null;
    this._length--;
    return node!.value;
  }

  /**
   * Determines if the queue is empty.
   */
  isEmpty(): boolean {
    return this._length === 0;
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyHead.prev!.value;
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue it.
   */
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyTail.next!.value;
  }

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length(): number {
    return this._length;
  }
}
