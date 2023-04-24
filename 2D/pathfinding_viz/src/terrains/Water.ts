export default class Water implements Terrain {

    static type = 'Water';

    public readonly type: TerrainType;
    public readonly color: string;
    public readonly difficulty: number;
    public readonly texture: HTMLImageElement;

    constructor() {
        this.type = 'WATER';
        this.color = '#3377cc';
        this.difficulty = Infinity;
        this.texture = new Image();
        this.texture.src = 'waterHex.png';
    }
}
