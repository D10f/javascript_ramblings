import Vector from './Vector';
import drawCircle from '../utils/drawCircle';

class Food {
    public position: Vector;
    public eaten: boolean;
    private color: string;

    constructor(x: number, y: number) {
        this.position = new Vector(x, y);
        this.eaten = false;
        this.color = '#f2d5cf';
    }

    eat() {
        this.eaten = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle({
            ctx,
            x: this.position.x,
            y: this.position.y,
            radius: 3,
            color: this.color
        });
    }
}

export default Food;
