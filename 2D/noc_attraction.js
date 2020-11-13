class Particle {
  constructor(x, y) {
    this.pos   = createVector(x, y);
    this.pre   = createVector(x, y);
    this.vel   = createVector();
    this.acc   = createVector();
    this.r     = 10;
    this.color = color(0, 0, 255);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    strokeWeight(1);
    stroke(255);
    line(this.pos.x, this.pos.y, this.pre.x, this.pre.y);
    this.pre.x = this.pos.x;
    this.pre.y = this.pos.y;
  }
}

class Attractor extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vel = createVector();
    this.color = color(0, 200, 0);
  }

  attract(particles) {
    particles.forEach(p => {
      const force = p5.Vector.sub(this.pos, p.pos);
      let disSq = force.magSq();
      disSq = constrain(disSq, 1, 500);
      const strength = gravityForce / disSq;
      force.setMag(strength);

      if (dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y) < 50) {
        force.mult(-1);
      }

      p.applyForce(force);
    });
  }

  show() {
    strokeWeight(4);
    stroke(this.color);
    point(this.pos.x, this.pos.y);
  }
}

const particles = [];
const attractors = [];
const gravityForce = 8;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(100, 50);
  attractors.forEach(a => {
    a.update();
    a.show();
    a.attract(particles);
  });

  particles.forEach(p => {
    p.update();
    p.show();
  });
}

function mousePressed() {
  attractors.push(new Attractor(mouseX, mouseY));
}
