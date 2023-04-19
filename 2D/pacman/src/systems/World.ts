import Grid from "./Grid";
import EventEmitter from "./EventEmitter";
import { makeEnemyFactory, makePlayerFactory } from "../utils/factory";
import Food from "../entities/Food";

class World {
    private readonly grid: Grid;
    private readonly _entities: Entity[];

    constructor(
        private eventEmitter: EventEmitter,
    ) {
        const makeEnemy = makeEnemyFactory(this.eventEmitter);
        const makePlayer = makePlayerFactory(this.eventEmitter);

        this._entities = [
            makePlayer(),
            makeEnemy(),
            makeEnemy(),
            makeEnemy(),
            makeEnemy(),
        ];
        this.grid = new Grid(this.entities);

        eventEmitter.subscribe('respawn', (enemy: Entity) => {
            const idx = this._entities.findIndex(e => e === enemy);
            this._entities.splice(idx, 1, makeEnemy());
        });

        eventEmitter.subscribe('score', () => {
            for (let i = this._entities.length; i >= 0; i--) {
                if (this._entities[i] instanceof Food) return;
            }
            eventEmitter.emit('win');
        });
    }

    get entities() {
        return this._entities;
    }

    update() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.grid);
        }
    }
}

export default World;
