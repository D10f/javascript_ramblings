import { PLAYER_SPEED } from "../defs";
import { constrain } from "../utils/math";
import BasePathStrategy from "./BasePathStrategy";
import Grid from "./Grid";

type PathGeneratorComponentProps = {
    strategies: typeof BasePathStrategy[],
    behaviorIntervalMs?: number
};

class PathGeneratorComponent {

    private strategies: typeof BasePathStrategy[];
    private strategy: PathGenerationStrategy;
    private behaviorIdx: number;
    private behaviorIntervalMs: number;
    private behaviorInterval: ReturnType<typeof setInterval>;

    constructor({ strategies, behaviorIntervalMs = 12_000 }: PathGeneratorComponentProps) {
        if (strategies.length === 0) {
            throw new Error('You must provide at least one strategy.');
        }
        this.behaviorIdx = 0;
        this.behaviorIntervalMs = behaviorIntervalMs;
        this.behaviorInterval = setInterval(() => this.cycle(), behaviorIntervalMs);
        this.strategies = strategies;
        this.strategy = new strategies[0]();
    }

    private cycle() {
        this.behaviorIdx = (this.behaviorIdx + 1) % this.strategies.length;
        this.strategy = new this.strategies[this.behaviorIdx]();
    }

    changeBehavior(newBehavior: PathGenerationStrategy) {
        clearInterval(this.behaviorInterval);
        this.behaviorInterval = setInterval(() => this.cycle(), this.behaviorIntervalMs);
        this.behaviorIdx = 0;
        this.strategy = newBehavior;
    }

    update(entity: Entity, world: Grid) {
        if (entity.isMoving) return;
        const targetPosition = this.strategy.generate(entity, world);
        entity.targetPosition = targetPosition;
        entity.velocity.set(
            constrain(targetPosition.x - entity.position.x, PLAYER_SPEED, -PLAYER_SPEED),
            constrain(targetPosition.y - entity.position.y, PLAYER_SPEED, -PLAYER_SPEED)
        );
        entity.isMoving = true;
    }
}

export default PathGeneratorComponent;
