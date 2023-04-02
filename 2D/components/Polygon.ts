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

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, 0 - this.radius);

    for (let i = 0; i < this.sides; i++) {
      ctx.lineTo(0, 0 - this.radius);
      ctx.rotate(Math.PI / this.sides);
      ctx.lineTo(0, 0 - this.radius);
      ctx.rotate(Math.PI / this.sides);
    }

    ctx.restore();
    ctx.closePath();

    ctx.stroke();
    ctx.fill();
  }
}
