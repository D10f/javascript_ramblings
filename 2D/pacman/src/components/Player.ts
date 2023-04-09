import { Coordinates } from '../defs';

class Player {
    private radius: number;
    private velocity: number;

    constructor(public position: Coordinates) {
        this.radius = 10;
        this.velocity = 0;
    }

    update() {}

    draw(ctx: CanvasRenderingContext2D) {
    }
}

export default Player;
