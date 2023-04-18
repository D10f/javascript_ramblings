import { TILE_TYPE } from "../defs";
import Grid from "./Grid";

class CollisionComponent {

    constructor(private targets: TILE_TYPE[]) {}

    update(entity: any, world: Grid) {
        const distance = entity.position.distance(entity.targetPosition);
        const targetTile = world.getTileAt(entity.targetPosition);

        if (distance > 0 && targetTile === TILE_TYPE.BOUNDARY) {
            entity.velocity.set(0, 0);
            entity.isMoving = false;
        }

        for (let i = 0; i < this.targets.length; i++) {
            if (distance <= entity.radius && targetTile === this.targets[i]) {
                world.eatFoodAt(entity.position);
            }
        }
    }
}

export default CollisionComponent;
