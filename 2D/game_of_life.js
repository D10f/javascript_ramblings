const W = 25;
let cols, rows, grid;

function setup() {
  createCanvas(400, 400);
  frameRate(1);
  cols = floor(width / W);
  rows = floor(height / W);
  grid = new Grid(cols, rows);
}

function draw() {
  background(220);
  grid.update();
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.cells = this.createGrid(cols, rows);
  }

  createGrid(cols, rows) {
    const grid = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j));
      }
    }
    return grid;
  }

  getCell(x, y) {
    if (x < 0 || x >= cols || y < 0 || y > rows) {
      return false;
    }
    return this.cells[x + y * cols];
  }

  update() {
    const nextGen = this.cells.map(cell => {
      cell.show();
      return cell.next();
    });

    this.cells = nextGen;
  }
}

class Cell {
  constructor(x, y, alive = random(1) > 0.5) {
    this.x = x;
    this.y = y;
    this.alive = alive;
    this.color = this.alive ? color(50, 75, 100) : color(255);
  }

  getNeighbours() {
    return [
      grid.getCell(this.x - 1, this.y - 1), // top left
      grid.getCell(this.x, this.y - 1),     // top mid
      grid.getCell(this.x + 1, this.y - 1), // top right
      grid.getCell(this.x - 1, this.y),     // left
      grid.getCell(this.x + 1, this.y),     // right
      grid.getCell(this.x - 1, this.y + 1), // bot left
      grid.getCell(this.x, this.y + 1),     // bot mid
      grid.getCell(this.x + 1, this.y + 1)  // bot right
    ].filter(Boolean);
  }

  next() {
    const neighbours = this.getNeighbours();
    const aliveCells = neighbours.reduce((sum, cell) => {
      return cell.alive ? ++sum : sum;
    }, 0);

    let nextGeneration;

    if (this.alive && (aliveCells === 2 || aliveCells === 3)) {
      nextGeneration = true;
    } else if (!this.alive && aliveCells === 3) {
      nextGeneration = true;
    } else {
      nextGeneration = false;
    }

    return new Cell(this.x, this.y, nextGeneration);
  }

  // For debugging purposes
  showNeighbours() {
    const neighbours = this.getNeighbours();
    neighbours.forEach(cell => {
      fill(50);
      rect(cell.x * W, cell.y * W, W, W);
    });
    fill(225, 150, 0);
    rect(this.x * W, this.y * W, W, W);
  }

  show() {
    fill(this.color);
    rect(this.x * W, this.y * W, W, W);
  }
}
