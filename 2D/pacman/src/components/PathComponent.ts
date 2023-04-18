import { PLAYER_SPEED } from "../defs";
import { constrain } from "../utils/math";
import Grid from "./Grid";

class PathGeneratorComponent {

    private strategies: PathGenerationStrategy[];
    private strategy: PathGenerationStrategy;

    constructor(...strategies: PathGenerationStrategy[]) {
        if (strategies.length === 0) {
            throw new Error('You must provide at least one strategy.');
        }
        this.strategies = strategies;
        this.strategy = strategies[0];
    }

    changeBehavior(newBehavior: PathGenerationStrategy) {
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
