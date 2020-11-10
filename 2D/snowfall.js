class Particle {
  constructor() {
    const x = random(width);
    const y = random(-height, height / 4);
    this.pos = createVector(x, y);
    this.acc = createVector();
    this.vel = createVector();
    this.mass = abs(randomGaussian(0, 4) * 10);
    this.size = constrain(sqrt(this.mass), 2, 20);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyWind(force) {
    let f = p5.Vector.div(force, this.mass * 0.1);
    this.acc.add(f);
  }

  edgeDetection() {
    if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
    } else if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    }

    if (this.pos.y > height + this.size) {
      this.pos.y = random(-100, -50);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.size * 0.15);
    this.pos.add(this.vel);
    this.edgeDetection();
    this.acc.mult(0);
  }

  show() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

const PARTICLES = 300;
let snow, gravity, wind, windOffset, angle;

function setup() {
  createCanvas(400, 400);

  gravity = createVector(0, 1);
  windOffset = 0;

  snow = [];
  for (let i = 0; i < PARTICLES; i++) {
    snow[i] = new Particle();
  }

}

function draw() {
  background(0);
  noStroke();
  fill(255);

  let x, y, z, f;
  windOffset += 0.005;

  for (const flake of snow) {
    x = flake.pos.x / width;
    y = flake.pos.y / height;
    f = noise(x, y, windOffset) * TWO_PI;
    wind = p5.Vector.fromAngle(f);
    wind.mult(0.2);
    flake.applyForce(wind);
    flake.applyForce(gravity);
    flake.update();
    flake.show();
  }
}
