import type { Point, Store } from '../types';
import { MAP_WIDTH, MAP_HEIGHT, STORES, FLOORS } from '../constants';

type GridCollection = Record<number, boolean[][]>;
type ConnectorMap = Map<string, Point>;

// Create a grid for each floor representing the map, with obstacles
const createGridsAndConnectors = (): { grids: GridCollection, connectors: ConnectorMap } => {
  const grids: GridCollection = {};
  const connectors: ConnectorMap = new Map();

  FLOORS.forEach(floor => {
    grids[floor] = Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill(true));
  });

  STORES.forEach(store => {
    const grid = grids[store.floor];
    if (!grid) return;

    for (let y = store.y; y < store.y + store.height; y++) {
      for (let x = store.x; x < store.x + store.width; x++) {
        if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
          grid[y][x] = false;
        }
      }
    }
    // Carve out the door
    const doorX = store.x + store.door.x;
    const doorY = store.y + store.door.y;
    if (doorX >= 0 && doorX < MAP_WIDTH && doorY >= 0 && doorY < MAP_HEIGHT) {
      grid[doorY][doorX] = true;
    }

    // Register connectors
    if (store.linksTo) {
      const startPoint = { x: store.x + store.door.x, y: store.y + store.door.y, floor: store.floor };
      connectors.set(`${startPoint.x},${startPoint.y},${startPoint.floor}`, store.linksTo);
    }
  });

  return { grids, connectors };
};

const { grids, connectors } = createGridsAndConnectors();

const isPointValid = (p: Point): boolean => {
    return grids[p.floor]?.[p.y]?.[p.x] ?? false;
}

export const findPath = (start: Point, end: Point): Point[] | null => {
  if (!isPointValid(start) || !isPointValid(end)) {
    return null; // Start or end is on an obstacle or invalid floor
  }

  const queue: Point[] = [start];
  const cameFrom: Map<string, Point | null> = new Map();
  const startKey = `${start.x},${start.y},${start.floor}`;
  const visited = new Set<string>([startKey]);
  cameFrom.set(startKey, null);

  const directions = [
    { x: 0, y: 1, floor: 0 },  // Down
    { x: 0, y: -1, floor: 0 }, // Up
    { x: 1, y: 0, floor: 0 },  // Right
    { x: -1, y: 0, floor: 0 }, // Left
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.x === end.x && current.y === end.y && current.floor === end.floor) {
      // Reconstruct path
      const path: Point[] = [];
      let temp: Point | null = current;
      while (temp) {
        path.unshift(temp);
        const tempKey = `${temp.x},${temp.y},${temp.floor}`;
        temp = cameFrom.get(tempKey)!;
      }
      return path;
    }

    // Standard 2D neighbors
    for (const dir of directions) {
      const next: Point = { x: current.x + dir.x, y: current.y + dir.y, floor: current.floor };
      const nextKey = `${next.x},${next.y},${next.floor}`;

      if (isPointValid(next) && !visited.has(nextKey)) {
        visited.add(nextKey);
        cameFrom.set(nextKey, current);
        queue.push(next);
      }
    }

    // Check for floor connectors (stairs/escalators)
    const currentKey = `${current.x},${current.y},${current.floor}`;
    if (connectors.has(currentKey)) {
        const next = connectors.get(currentKey)!;
        const nextKey = `${next.x},${next.y},${next.floor}`;
        if (!visited.has(nextKey)) {
            visited.add(nextKey);
            cameFrom.set(nextKey, current);
            queue.push(next);
        }
    }
  }

  return null; // No path found
};
