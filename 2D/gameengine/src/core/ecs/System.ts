import { Entity } from "./Entity";
import { Component } from "./Component";

export class System {
    private _entities: Entity[];
    private _systemComponentSignature: Bitfield;

    constructor(components: Component[] = []) {
        this._entities = [];
        this._systemComponentSignature = new Bitfield(32);
        this.requireComponents(components);
    }

    private requireComponents(components: Component[]) {
        components.forEach((component) =>
            this._systemComponentSignature.set(component.id),
        );
    }

    addEntity(entity: Entity) {
        this._entities.push(entity);
    }

    removeEntity(entity: Entity) {
        this._entities = this._entities.filter((e) => e.id != entity.id);
    }

    getEntities() {
        return this._entities;
    }

    getComponentSignature() {}
}
