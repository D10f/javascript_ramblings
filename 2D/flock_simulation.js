/*
 * "Boid is New York speak for bird"
 * - Wild Animal Channel (/channel/UChH1Vqf3zHNGLelFtZvJGTg)
 **/

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.size = 10;
    this.sight = 75;
    this.speed = 2;
    this.attraction = 0.025;
  }

  static areFlockMates(boid1, boid2) {
    return boid1.pos.dist(boid2.pos) < boid2.sight;
  }

  align(flock) {
    let flockMates = flock.filter(boid => {
      return Object.is(boid, this) ? false : Boid.areFlockMates(boid, this);
    });

    if (!flockMates.length) {
      return;
    }

    const flockDirection = createVector();
    const flockCenterPos = createVector();
    const boidSeparation = createVector();

    flockMates.forEach(boid => {
      flockDirection.add(boid.vel);
      flockCenterPos.add(boid.pos);

      let distance = p5.Vector.sub(this.pos, boid.pos);
      distance.div(distance.magSq());
      boidSeparation.add(distance);
    });


    // Average forces and flock position
    flockDirection.div(flockMates.length);
    flockCenterPos.div(flockMates.length);
    flockCenterPos.sub(this.pos);
    boidSeparation.div(flockMates.length);

    // Get direction (by setting vel to a default);
    flockDirection.setMag(this.speed);
    boidSeparation.setMag(this.speed);

    // Apply direction to current boid
    flockDirection.sub(this.vel);
    flockCenterPos.sub(this.vel);
    boidSeparation.sub(this.vel);

    // Limit attraction
    flockDirection.limit(this.attraction);
    flockCenterPos.limit(this.attraction);
    boidSeparation.limit(this.attraction);

    this.acc.add(flockDirection);
    this.acc.add(flockCenterPos);
    this.acc.add(boidSeparation);
  }

  edgeDetection() {
    if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    } else if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
    }

    if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
    } else if (this.pos.y > height + this.size) {
      this.pos.y = -this.size;
    }
  }

  update() {
    this.edgeDetection();
    this.vel.add(this.acc);
    this.vel.limit(this.speed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    fill(200, 50, 50);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

const ATTRACTION_FORCE = 4;
const FLOCK_SIZE = 100;
let flock = [];

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < FLOCK_SIZE; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);
  flock.forEach((boid, current) => {
    boid.align(flock, current);
    boid.update();
    boid.show();
  });
}
