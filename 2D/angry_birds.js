// Matter.js module aliases
const {
  Engine,
  Render,
  World,
  Bodies,
  Constraint,
  Mouse,
  MouseConstraint,
  Events
} = Matter;

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are stored here
const bodies = [];

// game graphics from: https://pokemondb.net/
let pokeball, bulbasaur, charmander, squirtle;

const pokeImgs = [];
let slingshot;

function preload() {
  pokeball = loadImage('assets/pokeball.png');
  bulbasaur = loadImage('assets/bulbasaur.png');
  charmander = loadImage('assets/charmander.png');
  squirtle = loadImage('assets/squirtle.png');
  pokeImgs.push(charmander, bulbasaur, squirtle);
}

function setup() {
  const canvas = createCanvas(600, 400);

  // create the ground
  const ground = new Box({
    x: width / 2,
    y: height,
    w: width * 2,
    h: 50,
    c: 50,
    options: {
      isStatic: true,
      friction: 0.9,
      restitution: 0.75
    }
  });

  // create the ball
  const ball = new Ball({
    x: 150,
    y: height - 100,
    r: 15,
    c: 100,
    options: {
      restitution: 0.5,
      density: 1,
      friction: 0.5
    }
  });

  // create mouse object and constraint
  const mouse = Mouse.create(canvas.elt);
  const mouseconstraint = MouseConstraint.create(engine, {
    mouse
  });

  // ensure pixel accuracy in high density screens
  mouse.pixelRatio = pixelDensity();

  // create a new constriant object attached to the ball
  slingshot = new Slingshot(ball.body);

  // action taken after releasing the sling
  Events.on(mouseconstraint, "enddrag", e => {
    if (e.body.id === ball.body.id) {
      slingshot.release();
    }
  });

  // create targets
  for (let i = 0; i < 3; i++) {
    const target = new Box({
      x: 450,
      y: height - 150 + i * 50,
      w: 40,
      h: 40,
      c: 100,
      options: {
        density: 2,
        restitution: 0.25,
        friction: 0.9,
        graphic: pokeImgs[i]
      }
    });
    bodies.push(target);
  }

  World.add(world, mouseconstraint);
  bodies.push(ground, slingshot, ball);
}

function draw() {
  background(130, 180, 255);

  // run the engine
  Engine.update(engine);

  bodies.forEach(b => {
    b.render();
  });
}

function keyPressed() {
  if (keyCode === 32) {
    slingshot.reset();
  }
}

class Slingshot {
  constructor(body) {
    this.sling = Constraint.create({
      pointA: {
        x: body.position.x,
        y: body.position.y
      },
      bodyB: body,
      stiffness: 0.1,
      length: 0
    });

    this.body = body;
    World.add(world, this.sling);
  }

  release() {
    setTimeout(() => this.sling.bodyB = null, 0);
  }

  reset() {
    this.sling.bodyB = this.body;
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
  constructor({
    x,
    y,
    w,
    h,
    c = 50,
    options = {}
  }) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.c = c;
    this.graphic = options.graphic || null;
    World.add(world, this.body);
  }

  isOffScreen() {
    const {
      x,
      y
    } = this.body.position;

    if (
      x < 0 - this.w || x > width + this.w ||
      y < 0 - this.h || y > height + this.h
    ) {
      World.remove(world, this.body);
      return true;
    }
  }

  render() {
    push();
    translate(
      this.body.position.x,
      this.body.position.y
    );

    rotate(this.body.angle);
    if (this.graphic) {
      imageMode(CENTER);
      image(this.graphic, 0, 0);
    } else {
      rectMode(CENTER);
      fill(this.c);
      rect(0, 0, this.w, this.h);
    }
    pop();
  }
}

class Ball {
  constructor({ x, y, r, c = 50, options = {} }) {
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.c = c;
    World.add(world, this.body);
  }

  isOffScreen() {
    const { x, y } = this.body.position;

    if (
      x < 0 - this.r || x > width + this.r ||
      y > height + this.r
    ) {
      World.remove(world, this.body);
      return true;
    }
  }

  contains(i, j) {
    const { x, y } = this.body.position;
    return (
      i > x - this.r && i < x + this.r &&
      j > y - this.r && j < y + this.r
    );
  }

  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    imageMode(CENTER);
    rotate(this.body.angle);
    image(pokeball, 0, 0);
    pop();
  }
}
