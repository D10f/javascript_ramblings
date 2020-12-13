class Polygon {
  constructor({ x, y, s, r, c = color(50), options = {} }) {
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
    this.body.vertices.forEach(({ x, y }) => {
      vertex(x, y);
    });
    endShape(CLOSE);
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

  render() {
    if (this.sling.bodyB) {
      line(
        this.sling.pointA.x, this.sling.pointA.y,
        this.sling.bodyB.position.x, this.sling.bodyB.position.y
      );
    }
  }
}

class Box {
  constructor({ x, y, w, h, c = 50, options = {} }) {
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

class Ball {
  constructor({ x, y, r, c = 50, options = {} }) {
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
      //worldObject.update();  // Each body checks if its offscreen
      worldObject.render();
    });
  }
}

const { Engine, World, Bodies, Constraint, Composites, Mouse, MouseConstraint, Events, Common } = Matter;

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are queued for render here
const renderQueue = new RenderQueue();

function setup() {
  const canvas = createCanvas(600, 400);

  // create the ground
  const ground = new Box({
    x: width / 2,
    y: height,
    w: width * 2,
    h: 50,
    c: 50,
    options: { isStatic: true }
  });

  // create the ball
  let ball = new Ball({
    x: 150,
    y: height - 100,
    r: 15,
    c: 100,
    options: {
      restitution: 0.8,
      density: 0.01,
      friction: 0.2
    }
  });

  // create a new constriant object attached to the ball
  // const slingshot = new Slingshot(ball.body, { stiffness: 0.1, length: 0 });
  const poly = new Polygon({
    x: 150,
    y: height - 100,
    s: Math.floor(Common.random(5,10)),
    c: color(50, 150, 200),
    r: 15
  });

  const slingshot = new Slingshot(poly.body, { stiffness: 0.1, length: 0 });

  // create mouse object and constraint
  const mouse = Mouse.create(canvas.elt);
  const mouseconstraint = MouseConstraint.create(engine, { mouse });

  // ensure pixel accuracy in high density screens
  mouse.pixelRatio = pixelDensity();

  // action taken after releasing the sling
  Events.on(mouseconstraint, "enddrag", (e) => {
    if (e.body.id === slingshot.body.id) {
      slingshot.release();
    }
  });

  // // check sling is free and replace it with another ball
  Events.on(engine, "afterUpdate", (e) => {
    if (slingshot.sling.bodyB == null) {
      const newPoly = new Polygon({
        x: 150,
        y: height - 100,
        s: Math.floor(Common.random(5,10)),
        c: color(50, 150, 200),
        r: 15
      });
      slingshot.sling.bodyB = newPoly.body;
      slingshot.body = newPoly.body;
    }
  });

  // Setup a stack of targets
  const stack = Composites.stack(200, 200, 6, 4, 0, 0, (x ,y) => {
    const sides = Math.floor(Common.random(5,10));
    // const box = new Box({ x, y, w: 40, h: 40, c: color(210, 180, 50) });
    // return box.body;
    const poly = new Polygon({ x, y, s: sides, c: color(210, 180, 50), r: Common.random(20, 40) });
    return poly.body;
  });

  World.add(world, [mouseconstraint]);
  renderQueue.add(slingshot);
}

function draw() {
  background(130, 180, 255);

  // run the engine
  Engine.update(engine);

  renderQueue.render();
}
