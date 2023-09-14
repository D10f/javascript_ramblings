export default class BaseComponent {
  private readonly _id: number;
  private readonly _type: string;

  constructor(id: number, { type, ...args }: any) {
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
