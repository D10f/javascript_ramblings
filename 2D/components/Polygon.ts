// type GeometricShapes =
//   'TRIANGLE'
//   | 'QUADRILATERAL'
//   | 'PENTAGON'
//   | 'HEXAGON'
//   | 'HEPTAGON'
//   | 'OCTAGON'
//   | 'NONAGON'
//   | 'DECAGON'
//   | 'HENDECAGON'
//   | 'DODECAGON';

export class Polygon {
  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public sides: number,
    public radius: number,
    public inset = 1,
    // public shape?: GeometricShapes,
  ) {
    if (inset === 1) {
      this.sides *= 0.5;
    }
  }

  render() {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.moveTo(0, 0 - this.radius);

    for (let i = 0; i < this.sides; i++) {
      this.ctx.lineTo(0, 0 - this.radius);
      this.ctx.rotate(Math.PI / this.sides);
      this.ctx.lineTo(0, 0 - this.radius);
      this.ctx.rotate(Math.PI / this.sides);
    }

    this.ctx.restore();
    this.ctx.closePath();

    this.ctx.stroke();
    this.ctx.fill();
  }
}
