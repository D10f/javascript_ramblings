import BaseComponent from '../../core/Component';
import { Component, ComponentTypes } from './index';

export default class ComponentFactory {
  private componentTypeCounter: number;
  private componentIdMap: Map<string, number>;

  constructor() {
    this.componentTypeCounter = 0;
    this.componentIdMap = new Map();
  }

  create<T extends ComponentTypes>(args: T) {
    const id = this.calculateId(args.type);
    return new BaseComponent(id, args) as unknown as Component<T>;
  }

  private calculateId(componentType: string) {
    let id = this.componentIdMap.get(componentType);
    if (id === undefined) {
      id = this.componentTypeCounter;
      this.componentIdMap.set(componentType, this.componentTypeCounter++);
    }
    return id;
  }
}
