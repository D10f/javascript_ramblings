import { CELL_SIZE, MAP, TILE_TYPE } from "../defs";
import { randomInt } from "../utils/math";
import GraphicComponent from "../components/GraphicComponent";
import CircleDrawingStrategy from "../components/GraphicStrategies/CircleDrawingStrategy";
import RectDrawingStrategy from "../components/GraphicStrategies/RectDrawingStrategy";
import PriorityQueue from "../lib/PriorityQueue";
import Vector from "../lib/Vector";
import Boundary from "../entities/Boundary";
import Food from "../entities/Food";
import Power from "../entities/Power";

class Grid {

    constructor(private readonly _entities: Entity[]) {
        this.createGrid();
    }

    get entities() {
        return this._entities;
    }

    private createGrid() {
        for (let i = 0; i < MAP.length; i++) {
            for (let j = 0; j < MAP[i].length; j++) {

                switch (MAP[i][j]) {
                    case TILE_TYPE.BOUNDARY:
                        this.entities.push(new Boundary(
                            j * CELL_SIZE,
                            i * CELL_SIZE,
                            new GraphicComponent(
                                new RectDrawingStrategy('#8CAAEE')
                            )
                        ));
                        break;

                    case TILE_TYPE.FOOD:
                        this.entities.push(new Food(
                            j * CELL_SIZE,
                            i * CELL_SIZE,
                            new GraphicComponent(
                                new CircleDrawingStrategy('#F2D5CF')
                            )
                        ));
                        break;

                    case TILE_TYPE.POWER:
                        this.entities.push(new Power(
                            j * CELL_SIZE,
                            i * CELL_SIZE,
                            new GraphicComponent(
                                new CircleDrawingStrategy('#F2D5CF')
                            )
                        ));
                        break;
                }
            }
        }
    }

    getShortestPath(start: Vector, end: Vector) {

        const openSet = new PriorityQueue<Vector>();
        openSet.enqueue({ value: start, priority: 0 });

        const cameFrom = new Map<string, string>();

        const gScore = new Map<string, number>();
        gScore.set(start.toString(), 0);

        const fScore = new Map<string, number>();
        fScore.set(start.toString(), start.distance(end));

        while (!openSet.isEmpty) {
            const current = openSet.dequeue() as Vector;

            if (current.distance(end) === 0) {
                const shortestPath: Vector[] = [];

                let previous = end.toString();
                while (cameFrom.get(previous)) {
                    previous = cameFrom.get(previous) as string;
                    const [x, y] = previous.split(',');
                    shortestPath.push(new Vector(parseInt(x), parseInt(y)));
                }

                shortestPath.unshift(end);
                return shortestPath;
            }

            for (const neighbour of this.getNeighbors(current)) {

                const neighbourKey = neighbour.toString();
                const tentativeGScore = (gScore.get(current.toString()) ?? 0) + 1;

                if (!gScore.has(neighbourKey) || tentativeGScore < (gScore.get(neighbourKey) as number)) {
                    const neighbourScore = tentativeGScore + neighbour.distance(end);
                    cameFrom.set(neighbourKey, current.toString());
                    gScore.set(neighbourKey, tentativeGScore);
                    fScore.set(neighbourKey, neighbourScore);

                    if (!openSet.contains(neighbour)) {
                        openSet.enqueue({ value: neighbour, priority: neighbourScore });
                    }
                }
            }
        }

        return [];
    }

    getNeighbors(v: Vector) {
      const top = new Vector(v.x, v.y - CELL_SIZE);
      const right = new Vector(v.x + CELL_SIZE, v.y);
      const bottom = new Vector(v.x, v.y + CELL_SIZE);
      const left = new Vector(v.x - CELL_SIZE, v.y);
      return [top, right, bottom, left].filter(v => this.getTileAt(v) !== 5);
    }

    getRandomNeighbour(v: Vector) {
      const neighbours = this.getNeighbors(v);
      const randomIdx = randomInt(0, neighbours.length);
      return neighbours[randomIdx];
    }

    getTileAt(v: Vector) {
      const { x, y } = this.getCoordinates(v);
      return MAP[y][x];
    }

    getNormalizedVector(v: Vector) {
        const { x, y } = this.getCoordinates(v);
        return new Vector(x * CELL_SIZE, y * CELL_SIZE);
    }

    getCoordinates(v: Vector) {
      const x = Math.floor(v.x / CELL_SIZE);
      const y = Math.floor(v.y / CELL_SIZE);
      return { x, y };
    }
}

export default Grid;
