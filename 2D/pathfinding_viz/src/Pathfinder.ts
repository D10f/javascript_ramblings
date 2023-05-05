import HexGrid from "./HexGrid2";
import Hexagon from "./Hexagon";
import PriorityQueue from "./PriorityQueue";
import Terrain from "./Terrain";
import { HEX_SIZE } from "./defs";

export default class Pathfinder {

    private iterator: Generator<unknown, Map<Hexagon, Hexagon>>;

    constructor(grid: HexGrid, start: Hexagon, end: Hexagon) {
        this.iterator = this.getShortestPath(grid, start, end);
    }

    next() {
        return this.iterator.next();
    }

    private *getShortestPath(grid: HexGrid, start: Hexagon, end: Hexagon) {

        const openSet = new PriorityQueue<Hexagon>();
        openSet.enqueue({ value: start, priority: 0 });

        const cameFrom = new Map<Hexagon, Hexagon>();

        const gScore = new Map<string, number>();
        gScore.set(start.id, 0);

        const fScore = new Map<string, number>();
        fScore.set(start.id, grid.getDistance(start, end));

        while (!openSet.isEmpty) {

            const current = openSet.dequeue() as Hexagon;

            if (current === end) {
                return cameFrom;
            }

            for (const neighbor of grid.getNeighbors(current)) {

                const currentGScore = gScore.get(neighbor.id) ?? Infinity;
                const tentativeGScore = (
                    gScore.get(current.id) as number
                    // + neighbor.terrain.difficulty * HEX_SIZE
                    + (neighbor as Terrain).difficulty * HEX_SIZE
                    + grid.getDistance(current, neighbor)
                );

                if (tentativeGScore < currentGScore) {
                    const neighborFScore = tentativeGScore + grid.getDistance(neighbor, end);
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor.id, tentativeGScore);
                    fScore.set(neighbor.id, neighborFScore);

                    if (!openSet.contains(neighbor)) {
                        openSet.enqueue({ value: neighbor, priority: neighborFScore });
                        if (neighbor === end) {
                            return cameFrom;
                        }
                        yield neighbor;
                    }
                }
            }
        }

        return cameFrom;
    }
}

