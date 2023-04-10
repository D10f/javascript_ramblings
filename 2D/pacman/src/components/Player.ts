import { PLAYER_SPEED, CELL_SIZE, TILE_TYPE } from '../defs';
import Grid from './Grid';
import Vector from './Vector';

class Player {
    private position: Vector;
    private targetPosition: Vector;
    private velocity: Vector;
    private radius: number;
    private keyPressed: string;
    private moving: boolean;

    constructor(x: number, y: number) {
        this.position = new Vector(x, y)
        this.targetPosition = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.radius = CELL_SIZE / 3;
        this.keyPressed = '';
        this.moving = false;
        this.events();
    }

    events() {
        window.addEventListener('keydown', (ev: KeyboardEvent) => {
            this.keyPressed = ev.key.toUpperCase();
        });
    }

    readInput() {
        if (this.moving) return;
        switch (this.keyPressed) {
            case 'A':
                this.velocity.set(-PLAYER_SPEED, 0);
                this.targetPosition.set(
                    this.position.x - CELL_SIZE,
                    this.position.y
                );
                break;
            case 'D':
                this.velocity.set(PLAYER_SPEED, 0);
                this.targetPosition.set(
                    this.position.x + CELL_SIZE,
                    this.position.y
                );
                break;
            case 'W':
                this.velocity.set(0, -PLAYER_SPEED);
                this.targetPosition.set(
                    this.position.x,
                    this.position.y - CELL_SIZE
                );
                break;
            case 'S':
                this.velocity.set(0, PLAYER_SPEED);
                this.targetPosition.set(
                    this.position.x,
                    this.position.y + CELL_SIZE
                );
                break;
            default:
                return;
        }
        this.moving = true;
    }

    move() {
        if (this.position.distance(this.targetPosition) > 0) {
            const tile = Grid.getTileAt(this.targetPosition);
            if (tile === TILE_TYPE.BOUNDARY) {
                return this.stop();
            };
            this.position.add(this.velocity);
        } else {
            this.stop();
        }
    }

    stop() {
        this.velocity.set(0, 0);
        this.moving = false;
    }

    update() {
        this.move();
        this.readInput();
        // this.keyPressed = '';
        // if (this.moving) {
        //     this.move();
        // } else {
        //     this.readInput();
        //     // this.keyPressed = '';
        // }
    }

    debug(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'white';
        ctx.strokeText(
            `x: ${this.position.x}`,
            this.position.x,
            this.position.y
        );
        ctx.strokeText(
            `y: ${this.position.y}`,
            this.position.x,
            this.position.y + 10
        );
        ctx.strokeText(
            `Tx: ${this.targetPosition.x}`,
            this.position.x + CELL_SIZE,
            this.position.y
        );
        ctx.strokeText(
            `Ty: ${this.targetPosition.y}`,
            this.position.x + CELL_SIZE,
            this.position.y + 10
        );
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.arc(this.radius + 10, this.radius + 10, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        this.debug(ctx);
    }
}

export default Player;
