class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.prev = this.pos.copy();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    const x = floor(this.pos.x / GRID_SIZE);
    const y = floor(this.pos.y / GRID_SIZE);
    const index = x + y * cols;
    this.applyForce(vectors[index]);
  }

  updatePrevious() {
    this.prev = this.pos.copy();
  }

  edgeDetection() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrevious()
    } else if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrevious()
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrevious()
    } else if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrevious()
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.edgeDetection();
    this.acc.set(0, 0);
  }

  show() {
    strokeWeight(1);
    stroke(175, 255, 235, 7);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }
}

const NOISE_OFFSET = 0.07;
const GRID_SIZE = 10;
const MAX_PARTICLES = 200;
const SHOW_FIELD = false;

let cols, rows, xoff, yoff, zoff, particles, flowField;
function mousePressed(){
  noLoop();
}
function setup() {
  // frameRate(30);
  createCanvas(800, 400);

  cols = width / GRID_SIZE;
  rows = height / GRID_SIZE;

  flowField = [];
  particles = [];

  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles[i] = new Particle();
  }

  zoff = 0;
  // background(0);
}

function draw() {
  background(225, 0);

  yoff = 0;
  for (let x = 0; x < cols; x++) {
    xoff = 0;
    for (let y = 0; y < rows; y++) {
      const index = x + y * cols;
      const r = noise(xoff, yoff, zoff) * TWO_PI * 2;
      const v = p5.Vector.fromAngle(r);

      flowField[index] = v;

      if (SHOW_FIELD) {
        push();
        translate(x * GRID_SIZE, y * GRID_SIZE);
        rotate(v.heading());
        stroke(210);
        line(0, 0, GRID_SIZE, 0);
        pop();
      }

      xoff += NOISE_OFFSET;
    }
    yoff += NOISE_OFFSET;
  }
  zoff += 0.008;

  particles.forEach(particle => {
    particle.follow(flowField);
    particle.update();
    particle.show();
    particle.updatePrevious();
  });
}
