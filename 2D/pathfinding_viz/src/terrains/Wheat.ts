export default class Wheat implements Terrain {

    static type = 'Mountain';

    public readonly type: TerrainType;
    public readonly color: string;
    public readonly difficulty: number;
    public readonly texture: HTMLImageElement;

    constructor() {
        this.type = 'WHEAT';
        this.color = '#edd855';
        this.difficulty = 5;
        this.texture = new Image();
        this.texture.src = 'wheatHex.png';
    }
}
