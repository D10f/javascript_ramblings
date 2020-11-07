class Snowflake {
  constructor(m = random(5, 25)) {
    this.pos = createVector();
    this.acc = createVector();
    this.mass = m;
    this.r = sqrt(this.mass);
    this.reset();
  }

  reset() {
    this.pos.x = random(-50, width + 50);
    this.pos.y = random(-50, 5);
    this.vel = p5.Vector.random2D();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyDragForce(){
    // apply drag only for wind, not gravity
    let drag = createVector(this.vel.x, 0);
    drag.normalize();
    drag.mult(-1);

    // but based on the object's velocity
    const speedSq = this.vel.magSq();

    drag.setMag(windDragForce * speedSq);
    this.applyForce(drag);
  }

  // once flakes move out of canvas re-set it's position
  edgeDetection() {
    if (this.pos.y >= height + this.r){
      this.reset();
    }
    if (this.pos.x >= width + this.r){
      this.pos.x = -this.r;
    } else if (this.pos.x <= -this.r) {
      this.pos.x = width + this.r;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.edgeDetection();
    this.acc.set(0, 0);
  }

  show() {
    fill(200);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

const particles = 500;
const windDragForce = 0.01;
const snowflakes = [];
let gravity, wind;

function setup() {
  createCanvas(400, 400);
  noStroke();

  gravity = createVector(0, 0.005);
  wind = createVector(random(-0.1, 0.1), 0);

  for (let i = 0; i < particles; i++) {
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background(0);

  for (const flake of snowflakes) {
    if (mouseIsPressed){
      flake.applyForce(wind);
      flake.applyDragForce();
    }
    flake.applyForce(gravity);
    flake.update();
    flake.show();
  }
}
