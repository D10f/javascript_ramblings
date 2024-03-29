import Grid from "../systems/Grid";
import PanicStrategy from "../components/PathStrategies/PanicStrategy";
import PathGeneratorComponent from "../components/PathComponent";
import { CELL_SIZE } from "../defs";
import Vector from "../lib/Vector";
import RetreatStrategy from "../components/PathStrategies/RetreatStrategy";
import EventComponent from "../components/EventComponent";

class Enemy implements Entity {

    public position: Vector;
    public velocity: Vector;
    public targetPosition: Vector;
    public isMoving: boolean;
    public radius: number;
    public isScared: boolean;
    public isKilled: boolean;

    constructor(
        x: number,
        y: number,
        private pathGeneratorComponent: PathGeneratorComponent,
        private movementComponent: any,
        private graphicComponent: any,
        public readonly eventEmitter: EventComponent,
    ) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.targetPosition = new Vector(x, y);
        this.isMoving = false;
        this.radius = CELL_SIZE / 3;
        this.isScared = false;
        this.isKilled = false;
        this.eventEmitter.eventEmitter.subscribe('powerUp', this.panic.bind(this));
        this.eventEmitter.eventEmitter.subscribe('powerDown', this.restore.bind(this));
        this.eventEmitter.eventEmitter.subscribe('enemyKill', this.retreat.bind(this));
    }

    private panic() {
        this.isScared = true;
        this.pathGeneratorComponent.changeBehavior(new PanicStrategy());
    }

    private restore() {
        this.isScared = false;
    }

    private retreat(entity: Entity) {
        if (entity !== this) return;
        this.isKilled = true;
        this.pathGeneratorComponent.changeBehavior(new RetreatStrategy());
    }

    update(world: Grid) {
        this.pathGeneratorComponent.update(this, world);
        this.movementComponent.update(this, world);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.graphicComponent.draw(this, ctx);
    }
}

export default Enemy;
