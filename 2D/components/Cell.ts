import { GridCanvasComponent } from './Grid';

export interface GridCellCanvasComponent {
  x: number;
  y: number;
  size: number;
  draw: () => void;
  getNeighbours(): GridCellCanvasComponent[];
}

export type GridCellCallback = (cell: GridCellCanvasComponent, idx: number) => void;

class Cell implements GridCellCanvasComponent {
  constructor(
    private grid: GridCanvasComponent,
    public x: number,
    public y: number,
    public size: number,
  ) {}

  getNeighbours() {
    return [
      this.grid.getCellAt(this.x, this.y - 1),
      this.grid.getCellAt(this.x + 1, this.y),
      this.grid.getCellAt(this.x, this.y + 1),
      this.grid.getCellAt(this.x - 1, this.y),
    ];
  }

  draw() {

  }
}

export default Cell;

