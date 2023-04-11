import Grid from '../components/Grid';
import Player from '../components/Player';
import Enemy from './Enemy';
import { drawCircle } from '../utils';
import { CELL_SIZE } from '../defs';

class AngularGhost extends Enemy {

    constructor(x: number, y: number, target: Player, grid: Grid) {
        super(x, y, target, grid);
        this.img = new Path2D('M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z');
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle({
            ctx,
            x: this.position.x,
            y: this.position.y,
            radius: this.radius,
            color: '#303446'
        });
        ctx.fillStyle = '#DD0031';
        ctx.save();
        ctx.translate(this.position.x + (CELL_SIZE * 0.22), this.position.y + (CELL_SIZE * 0.22));
        ctx.fill(this.img);
        ctx.restore();
    }
}

export default AngularGhost;
