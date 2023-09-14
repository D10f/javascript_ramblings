export default class Entity {
  constructor(private readonly _id: number) {}

  get id() {
    return this._id;
  }
}
