class MatrixSymbol {
  constructor(x, y, speed, col) {
    this.x = x;
    this.y = y;
    this.value = this.setRandomSymbol();
    this.speed = speed;
    this.color = col;
    this.interval = round(random(21, 60));
  }

  setRandomSymbol() {
    return String.fromCharCode(0x30A0 + round(random(0, 96)));
  }

  scroll() {
    this.y += this.speed;
    if (this.y > height + CHAR_SIZE) {
      this.y = -CHAR_SIZE;
    }
  }

  update() {
    this.scroll();
    if (frameCount % this.interval === 0) {
      this.value = this.setRandomSymbol();
    }
  }

  render() {
    fill(this.color);
    text(this.value, this.x, this.y);
  }
}

class Column {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.symbols = [];
    this.totalSymbols = round(random(7, 15));
    this.speed = random(2,5);
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.totalSymbols; i++) {
      let letterColor;

      if (i === 0 && random(1) > 0.4) {
        letterColor = color(200, 250, 200);
      } else {
        letterColor = color(20, 185, 70);
      }

      const symbol = new MatrixSymbol(
        this.x,
        this.y,
        this.speed,
        letterColor
      );

      this.symbols.push(symbol);
      this.y -= CHAR_SIZE;
    }
  }

  render() {
    this.symbols.forEach(symbol => {
      symbol.update();
      symbol.render();
    });
  }
}

const CHAR_SIZE = 20;
let columns = [];

function setup() {
  createCanvas(720, 500);
  textSize(CHAR_SIZE);
  for (let i = 0; i < width; i += CHAR_SIZE) {
    columns.push(new Column(i, random(-1000, 0)));
  }
}

function draw() {
  background(25, 160);
  columns.forEach(column => column.render());
}
