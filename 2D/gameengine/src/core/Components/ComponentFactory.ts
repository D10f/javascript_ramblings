import BaseComponent from './Component';
import { Component, ComponentArgs, ComponentType } from './types';

export default class ComponentFactory {
  static componentTypeCounter: number;
  static componentIdMap: Map<ComponentType, number>;

  constructor() {
    ComponentFactory.componentTypeCounter = 0;
    ComponentFactory.componentIdMap = new Map();
  }

  static getTypeId(type: ComponentType) {
    const typeId = ComponentFactory.componentIdMap.get(type);
    if (typeId === undefined) {
      throw new Error('Component id does not exist');
    }
    return typeId;
  }

  create<T extends ComponentType>(componentType: T, args: ComponentArgs<T>) {
    return new BaseComponent(
      this.calculateId(componentType),
      componentType,
      args,
    );
  }

  private calculateId(componentType: ComponentType) {
    let id = ComponentFactory.componentIdMap.get(componentType);
    if (id === undefined) {
      id = ComponentFactory.componentTypeCounter;
      ComponentFactory.componentIdMap.set(
        componentType,
        ComponentFactory.componentTypeCounter++,
      );
    }
    return id;
  }
}
