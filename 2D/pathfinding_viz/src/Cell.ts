import { CELL_SIZE } from "./defs";

export default class Cell {

    public id: string;

    constructor(
        public x: number,
        public y: number,
        public terrain: Terrain
    ) {
        this.id = `${x},${y}`;
    }

    // update(grid: Grid) {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.terrain.color;
        ctx.fillRect(this.x, this.y, CELL_SIZE - 1, CELL_SIZE - 1);
        // ctx.fillStyle = '#333';
        // const text = this.terrain.type === 'WATER' ? '∞' : `${this.terrain.difficulty}`;
        // ctx.fillText(`${this.terrain.difficulty}`, this.x + CELL_SIZE / 2, this.y + CELL_SIZE / 2);
    }
}
