import { CELL_SIZE, MAP_COLS, MAP_ROWS, MAP, TILE_TYPE } from '../defs';
import Boundary from './Boundary';
import Vector from './Vector';
import Food from './Food';
import drawCircle from '../utils/drawCircle';

class Grid {
  private grid: (Food|Boundary)[];

  constructor() {
    this.grid = [];
    // this.createGrid();
  }

  // createGrid() {
  //   for (let x = 0; x < MAP_COLS; x++) {
  //     for (let y = 0; y < MAP_ROWS; y++) {
  //       switch(MAP[y][x]) {
  //         case '5':
  //           this.grid.push(new Boundary(
  //             x * CELL_SIZE + 1,
  //             y * CELL_SIZE + 1,
  //             CELL_SIZE,
  //           ));
  //         break;
  //         default:
  //           this.grid.push(new Food(
  //             x * CELL_SIZE + 1,
  //             y * CELL_SIZE
  //           ));
  //           break;
  //       }
  //       // if (MAP[y][x] === '1') {
  //       // }
  //     }
  //   }
  // }

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
    MAP[y][x] = 0;
  }

  // printCellIdx(ctx: CanvasRenderingContext2D) {
  //   ctx.strokeStyle = 'white';
  //   for (let x = 0; x < MAP_COLS; x++) {
  //     for (let y = 0; y < MAP_ROWS; y++) {
  //       if (x === 0) {
  //         ctx.strokeText(y.toString(), x + CELL_SIZE / 4, y * CELL_SIZE + (CELL_SIZE / 2));
  //       }
  //       if (y === 0) {
  //         ctx.strokeText(x.toString(), x * CELL_SIZE + (CELL_SIZE / 2), y + CELL_SIZE / 2);
  //       }
  //     }
  //   }
  // }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    // this.grid.forEach(item => item.draw(ctx));
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
        }
      }
    }
  }
}

export default Grid;
