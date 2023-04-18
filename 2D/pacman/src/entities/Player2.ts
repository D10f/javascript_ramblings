import Grid from "../components/Grid";
import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";

class Player2 implements Entity {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public isMoving: boolean;
    public radius: number;

    constructor(
        x: number,
        y: number,
        private inputComponent: any,
        private graphicComponent: any,
        private movementComponent: any,
        private collisionComponent: any,
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.isMoving = false;
        this.radius = CELL_SIZE / 3;
    }

    update(world: Grid) {
        this.inputComponent.update(this);
        this.collisionComponent.update(this, world);
        this.movementComponent.update(this);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Player2;
