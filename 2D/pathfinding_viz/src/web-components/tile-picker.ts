import Canvas from "../Canvas";
import { ENDPOINT_TOKEN_IMG_TABLE, TERRAIN_TYPE_IMG_TABLE } from "../defs";

export default class TilePicker extends HTMLElement {

    private tilePicker: HTMLElement | null;
    private tileButtons: HTMLButtonElement[];
    private actionButtons: HTMLButtonElement[];
    private canvas: Canvas | null;

    constructor() {
        super();
        this.tilePicker = null;
        this.tileButtons = [];
        this.actionButtons = [];
        this.canvas = null;

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    attachEvents() {
        this.tilePicker!.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;

            if (target.nodeName !== 'BUTTON') return;

            if (target.hasAttribute('type')) {
                this.toggleActiveButton(this.tileButtons, target);
                this.canvas!.cursor.setTile(target.getAttribute('type') as TerrainType | FlagType);
            } else if (target.hasAttribute('action')) {
                this.toggleActiveButton(this.actionButtons, target);
                this.canvas!.emitter.emit(target.getAttribute('action') as string);
            }

        });
    }

    toggleActiveButton(buttons: HTMLButtonElement[], active: HTMLButtonElement) {
        buttons.forEach(btn => {
            if (btn === active) {
                active.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
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
                    border: none;
                    background: none;
                }
                button:hover {
                    filter: grayscale(0);
                    cursor: pointer;
                    background-color: rgba(255,255,255,0.25);
                }
                button.active {
                    filter: grayscale(0);
                    background-color: rgba(255,255,255,0.25);
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

                <div class="row" slot="actionTiles">
                    <button action="play">
                        <img src="play.png">
                    </button>
                    <button action="pause">
                        <img src="pause.png">
                    </button>
                </div>
            </section>
        `;

        this.tilePicker = shadowRoot.querySelector('.tile-picker') as HTMLElement;
        this.tileButtons = Array.from(shadowRoot.querySelectorAll('button[type]')) as HTMLButtonElement[];
        this.actionButtons = Array.from(shadowRoot.querySelectorAll('button[action]')) as HTMLButtonElement[];

        const canvasEl = shadowRoot.getElementById('pathfinding') as HTMLCanvasElement;
        canvasEl.width = 800;
        canvasEl.height = 600;

        this.canvas = new Canvas(canvasEl);
        this.canvas.init();

        this.attachEvents();
    }
}
