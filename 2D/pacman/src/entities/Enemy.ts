import { CELL_SIZE, PLAYER_SPEED, TILE_TYPE } from '../defs';
import Vector from '../components/Vector';
import Grid from '../components/Grid';
import Player from '../components/Player';

class Enemy {
    public position: Vector;
    public radius: number;

    private targetPosition: Vector;
    private velocity: Vector;
    private target: Player;
    private moving: boolean;
    private grid: Grid;

    protected img: Path2D;

    constructor(x: number, y: number, target: Player, grid: Grid) {
        this.target = target;
        this.grid = grid;
        this.position = new Vector(x, y);
        this.targetPosition = new Vector(100, 100);
        this.velocity = new Vector(0, 0);
        this.radius = CELL_SIZE / 3;
        this.moving = false;
        this.img = new Path2D();
    }

    selectTargetPosition() {
        if (this.moving) return;

        const options = [
            new Vector(this.position.x, this.position.y - CELL_SIZE),
            new Vector(this.position.x + CELL_SIZE, this.position.y),
            new Vector(this.position.x, this.position.y + CELL_SIZE),
            new Vector(this.position.x - CELL_SIZE, this.position.y),
        ];

        while (true) {
            const randomIdx = Math.floor(Math.random() * 4);
            const selection = options[randomIdx];

            if (this.grid.getTileAt(selection) === 5) {
                continue;
            }

            this.targetPosition = selection;
            this.moving = true;
            switch (randomIdx) {
                case 0:
                    this.velocity.set(0, -PLAYER_SPEED);
                    return;
                case 1:
                    this.velocity.set(PLAYER_SPEED, 0);
                    return;
                case 2:
                    this.velocity.set(0, PLAYER_SPEED);
                    return;
                case 3:
                    this.velocity.set(-PLAYER_SPEED, 0);
                    return;
            }
        }

        // for (let i = 0, length = options.length; i < length; i++) {
        //     if (this.grid.getTileAt(options[i]) === 5) {
        //         continue;
        //     }
        //     this.targetPosition = options[i];

        //     switch (i) {
        //         case 0:
        //             this.velocity.set(0, -PLAYER_SPEED);
        //             return;
        //         case 1:
        //             this.velocity.set(PLAYER_SPEED, 0);
        //             return;
        //         case 2:
        //             this.velocity.set(0, PLAYER_SPEED);
        //             return;
        //         case 3:
        //             this.velocity.set(-PLAYER_SPEED, 0);
        //             return;
        //     }
        // }
    }

    move() {
        const targetDistance = this.position.distance(this.targetPosition);
        // const targetTile = this.grid.getTileAt(this.targetPosition);

        // if (this.position.distance(this.target.position) <= this.radius) {
        //     console.log('game over');
        //     return;
        // }

        if (targetDistance > 0) {

            // if (targetTile === TILE_TYPE.BOUNDARY) {
            //     return this.stop();
            // }

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
        this.selectTargetPosition();
        this.move();
    }
}

export default Enemy;
