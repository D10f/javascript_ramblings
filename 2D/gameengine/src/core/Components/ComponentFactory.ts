import BaseComponent from './Component';
import { ComponentArgs, ComponentType } from './types';

export default class ComponentFactory {
  private componentTypeCounter: number;
  private componentIdMap: Map<ComponentType, number>;

  constructor() {
    this.componentTypeCounter = 0;
    this.componentIdMap = new Map();
  }

  create<T extends ComponentType>(componentType: T, args: ComponentArgs<T>) {
    return new BaseComponent(
      this.calculateId(componentType),
      componentType,
      args,
    );
  }

  private calculateId(componentType: ComponentType) {
    let id = this.componentIdMap.get(componentType);
    if (id === undefined) {
      id = this.componentTypeCounter;
      this.componentIdMap.set(componentType, this.componentTypeCounter++);
    }
    return id;
  }
}
