// module aliases
let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();

const cols = 10;
const rows = 5;
let plinkos = [];
let particles = [];
let buckets = [];
let ground;

function setup() {
  createCanvas(600, 400);
  createPlinkos();
  createBoundaries();
}

function draw() {
  background(220);

  Engine.update(engine, 24);

  plinkos.forEach(p => p.render());
  buckets.forEach(b => b.render());
  ground.render();

  createParticle();

  particles = particles.filter(p => {
    p.render();
    return p.isOffScreen() ? false : true;
  });
}

function createPlinkos() {
  let offset = false;
  let gap = 57;

  // Creates the grid of "plinkos"
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = offset ?
        (i * gap + 30) + 30 :
        (i * gap + 30);
      const y = j * gap + 50;
      plinkos.push(new Plinko(x, y, 10, {
        color: color(150, 50, 255),
        props: {
          restitution: 0.5
        }
      }));
    }
    offset = !offset;
  }
}

function createBoundaries() {
  // Creates the ground
  ground = new Box(width / 2, height + 25, width, 50, color(50), {
    isStatic: true
  });

  // Creates the buckets
  for (let i = 0; i <= 10; i++) {
    const bucket = new Box(i * width / 10, height, 10, 100, color(50), {
      isStatic: true
    });

    buckets.push(bucket);
  }
}

function createParticle() {
  if (frameCount % 35 === 0) {
    const particle = new Particle(width / 2 + 15, 0, 9, {
      color: color(200, 60, 220),
      props: {
        restitution: 0.5,
        frictio: 0.85
      }
    });
    particles.push(particle);
  }
}

class Plinko extends Particle {
  constructor(x, y, r, options) {
    super(x, y, r, {
      color: color(80, 180, 80),
      props: {
        isStatic: true
      }
    });
  }
}

class Particle {
  constructor(x, y, r, options = {}) {
    this.body = Bodies.circle(x, y, r, {
      ...options.props
    });
    this.r = r;
    this.c = options.color;

    // introduce a small random offset
    this.body.position.x += random(-1, 1);

    World.add(engine.world, this.body);
  }

  isOffScreen() {
    const {
      x,
      y
    } = this.body.position;

    if (x < 0 - this.r || x > width + this.r || y > height + this.r) {
      World.remove(engine.world, this.body);
      return true;
    }
  }

  render() {
    push();
    fill(this.c);
    translate(this.body.position.x, this.body.position.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

class Box {
  constructor(x, y, w, h, c = color(50), options = {}) {
    this.body = Bodies.rectangle(x, y, w, h, {
      ...options
    });
    this.w = w;
    this.h = h;
    this.c = c;

    World.add(engine.world, this.body);
  }

  render() {
    push();
    rectMode(CENTER);
    fill(this.c);
    rect(this.body.position.x, this.body.position.y, this.w, this.h);
    pop();
  }
}
