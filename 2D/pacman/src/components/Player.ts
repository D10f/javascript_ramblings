import { Coordinates, PLAYER_SPEED, CELL_SIZE } from '../defs';
import Vector from './Vector';

class Player {
    private radius: number;
    private velocity: Vector;
    private targetPosition: Vector;
    private position: Vector;
    private keyPressed: string;
    private moving: boolean;

    constructor(x: number, y: number) {
        this.position = new Vector(x, y)
        this.targetPosition = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        // this.targetPosition = { x: 0, y: 0 };
        // this.velocity = { x: 0, y: 0 };
        this.radius = CELL_SIZE / 3;
        this.keyPressed = '';
        this.moving = false;
        this.events();
    }

    get direction() {
        return this.position.subtract(this.targetPosition);
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
                this.velocity.x = -PLAYER_SPEED;
                this.targetPosition.set(
                    this.position.x - CELL_SIZE,
                    this.position.y
                );
                // this.targetPosition = {
                //     x: this.position.x - CELL_SIZE,
                //     y: this.position.y
                // };
                this.moving = true;
                break;
            case 'D':
                this.velocity.x = PLAYER_SPEED;
                this.targetPosition.set(
                    this.position.x + CELL_SIZE,
                    this.position.y
                );
                this.moving = true;
                break;
            case 'W':
                this.velocity.y = -PLAYER_SPEED;
                this.targetPosition.set(
                    this.position.x,
                    this.position.y - CELL_SIZE
                );
                this.moving = true;
                break;
            case 'S':
                this.velocity.y = PLAYER_SPEED;
                this.targetPosition.set(
                    this.position.x,
                    this.position.y + CELL_SIZE
                );
                this.moving = true;
                break;
            default:
                return;
        }
    }

    move() {
        if (this.position.distance(this.targetPosition) > 0) {
            this.position.add(this.velocity);
        } else {
            this.velocity.set(0, 0);
            this.moving = false;
        }
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
        ctx.strokeStyle = 'red';
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
