import BitField from 'bitfield';
import { IEntity } from './Entity';
import { IComponent } from './Component';
import TransformComponent from '../../common/components/Transform';

export class System {
  private _entities: IEntity[];
  private _systemComponentSignature: BitField;

  constructor() {
    this._entities = [];
    this._systemComponentSignature = new BitField(32); // TODO: setup global variable
  }

  requireComponents(components: (typeof TransformComponent)[]) {
    components.forEach((component) =>
      this._systemComponentSignature.set(component.id),
    );
  }

  addEntity(entity: IEntity) {
    this._entities.push(entity);
  }

  removeEntity(entity: IEntity) {
    this._entities = this._entities.filter((e) => e.id != entity.id);
  }

  getEntities() {
    return this._entities;
  }

  getComponentSignature() {}
}
