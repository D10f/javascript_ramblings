import Grid from '../components/Grid';
import Player from '../components/Player';
import Enemy from './Enemy';
import { drawCircle } from '../utils';
import { CELL_SIZE } from '../defs';

class VueGhost extends Enemy {

    constructor(x: number, y: number, target: Player, grid: Grid) {
        super(x, y, target, grid);
        this.img = new Path2D('M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z');
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle({
            ctx,
            x: this.position.x,
            y: this.position.y,
            radius: this.radius,
            color: '#303446'
        });
        ctx.fillStyle = '#4FC08D';
        ctx.save();
        ctx.translate(this.position.x + (CELL_SIZE * 0.22), this.position.y + (CELL_SIZE * 0.22));
        ctx.fill(this.img);
        ctx.restore();
    }
}

export default VueGhost;
