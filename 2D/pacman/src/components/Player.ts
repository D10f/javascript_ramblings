import { Coordinates, CELL_SIZE } from '../defs';

class Player {
    private radius: number;
    private velocity: Coordinates;
    private targetPosition: Coordinates;
    private keyPressed: string;
    private moving: boolean;

    constructor(public position: Coordinates) {
        this.targetPosition = { x: 0, y: 0 };
        this.radius = CELL_SIZE / 3;
        this.velocity = { x: 0, y: 0 };
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
                this.velocity.x = -2;
                this.targetPosition = {
                    x: this.position.x - CELL_SIZE,
                    y: this.position.y
                };
                this.moving = true;
                break;
            case 'D':
                this.velocity.x = 2;
                this.targetPosition = {
                    x: this.position.x + CELL_SIZE,
                    y: this.position.y
                };
                this.moving = true;
                break;
            case 'W':
                this.velocity.y = -2;
                this.targetPosition = {
                    x: this.position.x,
                    y: this.position.y - CELL_SIZE
                };
                this.moving = true;
                break;
            case 'S':
                this.velocity.y = 2;
                this.targetPosition = {
                    x: this.position.x,
                    y: this.position.y + CELL_SIZE
                };
                this.moving = true;
                break;
            default:
                return;
        }
    }

    move() {
        if (this.position.x !== this.targetPosition.x || this.position.y !== this.targetPosition.y) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        } else {
            this.velocity.x = 0;
            this.velocity.y = 0;
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
