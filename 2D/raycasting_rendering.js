class Camera {
  constructor(player) {
    this.player = player;
    this.projectionThickness = 3;
    this.totalRays = width / this.projectionThickness;
    this.FOV = 60 * (PI / 180);
    this.rays = [];
  }

  createView() {
    this.rays = [];

    // start first ray subtracting half of the FOV
    let rayAngle = this.player.facing - (this.FOV / 2);

    for (let i = 0; i < this.totalRays; i++) {
      const ray = new Ray(this.player.x, this.player.y, rayAngle);
      this.rays.push(ray);
      ray.cast();
      ray.render();

      // increase angle based on perception and casted rays
      rayAngle += this.FOV / this.totalRays;
    }
  }

  project() {
    this.rays.forEach((ray, idx) => {

      // Find distance to projection plane
      const projectionPlaneDistance = (width / 2) / tan(this.FOV / 2);

      // Get the corrected ray length
      const rayLength = CORRECT_FISH_EYE_EFFECT
        ? ray.length * cos(ray.angle - this.player.facing)
        : ray.length;

      // Find the height of the projection per strip
      const projectionHeight = (TILE_SIZE / rayLength) * projectionPlaneDistance;

      // Draw the projection
      // fill(
      //   225, 150, 50,
      //   ray.verticalOrigin ? 210: 180
      // );
      fill(grid.reflectedColor(
        floor(ray.targetX / TILE_SIZE),
        floor(ray.targetY / TILE_SIZE))
      );
      noStroke();
      rect(
        idx * this.projectionThickness,
        (height / 2) - (projectionHeight / 2),
        this.projectionThickness,
        projectionHeight
      );
    });
  }
}

class Grid {
  constructor() {
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 1],
      [1, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 4, 0, 1, 3, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  containsWall(x, y) {
    if (x < 0 || x > width || y < 0 || y > height) {
      return true;
    }

    // checks if passed coordinates are a wall or not
    const i = floor(x / TILE_SIZE);
    const j = floor(y / TILE_SIZE);
    return this.grid[j][i] > 0;
  }

  reflectedColor(x, y) {
    switch (this.grid[y][x]) {
      case 4:
        return color(50, 50, 255);
      case 3:
        return color(100, 200, 100);
      case 2:
        return color(225, 75, 75);
      case 1:
        return color(50);
      default:
        return color(255, 50);
    }
  }

  render() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const tileX = j * TILE_SIZE;
        const tileY = i * TILE_SIZE;
        fill(this.reflectedColor(j, i));
        rect(
          MINIMAP_SCALE_FACTOR * tileX,
          MINIMAP_SCALE_FACTOR * tileY,
          MINIMAP_SCALE_FACTOR * TILE_SIZE,
          MINIMAP_SCALE_FACTOR * TILE_SIZE
        );
      }
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 5;
    this.facing = PI / 2; // current angle the player is facing
    this.turnDirection = 0; // 1 turns right, -1 turns left
    this.walkDirection = 0; // 1 moves forward, -1 moves backward
    this.movementSpeed = 2;
    this.rotationSpeed = 3 * (PI / 180);
  }

  update() {
    this.facing += this.turnDirection * this.rotationSpeed;

    // Calculate point for the next step
    const step = this.walkDirection * this.movementSpeed;
    const nextPositionX = this.x + cos(this.facing) * step;
    const nextPositionY = this.y + sin(this.facing) * step;

    // Return immediately if next step leads to a wall
    if (grid.containsWall(nextPositionX, nextPositionY)) {
      return false;
    }

    this.x = nextPositionX;
    this.y = nextPositionY;
  }

  render() {
    push();
    noStroke();
    fill(255, 75, 50);
    ellipse(
      MINIMAP_SCALE_FACTOR * this.x,
      MINIMAP_SCALE_FACTOR * this.y,
      MINIMAP_SCALE_FACTOR * this.radius * 2,
      MINIMAP_SCALE_FACTOR * this.radius * 2
    );
    pop();
  }
}

class Ray {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = this.normalizeAngle(angle);
    this.targetX = Infinity;
    this.targetY = Infinity;
    this.length = 0;
    // this.verticalOrigin = false;

    this.facingSouth = this.angle > 0 && this.angle < PI;
    this.facingNorth = !this.facingSouth;

    this.facingEast  = this.angle < HALF_PI || this.angle > PI + HALF_PI;
    this.facingWest  = !this.facingEast;
  }

  normalizeAngle(angle) {
    let a = angle % TWO_PI;
    if (a < 0) {
      a += TWO_PI;
    }
    return a;
  }

  cast() {
    let xintersect, yintersect, xstep, ystep;

    /*** HORIZONTAL RAY-GRID INTERSECTION ***/
    let hasHorizontalTarget, horizontalTargetX, horizontalTargetY;

    yintersect = this.facingSouth
      ? floor(this.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : floor(this.y / TILE_SIZE) * TILE_SIZE;

    xintersect = this.x + (yintersect - this.y) / tan(this.angle);

    ystep = this.facingNorth ? -TILE_SIZE : TILE_SIZE;
    xstep = TILE_SIZE / tan(this.angle);

    if ((this.facingWest && xstep > 0) || (this.facingEast && xstep < 0)) {
      xstep *= -1;
    }

    while (
      xintersect >= 0 && xintersect <= width &&
      yintersect >= 0 && yintersect <= height
    ) {

      const yOffset = this.facingNorth ? yintersect - 1 : yintersect;

      if (grid.containsWall(xintersect, yOffset)) {
        hasHorizontalTarget = true;
        horizontalTargetX = xintersect;
        horizontalTargetY = yOffset;
        break;
      }

      xintersect += xstep;
      yintersect += ystep;
    }

    /*** VERTICAL RAY-GRID INTERSECTION ***/
    let hasVerticalTarget, verticalTargetX, verticalTargetY;

    xintersect = this.facingEast
      ? floor(this.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : floor(this.x / TILE_SIZE) * TILE_SIZE;

    yintersect = this.y + (xintersect - this.x) * tan(this.angle);

    xstep = this.facingWest ? -TILE_SIZE : TILE_SIZE;
    ystep = TILE_SIZE * tan(this.angle);

    if ((this.facingNorth && ystep > 0) || (this.facingSouth && ystep < 0)) {
      ystep *= -1;
    }

    while (
      xintersect >= 0 && xintersect <= width &&
      yintersect >= 0 && yintersect <= height
    ) {

      const xOffset = this.facingWest ? xintersect - 1 : xintersect;

      if (grid.containsWall(xOffset, yintersect)) {
        hasVerticalTarget = true;
        verticalTargetX = xOffset;
        verticalTargetY = yintersect;
        break;
      }

      xintersect += xstep;
      yintersect += ystep;
    }

    // Find distance to horizontal and vertical ray-grid intersection points
    const horizontalDist = hasHorizontalTarget
      ? dist(this.x, this.y, horizontalTargetX, horizontalTargetY)
      : Infinity;

    const verticalDist = hasVerticalTarget
      ? dist(this.x, this.y, verticalTargetX, verticalTargetY)
      : Infinity;

    if (horizontalDist < verticalDist) {
      this.length = horizontalDist;
      this.targetX = horizontalTargetX;
      this.targetY = horizontalTargetY;
    } else {
      this.length = verticalDist;
      this.targetX = verticalTargetX;
      this.targetY = verticalTargetY;
      this.verticalOrigin = true;
    }
  }

  render() {
    push();
    stroke(255, 125, 125, 100);
    line(
      MINIMAP_SCALE_FACTOR * this.x,
      MINIMAP_SCALE_FACTOR * this.y,
      MINIMAP_SCALE_FACTOR * this.targetX,
      MINIMAP_SCALE_FACTOR * this.targetY
    );
    pop();
  }
}

const COLS = 15;
const ROWS = 11;
const TILE_SIZE = 32;

const CANVAS_WIDTH = COLS * TILE_SIZE;
const CANVAS_HEIGHT = ROWS * TILE_SIZE;

const MINIMAP_PREVIEW = true;
const MINIMAP_SCALE_FACTOR = MINIMAP_PREVIEW ? 0.25 : 1;
const CORRECT_FISH_EYE_EFFECT = true;

let player, grid, cam;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  stroke(50);

  grid = new Grid();
  player = new Player();
  cam = new Camera(player);
}

function draw() {
  background(220);
  cam.project();
  cam.createView();
  // cam.rays.forEach(r => r.render());

  player.update();
  player.render();

  grid.render();

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
