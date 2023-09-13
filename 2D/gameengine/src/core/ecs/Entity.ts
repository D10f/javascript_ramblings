export interface IEntity {
  id: number;
}

export class Entity implements IEntity {
  constructor(private readonly _id: number) { }

  get id() {
    return this._id;
  }
}
