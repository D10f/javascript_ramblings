import Cell from './Cell';
import terrains from './terrains';

export default class Brush {

    private selected: string;
    private buttons: HTMLButtonElement[];

    constructor(private canvas: HTMLCanvasElement) {
        this.selected = '';
        this.buttons = this.createButtons();
        this.appendButtons();
        this.createListeners();
    }

    stroke(cell: Cell) {
        if (!this.selected) return;
        // @ts-ignore
        const terrain = new terrains[this.selected]() as Terrain;
        cell.terrain = terrain;
    }

    private createListeners() {
        window.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;
            if (!target || !target.getAttribute('terrain-type')) return;
            this.selected = target.getAttribute('terrain-type') as string;

            this.buttons.forEach((button) => {
                button.style.backgroundColor = '';
                button.style.color = '';
            });

            target.style.backgroundColor = 'coral';
            target.style.color = '#333';
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
            button.setAttribute('terrain-type', terrain.type);
            button.textContent = terrain.type;
            buttons.push(button);
        }
        return buttons;
    }
}
