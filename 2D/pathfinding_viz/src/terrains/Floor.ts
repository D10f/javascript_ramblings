export default class Floor implements Terrain {

    static type = 'Floor';

    public readonly type: TerrainType;
    public readonly color: string;
    public readonly difficulty: number;
    public readonly texture: HTMLImageElement;

    constructor() {
        this.type = 'FLOOR';
        this.color = '#aaaaaa';
        this.difficulty = 1;
        this.texture = new Image();
        this.texture.src = 'desertHex.png'
    }
}
