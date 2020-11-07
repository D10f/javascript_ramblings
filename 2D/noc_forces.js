class Ball {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(m) * 10; // 10 here is arbitrary
  }

  // The larger the object, the less a force affects it
  applyForce(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  applyGravity(force){
    this.acc.add(force);
  }

  applyFriction(){
    // Get vector of opposite direction of magnitude 1.
    let friction = this.vel.copy();
    friction.normalize();
    friction.mult(-1);

    // Arbitrary constant set to be the mass of the object.
    const normal = this.mass;

    // Calculate the magnitude of the friction vector.
    friction.setMag(mu * normal);

    this.applyForce(friction);
  }

  applyDragForce(){
    // Get vector of opposite direction of magnitude 1.
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);

    // Calculate the magnitude of the drag vector.
    const speedSq = this.vel.magSq();
    drag.setMag(dragConstant * speedSq);

    this.applyForce(drag);
  }

  edgeDetection() {
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }

    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.edgeDetection();
    this.acc.set(0, 0);
  }

  show() {
    fill(225);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

// Friction and drag constants
const mu = 0.02;
const dragConstant = 0.1;

// Init objects and forces
const objects = [];
let gravity, wind;

function setup() {
  createCanvas(450, 450);

  objects.push(
    new Ball(50, 100, 2),
    new Ball(125, 100, 4),
    new Ball(200, 100, 6),
    new Ball(275, 100, 8),
    new Ball(350, 100, 10)
  );

  gravity = createVector(0, 0.5);
  wind = createVector(0.1, 0);
}

function draw() {
  background(220);

  // Body of water which applies drag force
  fill(200, 200, 255);
  rect(0, height / 2, width, height);

  for (const ball of objects) {
    if (mouseIsPressed) {
      // Yes, underwater-wind force all right?
      ball.applyForce(wind);
    }

    // Object enters the water
    if (ball.pos.y >= height / 2) {
      ball.applyDragForce();
    }

    ball.applyGravity(gravity);
    ball.applyFriction();
    ball.update();
    ball.show();
  }
}
