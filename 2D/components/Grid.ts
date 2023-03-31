import Cell, { GridCellCanvasComponent, GridCellCallback } from './Cell';

export interface GridCanvasComponent {
  cols: number;
  rows: number;
  cells: GridCellCanvasComponent[];
  forEachCell: (callback: GridCellCallback) => void;
  getCellAt: (x: number, y: number) => GridCellCanvasComponent;
}

class Grid implements GridCanvasComponent {

  public cols: number;
  public rows: number;
  public cells: GridCellCanvasComponent[];

  constructor(width: number, height: number, cellSize: number) {
    this.cols = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);
    this.createGrid(this.cols, this.rows, cellSize);
  }

  private createGrid(cols: number, rows: number, cellSize: number) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        this.cells[x + y * cols] = new Cell(this, x, y, cellSize);
      }
    }
  }

  private isOutOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= this.cols || y < 0 || y >= this.rows;
  }

  getCellAt(x: number, y: number): GridCellCanvasComponent | null {
    if (!this.isOutOfBounds(x, y)) {
      return this.cells[x + y * this.cols];
    }
  }

  forEachCell(callback: GridCellCallback) {
    let idx = 0;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        callback(this.cells[x + y * this.cols], idx);
        idx++;
      }
    }
  }
}

export default Grid;
