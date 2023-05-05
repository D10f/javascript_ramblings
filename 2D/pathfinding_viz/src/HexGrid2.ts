import Hexagon from "./Hexagon";
import Terrain from "./Terrain";
import { ROWS, COLS, HEX_OFFSET_X, HEX_OFFSET_Y, HEX_WIDTH, TERRAIN_TYPE_IMG_TABLE } from "./defs";

export default class HexGrid {

    private grid: Hexagon[][];

    constructor(private map: number[][]) {
        this.grid = this.createGrid();
    }

    private createGrid() {

        const grid: Hexagon[][] = [];

        for (let i = 0; i < ROWS; i++) {

            const row: Hexagon[] = [];

            for (let j = 0; j < COLS; j++) {
                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);

                const hex = new Hexagon({
                    x,
                    y,
                    col: i,
                    row: j,
                });

                row.push(hex);
            }

            grid.push(row);
        }

        return grid;
    }

    generateTerrain() {
        const terrainTypes = Object.keys(TERRAIN_TYPE_IMG_TABLE);
        return this.grid.flat().map(hex => {

            let mapIdx = this.map[hex.col][hex.row];

            if (mapIdx > 20) mapIdx -= 20;
            else if (mapIdx > 10) mapIdx -= 10;

            return new Terrain({
                x: hex.x,
                y: hex.y,
                col: hex.col,
                row: hex.row,
                terrainType: terrainTypes[mapIdx] as TerrainType
            });
        });
    }

    generateEndpoints() {
        let startHex = new Hexagon({ x: 0, y: 0, id: 'START', image: 'startHex.png' });
        let targetHex = new Hexagon({ x: 0, y: 0, id: 'END', image: 'endHex.png' });

        this.grid.flat().forEach((hex) => {
            let mapIdx = this.map[hex.col][hex.row];
            if (mapIdx > 20) {
                targetHex.x = hex.x;
                targetHex.y = hex.y;
            } else if (mapIdx > 10) {
                startHex.x = hex.x;
                startHex.y = hex.y;
            }
        });

        return [ startHex, targetHex ];
    }
}
