import BitField from 'bitfield';
import { IEntity } from '../Entities/Entity';
import { ComponentType } from '../Components/types';
import ComponentFactory from '../Components/ComponentFactory';
import Registry from '../Registry';
import { ISystem } from './types';

const MAX_COMPONENTS = 32;

export default class BaseSystem implements ISystem {
  private _entities: IEntity[];
  private _systemComponentSignature: BitField;

  constructor(protected readonly registry: Registry) {
    this._entities = [];
    this._systemComponentSignature = new BitField(MAX_COMPONENTS);
  }

  protected requireComponents(components: ComponentType[]) {
    components.forEach((componentType) => {
      const componentId = ComponentFactory.getTypeId(componentType);
      this._systemComponentSignature.set(componentId);
    });
  }

  get entities() {
    return this._entities;
  }

  get systemComponentSignature() {
    return this._systemComponentSignature;
  }

  addEntity(entity: IEntity) {
    this._entities.push(entity);
  }

  removeEntity(entity: IEntity) {
    this._entities = this._entities.filter((e) => e.id != entity.id);
  }
}
