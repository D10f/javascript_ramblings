import { CELL_SIZE, PLAYER_SPEED } from '../defs';
import Vector from '../components/Vector';
import Grid from '../components/Grid';
import Player from '../components/Player';
import { constrain } from '../utils';

class Enemy {
    public position: Vector;
    public radius: number;

    protected targetPosition: Vector;
    private velocity: Vector;
    protected targetPath: Vector[];
    private target: Player;
    private moving: boolean;
    private grid: Grid;

    protected img: Path2D;

    constructor(x: number, y: number, target: Player, grid: Grid) {
        this.target = target;
        this.grid = grid;
        this.position = new Vector(x, y);
        // this.targetPosition = new Vector(100, 100);
        this.targetPosition = target.position;
        this.velocity = new Vector(0, 0);
        this.radius = CELL_SIZE / 3;
        this.moving = false;
        this.img = new Path2D();
        this.targetPath = this.getTargetPath();
    }

    // random walk
    // selectTargetPosition() {
    //     if (this.moving) return;

    //     const options = [
    //         new Vector(this.position.x, this.position.y - CELL_SIZE),
    //         new Vector(this.position.x + CELL_SIZE, this.position.y),
    //         new Vector(this.position.x, this.position.y + CELL_SIZE),
    //         new Vector(this.position.x - CELL_SIZE, this.position.y),
    //     ];

    //     let randomIdx, dirVector, targetTile;

    //     do {
    //         randomIdx = Math.floor(Math.random() * 4);
    //         dirVector = options[randomIdx];
    //         targetTile = this.grid.getTileAt(dirVector);
    //     } while (targetTile === TILE_TYPE.BOUNDARY);

    //     this.targetPosition = dirVector;
    //     this.moving = true;

    //     switch (randomIdx) {
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

    getTargetPath() {
        return this.grid.getShortestPath(this.position, this.target.position);
    }

    updateTargetPath() {
        const updatedTargets = this.getTargetPath();
        for (let i = 0, l = updatedTargets.length; i < l; i++) {
            this.targetPath.push(updatedTargets[i]);
        }
    }

    getPathToTarget() {
        if (this.moving) return;
        const nextTarget = this.targetPath.pop();

        if (nextTarget) {
            this.targetPosition = nextTarget;
            this.moving = true;
            this.velocity.set(
                constrain(nextTarget.x - this.position.x, PLAYER_SPEED, -PLAYER_SPEED),
                constrain(nextTarget.y - this.position.y, PLAYER_SPEED, -PLAYER_SPEED)
            );
        } else {
            this.updateTargetPath();
        }
    }

    move() {
        const targetDistance = this.position.distance(this.targetPosition);

        if (targetDistance > 0) {
            this.position.add(this.velocity);
        } else {
            this.stop();
        }
    }

    stop() {
        this.moving = false;
    }

    update() {
        this.getPathToTarget();
        this.move();
    }
}

export default Enemy;
