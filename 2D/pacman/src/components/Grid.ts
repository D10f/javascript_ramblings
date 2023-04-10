import { CELL_SIZE, MAP_COLS, MAP_ROWS, MAP } from '../defs';
import Boundary from './Boundary';
import Vector from './Vector';

class Grid {
  private grid: any[];

  constructor() {
    this.grid = [];
    this.createGrid();
  }

  createGrid() {
    for (let x = 0; x < MAP_COLS; x++) {
      for (let y = 0; y < MAP_ROWS; y++) {
        switch(MAP[y][x]) {
          case '5':
            this.grid.push(new Boundary(
              x * CELL_SIZE + 1,
              y * CELL_SIZE,
              CELL_SIZE - 1,
            ));
          break;
        }
        // if (MAP[y][x] === '1') {
        // }
      }
    }
  }

  static getTileAt(v: Vector) {
    const x = Math.floor(v.x / CELL_SIZE);
    const y = Math.floor(v.y / CELL_SIZE);
    return parseInt(MAP[y][x]);
  }

  printCellIdx(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';
    for (let x = 0; x < MAP_COLS; x++) {
      for (let y = 0; y < MAP_ROWS; y++) {
        if (x === 0) {
          ctx.strokeText(y.toString(), x + CELL_SIZE / 4, y * CELL_SIZE + (CELL_SIZE / 2));
        }
        if (y === 0) {
          ctx.strokeText(x.toString(), x * CELL_SIZE + (CELL_SIZE / 2), y + CELL_SIZE / 2);
        }
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.grid.forEach(item => item.draw(ctx));
    // this.printCellIdx(ctx);
  }
}

export default Grid;
