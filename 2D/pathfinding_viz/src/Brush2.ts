import Hexagon from "./Hexagon2";
import Terrain from "./Terrain2";
import { ENDPOINT_TOKEN_IMG_TABLE, TERRAIN_TYPE_IMG_TABLE } from "./defs";

export default class Brush {

    private selected: TerrainType | FlagType | null;
    private brush: Hexagon;

    constructor(private middleLayer: Hexagon[], private topLayer: Hexagon[]) {
        this.selected = 'END';
        this.brush = middleLayer[0];
    }

    update(hex: Hexagon) {
        this.brush.x = hex.x;
        this.brush.y = hex.y;
    }

    stroke(hex: Terrain) {
        if (!this.selected) return;

        if (this.selected !== 'START' && this.selected !== 'END') {
            hex.setType(this.selected as TerrainType);
        } else {
            const h = this.topLayer.find(h => h.id === this.selected) as Hexagon;
            h.x = hex.x;
            h.y = hex.y;
        }
    }
}
