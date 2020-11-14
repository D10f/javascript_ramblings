class Laser {
  constructor(start, direction) {
    this.pos = createVector(start.x, start.y);
    this.vel = createVector(direction.x, direction.y);
  }

  update() {
    this.pos.add(this.vel);
  }

  collision() {
    // poor man's collision detection (assumes ellipse for all asteroids)
    const hit = asteroids.some(a => {
      if (a.pos.dist(this.pos) < a.size * 1.8) {
        a.explode();
        return true;
      }
    });
    return hit;
  }

  isOffScreen() {
    return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
  }

  render() {
    push();
    strokeWeight(5);
    stroke(255);
    point(this.pos.x, this.pos.y);
    pop();
  }
}

class Spaceship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.acc = createVector();
    this.vel = createVector();
    this.size = 10;
    this.steering = 0;
    this.lasers = [];
    this.destroyed = false;
  }

  turn(angle) {
    this.steering += angle;
  }

  thrust(force) {
    let f = p5.Vector.fromAngle(this.steering - PI / 2);
    f.mult(force);
    this.acc.add(f);
  }

  fire() {
    let dir = p5.Vector.fromAngle(this.steering - PI / 2);
    dir.mult(4);
    this.lasers.push(new Laser(this.pos, dir));
  }

  laserMovement() {
    this.lasers = this.lasers.filter( laser => {
      if (laser.isOffScreen()) {
        return false;
      }
      laser.update();
      laser.render();
      return laser.collision() ? false : true;
    });
  }

  edgeDetection() {
    if (this.pos.x < 0 - this.size) {
      this.pos.x = width + this.size;
    } else if (this.pos.x > width + this.size) {
      this.pos.x = 0 - this.size;
    }

    if (this.pos.y < 0 - this.size) {
      this.pos.y = height + this.size;
    } else if (this.pos.y > height + this.size) {
      this.pos.y = 0 - this.size;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.98); // a little friction... in space
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edgeDetection();
    if (this.lasers.length > 0) {
      this.laserMovement();
    }
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.steering);
    triangle(
      0 - this.size, 0 + this.size,
      0, 0 - this.size,
      0 + this.size, 0 + this.size
    );
    pop();
  }
}

class Asteroid {
  constructor(x = random(width), y = random(height), size = random(10, 30)) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.5);
    this.size = size;
    this.vertices = new Array(25).fill().map(() => this.size + random(6, 15));
    this.destroyed = false;
  }

  shipCollision() {
    if (this.pos.dist(ship.pos) < this.size * 1.8) {
      ship.destroyed = true;
    }
  }

  edgeDetection() {
    if (this.pos.x < 0 - this.size) {
      this.pos.x = width + this.size;
    } else if (this.pos.x > width + this.size) {
      this.pos.x = 0 - this.size;
    }

    if (this.pos.y < 0 - this.size) {
      this.pos.y = height + this.size;
    } else if (this.pos.y > height + this.size) {
      this.pos.y = 0 - this.size;
    }
  }

  explode() {
    this.destroyed = true;
    if (this.size < 6) return;
    asteroids.push(new Asteroid(this.pos.x, this.pos.y, floor(this.size / 2)));
    asteroids.push(new Asteroid(this.pos.x, this.pos.y, floor(this.size / 2)));
  }

  update() {
    this.pos.add(this.vel);
    this.edgeDetection();
    this.shipCollision();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let i = 0; i < this.size; i++) {
      // different angle that adds up to 360
      const a = map(i, 0, this.size, 0, TWO_PI);
      // draw vertices at different lengths
      const x = this.vertices[i] * cos(a);
      const y = this.vertices[i] * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

const INITIAL_ASTEROIDS = 5 ;
let laserThrottle = false;
let ship;
let asteroids = [];

function setup() {
  createCanvas(400, 400);
  noFill();
  ship = new Spaceship();
  for (let i = 0; i < INITIAL_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  stroke(255);
  checkWinCondition();
  checkControls();
  ship.update();
  ship.render();
  asteroids = asteroids.filter(a => {
    a.update();
    a.show();
    return a.destroyed ? false : true;
  });
}

function checkControls() {
  if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(0.05);
  }
  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-0.05);
  }
  if (keyIsDown(UP_ARROW)) {
    ship.thrust(0.1);
  }
  if (keyIsDown(DOWN_ARROW)) {
    ship.thrust(-0.1);
  }
  if (keyIsDown(32)) {
    if (!laserThrottle) {
      ship.fire();
      laserThrottle = true;
      setTimeout(() => laserThrottle = false, 100);
    }
  }
}

function checkWinCondition() {
  if (asteroids.length === 0 || ship.destroyed) {
    noLoop();
  }
}
