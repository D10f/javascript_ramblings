import { CELL_SIZE, MAP, TILE_TYPE } from '../defs';
import Vector from './Vector';
import { drawCircle } from '../utils';

class Grid {
  private increasePoints: (amt: number) => void;

  constructor(increasePoints: (amt: number) => void) {
    this.increasePoints = increasePoints;
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
