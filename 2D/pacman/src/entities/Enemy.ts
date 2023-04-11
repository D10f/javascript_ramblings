import { CELL_SIZE, TILE_TYPE } from '../defs';
import Vector from '../components/Vector';
import drawCircle from '../utils/drawCircle';
import Grid from '../components/Grid';

class Enemy {

    public position: Vector;
    public radius: number;
    private targetPosition: Vector;
    private velocity: Vector;
    private color: string;

    constructor(x: number, y: number, color: string) {
        this.position = new Vector(x, y);
        this.targetPosition = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.radius = CELL_SIZE / 3;
        this.color = color;
    }

    // wander() {
    //     const randomDirection = Math.floor(Math.random() * 4);
    //     switch (randomDirection) {
    //         case 1:
    //             this.target
    //         break;
    //     }
    // }

    update() {
        // if (this.position.distance(this.targetPosition) < CELL_SIZE * 3) {
        //     this.wander();
        // }
        this.position.add(this.velocity);
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle({
            ctx,
            x: this.position.x,
            y: this.position.y,
            radius: this.radius,
            color: this.color
        });
    }
}

export default Enemy;
