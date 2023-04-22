import Grid from "./Grid";
import { CELL_SIZE } from "./main";

export default class Cell {

    public id: string;
    public color: string;

    constructor(public x: number, public y: number) {
        this.id = `${x},${y}`;
        this.color = 'coral';
    }

    // update(grid: Grid) {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, CELL_SIZE - 1, CELL_SIZE - 1);
    }
}
