class Shrapnel {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1,3));
    this.acc = createVector();
    this.ttl = 255;
    this.col = c;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.applyForce(gravity);
    this.vel.add(this.acc);
    this.vel.limit(2.5);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.ttl -= 7;
    this.col.setAlpha(this.ttl);
  }

  show() {
    // strokeWeight(5);
    stroke(this.col);
    point(this.pos.x, this.pos.y);
  }
}

class Firework {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, random(-10, -7));
    this.acc = createVector();
    this.done = false;
    this.shrapnel = [];
    this.color = color(
      random(50, 200),
      random(30, 200),
      random(50, 200)
    );
  }

  applyForce(force) {
    this.acc.add(force);
  }

  explode() {
    for (let i = 0; i < 30; i++) {
      this.shrapnel.push(
        new Shrapnel(this.pos.x, this.pos.y, this.color)
      );
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.shrapnel.length === 0 && this.vel.y > 0) {
      this.explode();
    }

    if (this.pos.y > height) {
      this.shrapnel = [];
      this.done = true;
    }
  }

  show() {
    if (this.shrapnel.length === 0) {
      stroke(this.color);
      point(this.pos.x, this.pos.y);
    } else {
      this.shrapnel.forEach(s => {
        s.update();
        s.show();
      });
    }
  }
}

let fireworks = [];
let gravity;

function setup() {
  createCanvas(800, 400);
  strokeWeight(4);
  gravity = createVector(0, 0.12);
}

function mousePressed() {
  console.log(fireworks.length)
}

function draw() {
  background(0, 40);

  fireworks = fireworks.reduce((acc, f) => {
    f.applyForce(gravity);
    f.update();
    f.show();
    return f.done ? acc : [...acc, f];
  }, []);

  if (random(1) < 0.1) {
    fireworks.push(new Firework(random(width), height));
  }
}
