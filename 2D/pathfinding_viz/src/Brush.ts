import Hexagon from './Hexagon';
import { HEX_SIZE } from './defs';
import terrains, { Terrain } from './terrains';

export default class Brush {

    private selected: string;
    private buttons: HTMLButtonElement[];
    public overlay: Hexagon;

    constructor(private canvas: HTMLCanvasElement) {
        this.selected = '';
        this.buttons = this.createButtons();
        this.overlay = new Hexagon(
            0, 0, HEX_SIZE, 0, 0,
            new Terrain('WATER', '#fff', Infinity, '')
        );
        this.appendButtons();
        this.createListeners();
    }

    stroke(hex: Hexagon) {
        if (!this.selected) return;
        this.overlay.x = -10;
        this.overlay.y = -10;

        //@ts-ignore
        hex.terrain = terrains[this.selected];
    }

    tint(hex: Hexagon) {
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
        const wrapper = document.createElement('div') as HTMLDivElement;
        wrapper.style.display = 'flex';
        wrapper.style.gap = '10px';
        wrapper.style.padding = '10px';
        this.buttons.forEach(b => wrapper.appendChild(b));
        this.canvas.insertAdjacentElement('afterend', wrapper);
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
}
