export default class Grass implements Terrain {

    static type = 'Grass';

    public readonly type: 'GRASS';
    public readonly color: string;
    public readonly difficulty: number;

    constructor() {
        this.type = 'GRASS';
        this.color = '#aaffaa';
        this.difficulty = 2;
    }
}
