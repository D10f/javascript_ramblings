import { TILE_TYPE } from "../defs";
import Enemy from "../entities/Enemy";
import Food from "../entities/Food";
import Player from "../entities/Player";
import Power from "../entities/Power";
import EventEmitter from "../systems/EventEmitter";
import Grid from "../systems/Grid";

class CollisionComponent {

    constructor(private eventEmitter: EventEmitter) {}

    update(entity: Entity, world: Grid) {

        const distance = entity.position.distance(entity.targetPosition);
        const targetTile = world.getTileAt(entity.targetPosition);

        if (distance > 0 && targetTile === TILE_TYPE.BOUNDARY) {
            entity.velocity.set(0, 0);
            entity.isMoving = false;
        }

        for (let i = world.entities.length; i >= 0; i--) {
            if (
                world.entities[i] instanceof Food &&
                entity.position.distance(world.entities[i].position) <= entity.radius
            ) {
                this.eventEmitter.emit('score');
                world.entities.splice(i, 1);
                return;
            }

            if (
                world.entities[i] instanceof Power &&
                entity.position.distance(world.entities[i].position) <= entity.radius
            ) {
                this.eventEmitter.emit('powerUp');
                world.entities.splice(i, 1);
                return;
            }

            if (
                world.entities[i] instanceof Enemy &&
                entity.position.distance(world.entities[i].position) <= entity.radius
            ) {
                if ((world.entities[i] as Enemy).isKilled) return;

                if ((entity as Player)._powerUp) {
                    this.eventEmitter.emit('enemyKill', world.entities[i]);
                } else {
                    this.eventEmitter.emit('gameOver');
                }
            }
        }
    }
}

export default CollisionComponent;
