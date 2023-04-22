export default class Mountain implements Terrain {

    static type = 'Mountain';

    public readonly type: 'MOUNTAIN';
    public readonly color: string;
    public readonly difficulty: number;

    constructor() {
        this.type = 'MOUNTAIN';
        this.color = '#ffaaaa';
        this.difficulty = 5;
    }
}
