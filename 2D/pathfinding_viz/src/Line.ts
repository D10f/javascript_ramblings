export default class Line {
    constructor(
        private x1: number,
        private y1: number,
        private x2: number,
        private y2: number
    ) {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.save();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.restore();
    }
}
