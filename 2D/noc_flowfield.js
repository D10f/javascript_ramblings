class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 3;
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

  edgeDetection() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
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
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
  }
}

const NOISE_OFFSET = 0.03;
const GRID_SIZE = 20;
const MAX_PARTICLES = 500;

let cols,
    rows,
    xoff,
    yoff,
    zoff,
    particles,
    flowField;

function setup() {
  createCanvas(400, 400);

  cols = width / GRID_SIZE;
  rows = height / GRID_SIZE;

  flowField = [];
  particles = [];

  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles[i] = new Particle();
  }

  zoff = 0;
}

function draw() {
  background(220);

  yoff = 0;
  for (let x = 0; x < cols; x++) {
    xoff = 0;
    for (let y = 0; y < rows; y++) {
      const index = x + y * cols;
      const r = noise(xoff, yoff, zoff) * TWO_PI;
      const v = p5.Vector.fromAngle(r);

      flowField[index] = v;

      // push();
      // translate(x * GRID_SIZE, y * GRID_SIZE);
      // rotate(v.heading());
      // stroke(170, 50);
      // line(0, 0, GRID_SIZE, 0);
      // pop();

      xoff += NOISE_OFFSET;
    }
    yoff += NOISE_OFFSET;
  }
  zoff += 0.01;

  particles.forEach(particle => {
    particle.follow(flowField);
    particle.update();
    particle.show();
  });
}
