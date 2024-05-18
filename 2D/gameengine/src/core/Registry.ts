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
import SystemFactory from './Systems/SystemFactory';
import { SystemType } from './Systems/types';

export default class Registry {
  private componentFactory: ComponentFactory;
  private systemFactory: SystemFactory;
  private totalEntities: number;
  private freeEntityIds: number[];
  private componentPools: IComponent[][];
  private componentSignatures: BitField[];
  private systems: System[];
  private addEntitiesQueue: IEntity[];
  private removeEntitiesQueue: IEntity[];

  constructor() {
    this.totalEntities = 0;
    this.freeEntityIds = [];
    this.componentPools = [];
    this.componentSignatures = [];
    this.systems = [];
    this.addEntitiesQueue = [];
    this.removeEntitiesQueue = [];
    this.componentFactory = new ComponentFactory();
    this.systemFactory = new SystemFactory(this);
  }

  createEntity() {
    // if (this.freeEntityIds.length === 0) {
    //   entityId = this.totalEntities++;

    //   if (entityId > this.componentSignatures.length) {
    //     resizeArray(this.componentSignatures);
    //   }
    // } else {
    //   entityId = this.freeEntityIds.unshift();
    // }
    const entityId =
      this.freeEntityIds.length > 0
        ? this.freeEntityIds.unshift()
        : this.totalEntities++;

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
    const entityComponent = componentPool[entityId];

    if (!entityComponent) {
      throw new Error(
        `Component ${type}(${componentId}) on entity ${entityId} not found!`,
      );
    }

    return entityComponent as Component<T>;
  }

  addSystem(system: SystemType) {
    const newSystem = this.systemFactory.create(system);
    this.systems.push(newSystem);
    return newSystem;
  }

  addEntityToSystem(entity: IEntity) {
    const entityId = entity.id;
    const bits: boolean[] = [];

    this.componentSignatures[entityId].forEach((bit) => {
      bits.push(bit);
    });

    for (const system of this.systems) {
      let isValid = true;

      system.systemComponentSignature.forEach((bit, idx) => {
        if (bits[idx] !== bit) {
          isValid = false;
          return;
        }
      });

      if (isValid) {
        console.log('sdfs');
        system.addEntity(entity);
      }
    }
  }

  removeEntityFromSystem(entity: IEntity) {
    for (const system of this.systems) {
      system.removeEntity(entity);
    }
  }

  update() {
    for (const entity of this.addEntitiesQueue) {
      this.addEntityToSystem(entity);
    }

    this.addEntitiesQueue = [];

    for (const entity of this.removeEntitiesQueue) {
      const entityId = entity.id;
      this.removeEntityFromSystem(entity);
      this.freeEntityIds.push(entityId);
      /* @ts-ignore */
      this.componentSignatures[entityId].forEach((bit) => (bit = false));
    }

    this.removeEntitiesQueue = [];
  }
}
