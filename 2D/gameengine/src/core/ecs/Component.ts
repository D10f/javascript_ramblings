export class Component {
    constructor(private readonly _id: number) {}

    get id() {
        return this._id;
    }
}
