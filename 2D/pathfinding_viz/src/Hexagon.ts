export default class Hexagon {

    public id: string;

    constructor(
        public x: number,
        public y: number,
        public size: number,
        public col: number,
        public row: number,
        // public color = 'coral',
        public terrain: Terrain,
    ) {
        this.id = `${col},${row}`;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0, 0 - this.size);

        for (let i = 0; i < 3; i++) {
            ctx.lineTo(0, 0 - this.size);
            ctx.rotate(Math.PI / 3);
            ctx.lineTo(0, 0 - this.size);
            ctx.rotate(Math.PI / 3);
        }

        ctx.restore();
        ctx.closePath();

        ctx.fillStyle = this.terrain.color;

        ctx.stroke();
        ctx.fill();
    }
}
