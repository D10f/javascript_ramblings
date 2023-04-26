import Hexagon from './Hexagon';
import { HEX_SIZE } from './defs';
import terrains from './Terrain';

export default class Brush {

    private selected: string;
    private buttons: HTMLButtonElement[];
    public overlay: Hexagon;

    constructor(private canvas: HTMLCanvasElement) {
        this.selected = '';
        this.buttons = this.createButtons();
        // this.overlay = new Hexagon(
        //     0, 0, HEX_SIZE, 0, 0,
        //     new Terrain('WATER', '#fff', Infinity, '')
        // );
        this.overlay = new Hexagon(0, 0, HEX_SIZE);
        this.appendButtons();
        this.createEndpointButtons();
        this.createListeners();
    }

    stroke(hex: Hexagon) {
        if (!this.selected) return;
        this.overlay.x = -100;
        this.overlay.y = -100

        //@ts-ignore
        hex.terrain = terrains[this.selected];
    }

    hover(hex: Hexagon) {
        // if (!this.selected || this.selected === hex.terrain.type) return;
        this.overlay.x = hex.x;
        this.overlay.y = hex.y;
    }

    private createListeners() {
        window.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;
            if (!target || !target.getAttribute('terrain-type')) return;
            this.selected = target.getAttribute('terrain-type') as string;

            this.buttons.forEach((button) => {
                button.style.filter = 'grayscale(1)';
            });

            target.style.filter = 'grayscale(0)';
        });
    }

    private appendButtons() {
        // const wrapper = document.createElement('div') as HTMLDivElement;
        // wrapper.style.display = 'flex';
        // wrapper.style.gap = '10px';
        // wrapper.style.padding = '10px';

        const edgeTilesWrapper = this.createWrapper();
        const edgeTilesButtons = this.createEndpointButtons();
        edgeTilesButtons.forEach(b => edgeTilesWrapper.appendChild(b));
        this.canvas.insertAdjacentElement('afterend', edgeTilesWrapper);

        const terrainTilesWrapper = this.createWrapper();
        this.buttons.forEach(b => terrainTilesWrapper.appendChild(b));
        this.canvas.insertAdjacentElement('afterend', terrainTilesWrapper);
    }

    private createWrapper() {
        const wrapper = document.createElement('div') as HTMLDivElement;
        wrapper.style.display = 'flex';
        wrapper.style.gap = '10px';
        wrapper.style.padding = '10px';
        return wrapper;
    }

    private createButtons() {
        const buttons = [];
        for (const terrain of Object.values(terrains)) {
            const button = document.createElement('button') as HTMLButtonElement;
            button.style.filter = 'grayscale(1)';
            button.setAttribute('terrain-type', terrain.type);

            const img = document.createElement('img');
            img.src = terrain.texture.src;
            img.style.pointerEvents = 'none';

            button.appendChild(img);
            // button.textContent = terrain.type;
            buttons.push(button);
        }
        return buttons;
    }

    private createEndpointButtons() {
        const buttons = [];

        const button = document.createElement('button') as HTMLButtonElement;
        button.style.filter = 'grayscale(1)';
        button.setAttribute('terrain-type', 'start');

        const img = document.createElement('img');
        img.src = 'start.png';
        img.style.pointerEvents = 'none';

        button.appendChild(img);
        // button.textContent = terrain.type;
        buttons.push(button);

        return buttons;
    }
}
