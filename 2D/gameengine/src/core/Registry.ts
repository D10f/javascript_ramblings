import BitField from 'bitfield';
import ComponentFactory from './Components/ComponentFactory';
import {
  ComponentType,
  ComponentArgs,
  IComponent,
  Component,
} from './Components/types';
import Entity, { IEntity } from './Entities/Entity';
import System from './Systems/System';
import { resizeArray } from '../common/helpers/array';

export default class Registry {
  private componentFactory: ComponentFactory;
  private totalEntities: number;
  private freeEntityIds: number[];
  private componentPools: IComponent[][];
  private componentSignatures: BitField[];
  private systems: System[];
  private addEntitiesQueue: IEntity[];
  private removeEntitiesQueue: IEntity[];

  constructor() {
    this.componentFactory = new ComponentFactory();
    this.totalEntities = 0;
    this.freeEntityIds = [];
    this.componentPools = [];
    this.componentSignatures = [];
    this.systems = [];
    this.addEntitiesQueue = [];
    this.removeEntitiesQueue = [];
  }

  createEntity() {
    let entityId = 0;

    if (this.freeEntityIds.length === 0) {
      entityId = this.totalEntities++;

      if (entityId > this.componentSignatures.length) {
        resizeArray(this.componentSignatures);
      }
    } else {
      entityId = this.freeEntityIds.unshift();
    }

    const newEntity = new Entity(entityId);
    this.addEntitiesQueue.push(newEntity);

    return newEntity;
  }

  destroyEntity(entity: IEntity) {
    this.removeEntitiesQueue.push(entity);
  }

  addEntityComponent<T extends ComponentType>(
    entity: IEntity,
    type: T,
    args: ComponentArgs<T>,
  ) {
    const newComponent = this.componentFactory.create<T>(type, args);
    const entityId = entity.id;
    const componentId = newComponent.id;

    if (!this.componentPools[componentId]) {
      this.componentPools[componentId] = []; // new component pool
    }

    this.componentPools[componentId][entityId] = newComponent;
    this.componentSignatures[entityId] = new BitField(32);
    this.componentSignatures[entityId].set(componentId, true);
  }

  removeEntityComponent<T extends ComponentType>(entity: IEntity, type: T) {
    const componentId = ComponentFactory.getTypeId(type);
    const entityId = entity.id;
    this.componentSignatures[entityId].set(componentId, false);
  }

  hasEntityComponent<T extends ComponentType>(entity: IEntity, type: T) {
    const componentId = ComponentFactory.getTypeId(type);
    const entityId = entity.id;
    return this.componentSignatures[entityId].get(componentId);
  }

  getEntityComponent<T extends ComponentType>(entity: IEntity, type: T) {
    const componentId = ComponentFactory.getTypeId(type);
    const entityId = entity.id;
    const componentPool = this.componentPools[componentId];
    return componentPool[entityId] as Component<T>;
  }

  // addEntityToSystem(entity: Entity) {
  //   const entityId = entity.id;
  //   for (const system of this.systems) {

  // if (
  //   (this.componentSignatures[entityId] & system.componentSignature) ===
  //   system.componentSignature
  // ) {
  //   system.addEntity(entity);
  // }
  // }
  // }

  removeEntityFromSystem(entity: Entity) {
    for (const system of this.systems) {
      system.removeEntity(entity);
    }
  }

  update() {
    for (const entity of this.addEntitiesQueue) {
      // this.addEntityToSystem(entity);
    }

    this.addEntitiesQueue = [];

    for (const entity of this.removeEntitiesQueue) {
      const entityId = entity.id;
      // this.removeEntityFromSystem(entity);
      // this.freeEntityIds.push(entityId);
      // this.componentSignatures[entityId].forEach((bit) => (bit = false));
    }

    this.removeEntitiesQueue = [];
  }
}
