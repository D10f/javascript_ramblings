export default class Water implements Terrain {

    static type = 'Water';

    public readonly type: 'WATER';
    public readonly color: string;
    public readonly difficulty: number;

    constructor() {
        this.type = 'WATER';
        this.color = '#3377cc';
        this.difficulty = Infinity;
    }
}
