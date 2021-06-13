const CELL_SIZE = 40;

let light, grid;
let gameStarted = false;
let walls = [];

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.current = false;
    this.visited = false;
    this.backtraced = false;
    const i = x * CELL_SIZE;
    const j = y * CELL_SIZE;
    this.i = i;
    this.j = j;
    this.boundaries = {
      top: [i, j, i + CELL_SIZE, j],
      right: [i + CELL_SIZE, j, i + CELL_SIZE, j + CELL_SIZE],
      bottom: [i + CELL_SIZE, j + CELL_SIZE, i, j + CELL_SIZE],
      left: [i, j + CELL_SIZE, i, j]
    };
  }

  getNeighbours() {
    const top = grid.getCell(this.x, this.y - 1);
    const right = grid.getCell(this.x + 1, this.y)
    const bottom = grid.getCell(this.x, this.y + 1)
    const left = grid.getCell(this.x - 1, this.y);

    return [top, right, bottom, left].filter(n => n && !n.visited);
  }

  getBoundaries() {
    return Object.values(this.boundaries);
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
      fill(225);
      // fill(60, 120, 255);
      rect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    if (this.current || this.backtraced) {
      noStroke();
      fill(225);
      // fill(225, 150, 80);
      rect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    stroke(25);
    Object.values(this.boundaries).forEach(side => side && line(...side));
  }
}

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
      current.boundaries.left = null;
      next.boundaries.right = null;
    }
    if (current.x - next.x < 0) {
      current.boundaries.right = null;
      next.boundaries.left = null;
    }
    if (current.y - next.y > 0) {
      current.boundaries.top = null;
      next.boundaries.bottom = null;
    }
    if (current.y - next.y < 0) {
      current.boundaries.bottom = null;
      next.boundaries.top = null;
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
      console.log('Starting game...')

      // Generate walls from current cell boundaries
      this.cells.forEach(cell => {
        Object.values(cell.boundaries).forEach(boundary => {
          if (boundary) {
            walls.push(new Wall(...boundary));
          }
        });
      });

      gameStarted = true;
      return;
    }
    this.currentCell = this.visitedStack.pop();
    this.currentCell.backtraced = true;
  }

  render() {
    this.cells.forEach(cell => cell.show());
  }
}

class Wall {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end   = createVector(x2, y2);
  }

  render() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}



class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(wall) {

    // Start and end points of the wall
    const x1 = wall.start.x;
    const y1 = wall.start.y;
    const x2 = wall.end.x;
    const y2 = wall.end.y;

    // Ray's current position and direction
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Denominator used to calcualte intersection point between
    // two lines. If it's 0 lines are perfectly parallel.
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    // Check if these two lines intersect at any point, and return that point.
    if (t > 0 && t < 1 && u > 0) {
      const ip = createVector(
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1)
      );

      return ip;
    }
  }
}

class Light {
  constructor(x, y, c = color(255)) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.rays = [];
    this.color = c;
    this.r = CELL_SIZE / 4; // radius
    // this.currentCell = this.getCurrentCell();
    // this.boundaries = this.getBoundaries();

    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  getCurrentCell() {
    return grid.getCell(
      floor((this.pos.x / width) * cols),
      floor((this.pos.y / height) * rows)
    );
  }

  getBoundaries(cell) {
    return cell.getBoundaries();
  }

  move(x, y) {
    if (this.pos.y + y - this.r <= 0 ||
        this.pos.y + y + this.r >= height ||
        this.pos.x + x + this.r >= width ||
        this.pos.x + x - this.r <= 0
       ) {
      return this.vel.set(0, 0);
    }

    const currentCell = this.getCurrentCell();
    const [top, right, bottom, left] = this.getBoundaries(currentCell);

    // horizontal movement
    if (y === 0) {
      if (left && this.pos.x + x <= currentCell.i ||
          right && this.pos.x + x >= currentCell.i + CELL_SIZE) {
        return this.vel.set(0, 0);
      }
    } else {
      // vertical movement
      if (top && this.pos.y + y <= currentCell.j ||
          bottom && this.pos.y + y >= currentCell.j + CELL_SIZE) {
        return this.vel.set(0, 0);
      }
    }

    this.vel.set(x, y);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x >= width - CELL_SIZE &&
        this.pos.y >= height - CELL_SIZE) {
      resetGame();
    }
  }

  render() {
    fill(225);
    ellipse(this.pos.x, this.pos.y, CELL_SIZE / 2, CELL_SIZE / 2);
    stroke(this.color);
    this.color.setAlpha(50);

    this.rays.forEach(ray => {
      let shortestDist = Infinity;
      let closestPoint = Infinity;

      // Check which wall is closest
      walls.forEach(wall => {
        const ip = ray.cast(wall);
        if (!ip) return;

        const distance = p5.Vector.dist(this.pos, ip);
        if (distance < shortestDist) {
          shortestDist = distance;
          closestPoint = ip;
        }
      });

      line(ray.pos.x, ray.pos.y, closestPoint.x, closestPoint.y);
    });
  }
}

function setup() {
  createCanvas(400, 400);
  stroke(255);

  cols = floor(width  / CELL_SIZE);
  rows = floor(height / CELL_SIZE);
  grid = new Grid(cols, rows);

  light = new Light(CELL_SIZE / 3, CELL_SIZE / 2);
}

function draw() {
  background(50);

  if (gameStarted) {
    // Draw starting position
    push();
    fill(225, 150, 80);
    rect(0, 0, CELL_SIZE);

    // Draw finish cell
    fill(80, 225, 150);
    rect(width - CELL_SIZE, height - CELL_SIZE, CELL_SIZE);
    pop();

    checkControls();
    light.update();
    light.render();
  } else {
    grid.render();
    grid.update();
  }

}

function resetGame() {
  gameStarted = false;
  walls = [];
  grid = new Grid(cols, rows);
  light.pos.set(CELL_SIZE / 3, CELL_SIZE / 2);
}

function checkControls() {
  if (keyIsDown(RIGHT_ARROW)) {
    light.move(2, 0);
  }
  if (keyIsDown(LEFT_ARROW)) {
    light.move(-2, 0);
  }
  if (keyIsDown(UP_ARROW)) {
    light.move(0, -2);
  }
  if (keyIsDown(DOWN_ARROW)) {
    light.move(0, 2);
  }
}

function keyReleased() {
  switch (keyCode) {
    case UP_ARROW:
    case RIGHT_ARROW:
    case DOWN_ARROW:
    case LEFT_ARROW:
      light.vel.set(0);
  }
}
