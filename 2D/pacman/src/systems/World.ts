import Grid from "./Grid";
import EventEmitter from "./EventEmitter";
import { makeEnemyFactory, makePlayerFactory } from "../utils/factory";

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
