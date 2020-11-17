class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.cells = this.createGrid(cols, rows);
    this.currentCell = this.cells[0];
    this.visitedStack = [];
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

  removeWalls(current, next) {
    if (current.x - next.x > 0) {
      current.walls.left = null;
      next.walls.right = null;
    }
    if (current.x - next.x < 0) {
      current.walls.right = null;
      next.walls.left = null;
    }
    if (current.y - next.y > 0) {
      current.walls.top = null;
      next.walls.bottom = null;
    }
    if (current.y - next.y < 0) {
      current.walls.bottom = null;
      next.walls.top = null;
    }
  }

  update() {
    const next = this.currentCell.next();

    this.currentCell.current = false;
    this.currentCell.visited = true;

    if (next) {
      next.current = true;
      this.visitedStack.push(this.currentCell);
      this.removeWalls(this.currentCell, next);
      this.currentCell = next;
    } else {
      this.backtrack();
    }
  }

  backtrack() {
    if (this.visitedStack.length === 0) {
      console.log('done!')
      return noLoop();
    }
    this.currentCell = this.visitedStack.pop();
    this.currentCell.backtraced = true;
  }

  show() {
    this.cells.forEach(cell => cell.show());
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.current = false;
    this.visited = false;
    this.backtraced = false;

    const i = x * W;
    const j = y * W;
    this.walls = {
      top:    [i, j, i + W, j],
      right:  [i + W, j, i + W, j + W],
      bottom: [i + W, j + W, i, j + W],
      left:   [i, j + W, i, j]
    };
  }

  getNeighbours() {
    const top     = grid.getCell(this.x, this.y - 1);
    const right   = grid.getCell(this.x + 1, this.y)
    const bottom  = grid.getCell(this.x, this.y + 1)
    const left    = grid.getCell(this.x - 1, this.y);

    return [top, right, bottom, left].filter(n => n && !n.visited);
  }

  getRandomNeighbour() {
    const neighbours = this.getNeighbours();
    const randomIdx = floor(random(neighbours.length));
    return neighbours[randomIdx];
  }

  next() {
    return this.getRandomNeighbour();
  }

  show() {
    if (this.visited) {
      noStroke();
      fill(60, 120, 255);
      rect(this.x * W, this.y * W, W, W);
    }
    if (this.current || this.backtraced) {
      noStroke();
      fill(225, 150, 80);
      rect(this.x * W, this.y * W, W, W);
    }
    stroke(25);
    Object.values(this.walls).forEach(side => side && line(...side));
  }
}

const W = 40;
let cols, rows, current, grid;

function setup() {
  createCanvas(400, 400);
  frameRate(20);
  cols = floor(width / W);
  rows = floor(height / W);
  grid = new Grid(cols, rows);
}

function draw() {
  background(220);
  grid.show();
  grid.update();
}
