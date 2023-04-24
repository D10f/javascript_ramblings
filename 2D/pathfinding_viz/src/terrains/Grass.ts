export default class Grass implements Terrain {

    static type = 'Grass';

    public readonly type: TerrainType;
    public readonly color: string;
    public readonly difficulty: number;
    public readonly texture: HTMLImageElement;

    constructor() {
        this.type = 'GRASS';
        this.color = '#aaffaa';
        this.difficulty = 2;
        this.texture = new Image();
        this.texture.src = 'sheepHex.png';
    }
}
