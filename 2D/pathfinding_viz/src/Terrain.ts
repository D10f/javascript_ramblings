export class Terrain {

    public texture: HTMLImageElement;

    constructor(
        public type: TerrainType,
        public color: string,
        public difficulty: number,
        imageSrc: string
    ) {
        this.texture = new Image();
        this.texture.src = imageSrc ?? '';
    }
}

export default {
    FLOOR: new Terrain('FLOOR', '', 1, 'desertHex.gif'),
    GRASS: new Terrain('GRASS', '', 2, 'sheepHex.gif'),
    MOUNTAIN: new Terrain('MOUNTAIN', '', 10, 'clayHex.gif'),
    WATER: new Terrain('WATER', '', Infinity, 'waterHex.gif'),
    WHEAT: new Terrain('WHEAT', '', 5, 'wheatHex.gif'),
    WOOD: new Terrain('WOOD', '', 10, 'woodHex.gif')
};

