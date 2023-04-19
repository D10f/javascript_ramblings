import { CELL_SIZE } from "../defs";
import EventEmitter from "./EventEmitter";

class ScoreSystem {

    private score: number;

    constructor(private eventEmitter: EventEmitter) {

        this.score = 0;

        this.eventEmitter.subscribe('score', () => {
            this.inc();
        });

        this.eventEmitter.subscribe('enemyKill', () => {
            this.inc(10);
        });
    }

    inc(amount = 1) {
        this.score += amount;
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
