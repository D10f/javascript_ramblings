import { CELL_SIZE } from '../defs';

type PositionCoordinates = {
    x: number;
    y: number;
};

class Boundary {

    public width: number;
    public height: number;

    constructor(
        private ctx: CanvasRenderingContext2D,
        public pos: PositionCoordinates,
    ) {
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
    }

    draw() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

export default Boundary;
