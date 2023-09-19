import { ComponentArgs, ComponentType } from '../common/components';

export default class BaseComponent<T extends ComponentType> {
  private readonly _id: number;
  private readonly _type: ComponentType;

  constructor(id: number, type: T, args: ComponentArgs<T>) {
    this._id = id;
    this._type = type;
    Object.assign(this, args);
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }
}
