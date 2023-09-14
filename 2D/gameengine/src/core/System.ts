import BitField from 'bitfield';
import Entity from './Entity';
import BaseComponent from './Component';

export default class System {
  private _entities: Entity[];
  private _systemComponentSignature: BitField;

  constructor() {
    this._entities = [];
    this._systemComponentSignature = new BitField(32); // TODO: setup global variable
  }

  requireComponents(components: BaseComponent[]) {
    components.forEach((c) => this._systemComponentSignature.set(c.id));
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
