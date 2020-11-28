class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.target = createVector(x, y); // original position
    this.targetDistance = 0; // distance from target
    this.cursorAllergy = 35; // distance from cursor to move away from it
    this.maxSpeed = 10;
    this.steeringForce = 0.5;
  }

  calculateSpeed() {
    this.targetDistance = p5.Vector.dist(this.target, this.pos);
    return map(this.targetDistance, 0, 200, 0, this.maxSpeed);
  }

  approachTarget() {
    const targetDirection = p5.Vector.sub(this.target, this.pos);
    targetDirection.setMag(this.calculateSpeed());

    const steer = p5.Vector.sub(targetDirection, this.vel);
    steer.limit(this.steeringForce);

    this.applyForce(steer);
  }

  avoidCursor() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.cursorAllergy) {
      const force = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);
      let distanceSq = force.magSq();
      distanceSq = constrain(distanceSq, 1, 5);
      force.mult(-1);
      force.setMag(distanceSq);
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.avoidCursor();
    this.approachTarget();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(150, 200, 50);
    point(this.pos.x, this.pos.y);
  }
}

let font;
let particles = [];
const TEXT = 'Brazil';

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 400);
  strokeWeight(4);
  stroke(255);

  font
    .textToPoints(TEXT, 60, 245, 196, { sampleFactor: 0.18 })
    .forEach(p => particles.push(new Particle(p.x, p.y)));
}

function draw() {
  background(40, 65, 55);
  particles.forEach(p => {
    p.update();
    p.show();
  });
}
