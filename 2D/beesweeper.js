// Icons made by Freepik from www.flaticon.com

const COLS = 12;
const ROWS = 12;
let grid;
let bee;

function preload() {
  bee = loadImage('bee24x24.png');
}

function setup() {
  createCanvas(460, 460);
  grid = new Grid(COLS, ROWS);
}

function draw() {
  background(220);
  grid.render();
}

function gameOver() {
  grid.cells.forEach(cell => {
    cell.revealed = true;
    cell.getBeeCount();
  });
  noLoop();
}

function mousePressed() {

  // Using traditional `for` loop for performance as return
  // statement ends function execution, whereas a `forEach`
  // loop calls a function for every element.

  for (let i = 0; i < grid.cells.length; i++) {
    if (grid.cells[i].contains(mouseX, mouseY)) {
      return grid.cells[i].reveal();
    }
  }
}

class Grid {
  constructor(cols, rows) {
    this.cells = this.createGrid(cols, rows);
  }

  createGrid(cols, rows) {
    const size = width / cols;
    const grid = [];

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j, size));
      }
    }

    return grid;
  }

  getCell(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y > ROWS) {
      return false;
    }
    return this.cells[x + y * COLS];
  }

  render() {
    this.cells.forEach(cell => {
      fill(255);
      cell.render();
    });
  }
}

class Cell {
  constructor(x, y, s) {
    this.x = x * s;
    this.y = y * s;
    this.s = s;
    this.i = x;
    this.j = y;
    this.bee = random(1) > 0.8;
    this.revealed = false;
    this.neighbours = undefined;
    this.textColor = color(0, 0, 0);
  }

  getNeighbours() {
    return [
      grid.getCell(this.i - 1, this.j - 1), // top left
      grid.getCell(this.i, this.j - 1), // top mid
      grid.getCell(this.i + 1, this.j - 1), // top right
      grid.getCell(this.i - 1, this.j), // left
      grid.getCell(this.i + 1, this.j), // right
      grid.getCell(this.i - 1, this.j + 1), // bot left
      grid.getCell(this.i, this.j + 1), // bot mid
      grid.getCell(this.i + 1, this.j + 1) // bot right
    ].filter(Boolean);
  }

  countBees() {
    const neighbours = this.getNeighbours();
    return neighbours.reduce((bees, cell) => {
      return cell.bee ? bees + 1 : bees;
    }, 0);
  }

  getBeeCount() {
    this.neighbours = this.countBees();
    switch (this.neighbours) {
      case 0:
        this.revealNeighbours();
        break;
      case 1:
        this.textColor = color(50, 50, 225);
        break;
      case 2:
        this.textColor = color(60, 165, 60);
        break;
      case 3:
        this.textColor = color(225, 50, 0);
        break;
      case 4:
        this.textColor = color(125, 50, 125);
    }
  }

  contains(x, y) {
    // Checks if the cell contains a point, used to know if it has been clicked
    return (
      x > this.x && x < this.x + this.s &&
      y > this.y && y < this.y + this.s
    );
  }

  reveal() {
    if (this.bee) {
      gameOver();
    } else {
      this.revealed = true;
      this.getBeeCount();
    }
  }

  revealNeighbours() {
    const neighbours = this.getNeighbours();
    neighbours.forEach(n => {
      if (!n.bee && !n.revealed) {
        n.reveal();
      }
    });
  }

  render() {
    if (!this.revealed) {
      fill(255);
      rect(this.x, this.y, this.s);
      return;
    }

    fill(200);
    rect(this.x, this.y, this.s);

    if (this.bee) {
      image(bee, this.x + 6, this.y + 6);
    } else {
      if (this.neighbours > 0) {
        push();
        stroke(this.textColor);
        fill(this.textColor)
        text(this.neighbours, this.x + 16, this.y + 22);
        pop();
      }
    }
  }
}
