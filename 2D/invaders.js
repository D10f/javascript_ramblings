class Invader {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 24;
    this.hit = false;
    this.step = this.frames();
  }

  isHit() {
    this.hit = true;
  }

  eliminated() {
    return this.hit;
  }

  move(step) {
    this.pos.add(step.value);
  }

  * frames() {
    while (true) {
      yield createVector(0, Y_MARGIN);   // DOWN
      yield createVector(-X_MARGIN, 0);  // LEFT
      yield createVector(0, Y_MARGIN);   // DOWN
      yield createVector(X_MARGIN, 0);   // RIGHT
      yield createVector(X_MARGIN, 0);   // RIGHT
      yield createVector(0, Y_MARGIN);   // DOWN
      yield createVector(-X_MARGIN, 0);  // LEFT
    }
  }

  update() {
    // movement on specific frames
    if (frameCount % DIFFICULTY === 0) {
      this.move(this.step.next());
    }

    if (this.pos.y > height + this.size) {
      gameOver();
    }
  }

  show() {
    image(invaderImg, this.pos.x, this.pos.y);
  }
}

class Ship {
  constructor() {
    this.pos = createVector(width / 2, height - Y_MARGIN);
    this.size = 32;
    this.lasers = [];
  }

  fire() {
    this.lasers.push(new Laser(this.pos.x, this.pos.y));
  }

  laserMovement() {
    this.lasers = this.lasers.filter(laser => {
      if (laser.isOffScreen()) {
        return false;
      }
      laser.update();
      laser.show();
      return laser.collision() ? false : true;
    });
  }

  collision() {
    return invaders.some(invader => {
      return this.pos.dist(invader.pos) < this.size;
    });
  }

  move(d) {
    this.pos.x += d;
    this.pos.x = constrain(
      this.pos.x,
      this.size / 2,
      width - (this.size / 2)
    );
  }

  update() {
    this.laserMovement();

    // check collision with invaders
    if (this.collision()) {
      gameOver();
    }
  }

  show() {
    image(shipImg, this.pos.x, this.pos.y);
  }
}

class Laser {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2);
  }

  isOffScreen() {
    return this.pos.y < 0;
  }

  update() {
    this.pos.add(this.vel);
  }

  collision() {
    const hit = invaders.some(invader => {
      if (invader.pos.dist(this.pos) < invader.size) {
        invader.isHit();
        return true;
      }
    });

    return hit;
  }

  show() {
    strokeWeight(2);
    stroke(255, 120, 120);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 20);
  }
}

// draw constants
const X_MARGIN = 48;
const Y_MARGIN = 48;
const GAP = 64;
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;
const MAX_BG_STARS = 250;

// game constants
const TOTAL_INVADERS = 20;
const DIFFICULTY = 180; // lower is more difficult

let ship;
let stars;
let invaders = [];
let laserThrottle = false;

function preload() {
  invaderImg = loadImage('assets/invader.png');
  shipImg = loadImage('assets/ship.png');
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CENTER);

  stars = new Array(MAX_BG_STARS).fill().map(() => {
    return createVector(random(width), random(height));
  });

  ship = new Ship();

  // create invaders at initial position
  let cols = 0;
  let rows = 1;
  for (let i = 0; i < TOTAL_INVADERS; i++) {

    const wrap = cols * GAP + X_MARGIN > width - X_MARGIN ? true : false;
    if (wrap) {
      cols = 0;
      rows++;
    }

    const x = cols * GAP + X_MARGIN;
    const y = Y_MARGIN * rows;
    cols++;

    invaders.push(new Invader(x, y));
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);

  stars.forEach(star => point(star.x, star.y));

  checkControls();
  checkWinCondition();

  invaders = invaders.filter(invader => {
    invader.update();
    invader.show();
    return invader.eliminated() ? false : true;
  });

  ship.update();
  ship.show();
}

function checkControls() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.move(-3);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.move(3);
  }
  if (keyIsDown(32)) {
    if (!laserThrottle) {
      ship.fire();
      laserThrottle = true;
      setTimeout(() => laserThrottle = false, 150);
    }
  }
}

function gameOver() {
  textSize(30);
  textAlign(CENTER);
  fill(255);
  text("YOU LOST!", width / 2, height / 2);
  noLoop();
}

function checkWinCondition() {
  if (invaders.length === 0) {
    textSize(30);
    textAlign(CENTER);
    fill(255);
    text("YOU WON!", width / 2, height / 2);
    noLoop();
  }
}
