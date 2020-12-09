const COLS = 15;
const ROWS = 11;
const TILE_SIZE = 32;
const CANVAS_WIDTH = COLS * TILE_SIZE;
const CANVAS_HEIGHT = ROWS * TILE_SIZE;

let player, grid;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(50);

  grid = new Grid();
  player = new Player();
}

function draw() {
  background(220);
  grid.render();
  player.update();
  player.render();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      player.walkDirection = 1;
      break;
    case DOWN_ARROW:
      player.walkDirection = -1;
      break;
    case LEFT_ARROW:
      player.turnDirection = -1;
      break;
    case RIGHT_ARROW:
      player.turnDirection = 1;
      break;
  }
}

function keyReleased() {
  switch (keyCode) {
    case UP_ARROW:
    case DOWN_ARROW:
      player.walkDirection = 0;
      break;
    case LEFT_ARROW:
    case RIGHT_ARROW:
      player.turnDirection = 0;
      break;
  }
}

class Grid {
  constructor() {
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  render() {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const tileX = i * TILE_SIZE;
        const tileY = j * TILE_SIZE;
        const tileColor = this.grid[j][i] === 1 ? color(50) : color(225);
        fill(tileColor);
        rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 5;
    this.facing = 0;        // current angle the player is facing
    this.turnDirection = 0; // 1 turns right, -1 turns left
    this.walkDirection = 0; // 1 moves forward, -1 moves backward
    this.movementSpeed = 2;
    this.rotationSpeed = 3 * (PI / 180);
  }

  update() {
    this.facing += this.turnDirection * this.rotationSpeed;

    // Calculate point for the next step
    const step = this.movementSpeed * this.walkDirection;
    const nextX = this.x + cos(this.facing) * step;
    const nextY = this.y + sin(this.facing) * step;

    // Calculate tile
    const x_idx = ceil((nextX - TILE_SIZE) / TILE_SIZE);
    const y_idx = ceil((nextY - TILE_SIZE) / TILE_SIZE);

    if (grid.grid[y_idx][x_idx] === 1) {
      return false;
    }

    this.x = nextX;
    this.y = nextY;
  }

  render() {
    line(
      this.x,
      this.y,
      this.x + cos(this.facing) * 20,
      this.y + sin(this.facing) * 20
    );
    push();
    noStroke();
    fill(255, 75, 50);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}
