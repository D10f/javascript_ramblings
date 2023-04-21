import Grid from "./Grid";
import { CELL_SIZE } from "./main";

export default class Cell {

    constructor(public x: number, public y: number) {}

    update(grid: Grid) {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'coral';
        ctx.fillRect(this.x, this.y, CELL_SIZE - 1, CELL_SIZE - 1);
    }
}
