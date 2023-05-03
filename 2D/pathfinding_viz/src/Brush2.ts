import HexGrid from "./HexGrid2";
import Hexagon from "./Hexagon2";
import Terrain from "./Terrain2";
import { ENDPOINT_TOKEN_IMG_TABLE, LAYERS, TERRAIN_TYPE_IMG_TABLE } from "./defs";

type SelectedHex = {
    type: TerrainType | FlagType;
    layer: number;
};

export default class Brush {

    // private selected: TerrainType | FlagType | null;
    // private currentLayer: LAYERS;
    private selected: SelectedHex | null;
    private middleLayer: Hexagon[];
    private topLayer: Hexagon[];
    private brush: Hexagon;
    private mousePressed: boolean;

    constructor(grid: HexGrid, canvas: HTMLCanvasElement, layers: Hexagon[][]) {
        this.selected = null;
        this.middleLayer = layers[0];
        this.topLayer = layers[1];
        // this.currentLayer = LAYERS.MIDDLE;
        this.brush = this.middleLayer[0];
        this.mousePressed = false;
        this.createUI(canvas);
        this.createListeners(grid, canvas);
    }

    update(hex: Hexagon) {
        this.brush.x = hex.x;
        this.brush.y = hex.y;
    }

    stroke(hex: Hexagon) {
        if (!this.selected) return;

        const { type, layer } = this.selected;

        switch (layer) {
            case LAYERS.MIDDLE:
                (hex as Terrain).setType(type as TerrainType);
                break;
            case LAYERS.TOP:
                const h = this.topLayer.find(h => h.id === type) as Hexagon;
                h.x = hex.x;
                h.y = hex.y;
                break;
        }

        // if (this.selected.type !== 'START' && this.selected.type !== 'END') {
        //     hex.setType(this.selected.type as TerrainType);
        // } else {
        //     const h = this.topLayer.find(h => h.id === this.selected!.type) as Hexagon;
        //     h.x = hex.x;
        //     h.y = hex.y;
        // }
    }

    private createListeners(grid: HexGrid, canvas: HTMLCanvasElement) {
        canvas.addEventListener('click', (e: MouseEvent) => {
            const hex = grid.getHex(e.x, e.y);
            this.stroke(hex);
        });

        canvas.addEventListener('mousedown', () => {
            this.mousePressed = true;
        });

        canvas.addEventListener('mouseup', () => {
            this.mousePressed = false;
        });

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.mousePressed) {
                const hex = grid.getHex(e.x, e.y);
                this.stroke(hex);
            };
        });
    }

    private createUI(canvas: HTMLCanvasElement) {

        const terrainRow = this.createRow();
        const terrainButtons = this.createTileControls(TERRAIN_TYPE_IMG_TABLE, 1);
        terrainButtons.forEach(b => terrainRow.appendChild(b));

        const endpointsRow = this.createRow();
        const endpointsButtons = this.createTileControls(ENDPOINT_TOKEN_IMG_TABLE, 2);
        endpointsButtons.forEach(b => endpointsRow.appendChild(b));

        canvas.insertAdjacentElement('afterend', endpointsRow);
        canvas.insertAdjacentElement('afterend', terrainRow);

        canvas.parentElement!.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;

            if (!target || !target.getAttribute('type')) return;

            // target.parentElement!.querySelectorAll('button').forEach(btn => {
            canvas.parentElement!.querySelectorAll('button').forEach(btn => {
                btn.style.filter = 'grayscale(1)';
                btn.style.border = '1px solid transparent';
            });

            target.style.filter = 'grayscale(0)';
            target.style.border = '1px solid coral';

            const layer = parseInt(target.getAttribute('layer')!);
            const type = target.getAttribute('type') as TerrainType | FlagType;

            this.selected = { layer, type };
        });
    }

    private createRow() {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '10px';
        row.style.padding = '10px';
        return row;
    }

    private createTileControls(tileset: TerrainTypeImageTable | FlagTypeImageTable, layer: 0 | 1 | 2) {
        const buttons = [];
        for (const [terrain, texture] of Object.entries(tileset)) {
            const button = document.createElement('button');
            button.style.filter = 'grayscale(1)';
            button.style.border = '1px solid transparent';
            button.style.background = 'none';
            button.setAttribute('type', terrain);
            button.setAttribute('layer', layer.toString());

            const img = document.createElement('img');
            img.src = texture;
            img.style.pointerEvents = 'none';

            button.appendChild(img);
            buttons.push(button);
        }
        return buttons;
    }
}
