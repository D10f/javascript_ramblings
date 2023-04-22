export default class Floor implements Terrain {

    static type = 'Floor';

    public readonly type: 'FLOOR';
    public readonly color: string;
    public readonly difficulty: number;

    constructor() {
        this.type = 'FLOOR';
        this.color = '#aaaaaa';
        this.difficulty = 1;
    }
}
