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

class Ray {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = this.normalizeAngle(angle);
    this.targetX = Number.MAX_VALUE;
    this.targetY = Number.MAX_VALUE;
    this.length = 0;

    this.isFacingSouth = this.angle > 0 && this.angle < PI;
    this.isFacingNorth = !this.isFacingSouth;

    this.isFacingEast  = this.angle < HALF_PI || this.angle > PI + HALF_PI;
    this.isFacingWest  = !this.isFacingEast;
  }

  normalizeAngle(angle) {
    let a = angle % TWO_PI;
    if (a < 0) {
      a += TWO_PI;
    }
    return a;
  }

  cast(columnId) {
    let xintersect, yintersect, xstep, ystep;

    /* HORIZONTAL RAY-GRID INTERSECTION */
    let hasHorizontalTarget, horizontalTargetX, horizontalTargetY;

    yintersect = this.isFacingSouth
      ? floor(this.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : floor(this.y / TILE_SIZE) * TILE_SIZE;

    xintersect = this.x + (yintersect - this.y) / tan(this.angle);

    ystep = this.isFacingNorth ? -TILE_SIZE : TILE_SIZE;
    xstep = TILE_SIZE / tan(this.angle);

    if ((this.isFacingWest && xstep > 0) || (this.isFacingEast && xstep < 0)) {
      xstep *= -1;
    }

    if (this.isFacingNorth) { yintersect--; }

    while (
      xintersect >= 0 && xintersect <= width &&
      yintersect >= 0 && yintersect <= height
    ) {
      if (grid.containsWall(xintersect, yintersect)) {
        hasHorizontalTarget = true;
        horizontalTargetX = xintersect;
        horizontalTargetY = yintersect;
        break;
      }
      xintersect += xstep;
      yintersect += ystep;
    }

    /* VERTICAL RAY-GRID INTERSECTION */
    let hasVerticalTarget, verticalTargetX, verticalTargetY;

    xintersect = this.isFacingEast
      ? floor(this.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : floor(this.x / TILE_SIZE) * TILE_SIZE;

    yintersect = this.y + (xintersect - this.x) * tan(this.angle);

    xstep = this.isFacingWest ? -TILE_SIZE : TILE_SIZE;
    ystep = TILE_SIZE * tan(this.angle);

    if (
      (this.isFacingNorth && ystep > 0) ||
      (this.isFacingSouth && ystep < 0)
    ) {
      ystep *= -1;
    }

    if (this.isFacingWest) { xintersect--; }

    while (
      xintersect >= 0 && xintersect <= width &&
      yintersect >= 0 && yintersect <= height
    ) {
      if (grid.containsWall(xintersect, yintersect)) {
        hasVerticalTarget = true;
        verticalTargetX = xintersect;
        verticalTargetY = yintersect;
        break;
      }
      xintersect += xstep;
      yintersect += ystep;
    }

    // Find distance to horizontal and vertical ray-grid intersection points
    const horizontalDist = hasHorizontalTarget
      ? dist(this.x, this.y, horizontalTargetX, horizontalTargetY)
      : Number.MAX_VALUE;

    const verticalDist = hasVerticalTarget
      ? dist(this.x, this.y, verticalTargetX, verticalTargetY)
      : Number.MAX_VALUE;

    if (horizontalDist < verticalDist) {
      this.length = horizontalDist;
      this.targetX = horizontalTargetX;
      this.targetY = horizontalTargetY;
    } else {
      this.length = verticalDist;
      this.targetX = verticalTargetX;
      this.targetY = verticalTargetY;
    }
  }

  render() {
    push();
    stroke(255, 125, 125, 100);
    line(
      this.x,
      this.y,
      this.targetX,
      this.targetY
    );
    pop();
  }
}
