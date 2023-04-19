import { CELL_SIZE } from "../defs";
import EventEmitter from "./EventEmitter";

class ScoreSystem {

    private score: number;

    constructor(private eventEmitter: EventEmitter) {

        this.score = 0;

        this.eventEmitter.subscribe('score', () => {
            this.score++;
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#303466';
        ctx.strokeText(
            `Points: ${this.score}`,
            CELL_SIZE,
            CELL_SIZE - 16
        );
    }
}

export default ScoreSystem;
