import Canvas from "../Canvas";
import { ENDPOINT_TOKEN_IMG_TABLE, TERRAIN_TYPE_IMG_TABLE } from "../defs";

export default class TilePicker extends HTMLElement {

    private tilePicker: HTMLElement | null;
    private tileButtons: HTMLButtonElement[];
    private canvasEl: HTMLCanvasElement | null;
    private canvas: Canvas | null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tilePicker = null;
        this.tileButtons = [];
        this.canvasEl = null;
        this.canvas = null;
        this.render();
    }

    attachEvents() {
        this.tilePicker!.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;

            if (!target || !target.getAttribute('type')) return;

            this.tileButtons.forEach(btn => {
                if (btn === target) {
                    target.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            this.canvas!.cursor.setTile(target.getAttribute('type') as TerrainType | FlagType);
        });
    }

    get styles() {
        return `
            <style>
                :host {
                    display: block;
                }
                .row {
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                }
                button {
                    filter: grayscale(1);
                    border: 1px solid transparent;
                    background: none;
                }
                button:hover {
                    border: 1px solid coral;
                }
                button.active {
                    filter: grayscale(0);
                    border: 1px solid coral;
                }
                img {
                    pointer-events: none;
                }
            </style>
        `;
    }

    render() {
        const shadowRoot = this.shadowRoot as ShadowRoot;

        shadowRoot.innerHTML = `
            ${this.styles}
            <canvas id="pathfinding" width="800" height="600"></canvas>
            <section class="tile-picker">

                <div class="row" slot="terrainTiles">
                    ${Object.entries(TERRAIN_TYPE_IMG_TABLE).map(([ terrain, img ]) => `
                        <button type="${terrain}" layer"">
                            <img src="${img}">
                        </button>
                    `).join('\n')}
                </div>

                <div class="row" slot="flagTiles">
                    ${Object.entries(ENDPOINT_TOKEN_IMG_TABLE).map(([ flag, img]) => `
                        <button type="${flag}" layer"">
                            <img src="${img}">
                        </button>
                    `).join('\n')}
                </div>

                <div class="row" slot="actionTiles"></div>
            </section>
        `;

        this.tilePicker = shadowRoot.querySelector('.tile-picker') as HTMLElement;
        this.tileButtons = Array.from(shadowRoot.querySelectorAll('button[type]')) as HTMLButtonElement[];

        this.canvasEl = shadowRoot.getElementById('pathfinding') as HTMLCanvasElement;
        this.canvasEl.width = 800;
        this.canvasEl.height = 600;

        this.canvas = new Canvas(this.canvasEl);
        this.canvas.init();

        this.attachEvents();
    }
}
