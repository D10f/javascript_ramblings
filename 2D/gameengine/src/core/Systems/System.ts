import BitField from 'bitfield';
import { IEntity } from '../Entities/Entity';
import { ComponentType } from '../Components/types';
import ComponentFactory from '../Components/ComponentFactory';

const MAX_COMPONENTS = 32;

export default class BaseSystem {
  private _entities: IEntity[];
  private _systemComponentSignature: BitField;

  constructor() {
    this._entities = [];
    this._systemComponentSignature = new BitField(MAX_COMPONENTS);
  }

  protected requireComponents(components: ComponentType[]) {
    components.forEach((componentType) => {
      const componentId = ComponentFactory.getTypeId(componentType);
      this._systemComponentSignature.set(componentId);
    });
  }

  protected getEntities() {
    return this._entities;
  }

  get componentSignature() {
    return this._systemComponentSignature;
  }

  addEntity(entity: IEntity) {
    this._entities.push(entity);
  }

  removeEntity(entity: IEntity) {
    this._entities = this._entities.filter((e) => e.id != entity.id);
  }
}
