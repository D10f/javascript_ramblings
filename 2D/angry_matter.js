class Polygon {
  constructor({ x, y, s, r, c = random(bodyColors), options = {} }) {
    this.body = Bodies.polygon(x, y, s, r, options);
    this.radius = r;
    this.color = c;
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.radius || x > width + this.radius || y > height + this.radius) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  render() {
    push();
    fill(this.color);
    beginShape();
    this.body.vertices.forEach(({ x, y }) => vertex(x, y));
    endShape(CLOSE);
    pop();
  }
}

class Ball {
  constructor({ x, y, r, c = random(bodyColors), options = {} }) {
    this.body = Bodies.circle(x, y, r, options);
    this.radius = r;
    this.color = c;
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.radius || x > width + this.radius || y > height + this.radius) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  // Checks if a point (i, j) exists within the body
  contains(i, j) {
    const { x, y } = this.body.position;
    return (
      i > x - this.radius && i < x + this.radius &&
      j > y - this.radius && j < y + this.radius
    );
  }

  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    fill(this.color);
    ellipse(0, 0, this.radius * 2);
    pop();
  }
}

class Box {
  constructor({ x, y, w, h, c = random(bodyColors), options = {} }) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.width = w;
    this.height = h;
    this.color = c;
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.width || x > width + this.width ||
      y < 0 - this.height || y > height + this.height) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}

class Slingshot {
  constructor(body, options = {}) {
    this.sling = Constraint.create({
      pointA: { x: body.position.x, y: body.position.y },
      bodyB: body,
      ...options
    });

    this.body = body;
    World.add(world, this.sling);
  }

  release() {
    setTimeout(() => {
      this.sling.bodyB = null;
    }, 0);
  }

  update() {
    if (this.sling.bodyB == null) {
      const newPoly = new Polygon({
        x: 150,
        y: height * 0.66,
        s: Math.floor(Common.random(5,10)),
        r: 15,
        options: { density: 0.01 }
      });
      this.sling.bodyB = newPoly.body;
      this.body = newPoly.body;
    }
  }

  render() {
    if (this.sling.bodyB) {
      line(
        this.sling.pointA.x, this.sling.pointA.y,
        this.sling.bodyB.position.x, this.sling.bodyB.position.y
      );
    }
  }
}

class RenderQueue {
  constructor() {
    this.queue = []; // Contains an array of wrappers for matter.js bodies
  }

  add(worldObject) {
    this.queue.push(worldObject);
  }

  remove(id) {
    this.queue.filter(worldObject => worldObject.body.id !== id);
  }

  render() {
    this.queue.forEach(worldObject => {
      worldObject.render();
      worldObject.update();
    });
  }
}


const { Engine, World, Bodies, Constraint, Composites, Mouse, MouseConstraint, Events, Common } = Matter;

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are queued for render here
const renderQueue = new RenderQueue();

let bodyColors = [];

function setup() {
  const canvas = createCanvas(800, 460);

  // Define colors to be picked at random when creating a new body
  bodyColors.push(
    color('#c7f464'),
    color('#4ecdc4'),
    color('#b64751'),
    color('#006ba6'),
    color('#ffbc42'),
    color('#d81159'),
    color('#8f2d56'),
    color('#0496ff'),
    color('#006ba6'),
    color('#76f09b')
  );

  // create the ground
  const ground = new Box({
    x: width / 2,
    y: height,
    w: width * 2,
    h: 50,
    c: 50,
    options: { isStatic: true }
  });

  // create initial slingshot projectile
  const poly = new Polygon({
    x: 150,
    y: height * 0.66,
    s: Math.floor(Common.random(5,10)),
    c: color(50, 150, 200),
    r: 15,
    options: {
      restitution: 0.8,
      density: 0.01,
      friction: 0.2
    }
  });

  const slingshot = new Slingshot(poly.body, { stiffness: 0.1, length: 0 });

  /*
   * pixelDensity is a p5.js method that returns the density of the pixels
   * which depends on the physical screen. By adjusting the pixelRatio matter.js
   * knows where a body is clicked on accurately regardless of the screen.
  **/
  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();

  const mouseconstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2
    }
  });

  // action taken after releasing the sling
  Events.on(mouseconstraint, "enddrag", (e) => {
    if (e.body.id === slingshot.body.id) {
      slingshot.release();
    }
  });

  // Setup a stack of targets
  const sides = 8;
  const size = Common.random(20, 30);
  const cols = Common.random(3, 5);
  const rows = Common.random(4, 6);
  const stack = Composites.stack(width / 2, height - 200, cols, rows, 0, 0, (x ,y) => {
    const poly = new Polygon({ x, y, s: sides, r: size, options: { friction: 1 } });
    return poly.body;
  });

  // randmoly create a floating platform with some targets on top
  if (random(1) > 0.75) {
    const rwidth = width * 0.75;
    const rheight = height * 0.45;

    const platform = new Box({
      x: rwidth,
      y: rheight,
      w: 300,
      h: 10,
      c: 50,
      options: { isStatic: true }
    });

    const sides = random([8,12]);
    const pyramid = Composites.pyramid(rwidth - 120, rheight - 130, 5, 4, 0, 0, (x, y) => {
      const poly = new Polygon({ x, y, s: sides, r: 25});
      return poly.body;
    });
  }

  World.add(world, [mouseconstraint]);
  renderQueue.add(slingshot);
}

function draw() {
  background(240);

  // run the engine
  Engine.update(engine);

  renderQueue.render();
}
