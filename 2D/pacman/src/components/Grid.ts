import { CELL_SIZE, MAP, TILE_TYPE } from '../defs';
import Vector from './Vector';
import { drawCircle } from '../utils';
import PriorityQueue from '../utils/PriorityQueue';

class Grid {
  private increasePoints: (amt: number) => void;

  constructor(increasePoints: (amt: number) => void) {
    this.increasePoints = increasePoints;
  }

  getShortestPath(start: Vector, end: Vector) {

    const openSet = new PriorityQueue<Vector>();
    openSet.enqueue({ value: start, priority: 0 });

    const cameFrom = new Map<string, string>();

    const gScore = new Map<string, number>();
    gScore.set(start.toString(), 0);

    const fScore = new Map<string, number>();
    fScore.set(start.toString(), start.distance(end));

    while (!openSet.isEmpty) {
      const current = openSet.dequeue() as Vector;

      if (current.distance(end) === 0) {
        const shortestPath: Vector[] = [];

        let previous = end.toString();
        while (cameFrom.get(previous)) {
          previous = cameFrom.get(previous) as string;
          const [x, y] = previous.split(',');
          shortestPath.push(new Vector(parseInt(x), parseInt(y)));
        }

        return shortestPath;
      }

      for (const neighbour of this.getNeighbors(current)) {

        const neighbourKey = neighbour.toString();
        const tentativeGScore = (gScore.get(current.toString()) ?? 0) + 1;

        if (!gScore.has(neighbourKey) || tentativeGScore < (gScore.get(neighbourKey) as number)) {
          const neighbourScore = tentativeGScore + neighbour.distance(end);
          cameFrom.set(neighbourKey, current.toString());
          gScore.set(neighbourKey, tentativeGScore);
          fScore.set(neighbourKey, neighbourScore);

          if (!openSet.contains(neighbour)) {
            openSet.enqueue({ value: neighbour, priority: neighbourScore });
          }
        }
      }
    }

    return [];
  }

  getNeighbors(v: Vector) {
    const top = new Vector(v.x, v.y - CELL_SIZE);
    const right = new Vector(v.x + CELL_SIZE, v.y);
    const bottom = new Vector(v.x, v.y + CELL_SIZE);
    const left = new Vector(v.x - CELL_SIZE, v.y);
    return [top, right, bottom, left].filter(v => this.getTileAt(v) !== 5);
  }

  getTileAt(v: Vector) {
    const { x, y } = this.getCoordinates(v);
    return MAP[y][x];
  }

  getCoordinates(v: Vector) {
    const x = Math.floor(v.x / CELL_SIZE);
    const y = Math.floor(v.y / CELL_SIZE);
    return { x, y };
  }

  eatFoodAt(v: Vector) {
    const { x ,y } = this.getCoordinates(v);
    this.increasePoints(MAP[y][x]);
    MAP[y][x] = 0;
    this.checkWinCondition();
  }

  checkWinCondition() {
    for (let i = 0, rows = MAP.length; i < rows; i++) {
      for (let j = 0, cols = MAP[i].length; j < cols; j++) {
        if (MAP[i][j] === TILE_TYPE.FOOD || MAP[i][j] === TILE_TYPE.POWER) return;
      }
    }
    console.log('win');
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0, rows = MAP.length; i < rows; i++) {
      for (let j = 0, cols = MAP[i].length; j < cols; j++) {
        switch (MAP[i][j]) {
          case TILE_TYPE.BOUNDARY:
            ctx.fillStyle = '#8caaee';
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            break;
          case TILE_TYPE.FOOD:
            drawCircle({
              ctx,
              x: j * CELL_SIZE,
              y: i * CELL_SIZE,
              radius: 3,
              color: '#f2d5cf'
            });
            break;
          case TILE_TYPE.POWER:
            drawCircle({
              ctx,
              x: j * CELL_SIZE,
              y: i * CELL_SIZE,
              radius: 8,
              color: '#f2d5cf'
            });
        }
      }
    }
  }
}

export default Grid;
