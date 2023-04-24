export default class Mountain implements Terrain {

    static type = 'Mountain';

    public readonly type: TerrainType;
    public readonly color: string;
    public readonly difficulty: number;
    public readonly texture: HTMLImageElement;

    constructor() {
        this.type = 'MOUNTAIN';
        this.color = '#ffaaaa';
        this.difficulty = 5;
        this.texture = new Image();
        this.texture.src = 'clayHex.png';
    }
}
