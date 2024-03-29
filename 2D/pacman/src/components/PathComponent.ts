import { PLAYER_POWERUP_DURATION, PLAYER_SPEED } from "../defs";
import Enemy from "../entities/Enemy";
import Grid from "../systems/Grid";
import { constrain } from "../utils/math";
import BasePathStrategy from "./PathStrategies/BasePathStrategy";

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

    constructor({ strategies, behaviorIntervalMs = PLAYER_POWERUP_DURATION }: PathGeneratorComponentProps) {
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

        let speed = PLAYER_SPEED;
        if ((entity as Enemy).isKilled) {
            speed *= 2;
        } else if ((entity as Enemy).isScared) {
            speed -= 1;
        }
        // const speed = (entity as Enemy).isScared ? PLAYER_SPEED - 1 : PLAYER_SPEED;
        const targetPosition = this.strategy.generate(entity, world);
        entity.targetPosition = targetPosition;
        entity.velocity.set(
            constrain(targetPosition.x - entity.position.x, speed, -speed),
            constrain(targetPosition.y - entity.position.y, speed, -speed)
        );
        entity.isMoving = true;
    }
}

export default PathGeneratorComponent;
