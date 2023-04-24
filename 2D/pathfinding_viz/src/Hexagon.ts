import { HEX_SIZE, HEX_WIDTH } from "./defs";
import { Terrain } from "./Terrain";

export default class Hexagon {

    public id: string;
    public flag: HTMLImageElement;

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
        this.flag = new Image();
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

        if (this.terrain.texture) {
            ctx.drawImage(this.terrain.texture, -HEX_WIDTH * 0.5, -HEX_SIZE);
        }

        if (this.flag) {
            ctx.drawImage(this.flag, 0, 0, 32, 32, -HEX_WIDTH * 0.5, -HEX_SIZE * 0.75, 55, 32);
        }

        ctx.restore();
        ctx.closePath();


        // ctx.strokeStyle = '#303446';
        ctx.strokeStyle = this.terrain.color || '#303446';
        ctx.stroke();

        // ctx.fillStyle = this.terrain.color;
        // ctx.fill();
    }
}
