import { PLAYER_SPEED } from "../defs";
import { constrain } from "../utils/math";
import Grid from "./Grid";

class PathGeneratorComponent {

    constructor(private strategy: any) {}

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
