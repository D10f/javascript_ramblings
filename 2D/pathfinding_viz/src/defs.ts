// export const ALLOW_DIAGONAL = false;
// export const CELL_SIZE = 30;
// export const COLS = Math.floor(800 / CELL_SIZE);
// export const ROWS = Math.floor(640 / CELL_SIZE);

export const HEX_WIDTH = 55;
export const HEX_SIZE = HEX_WIDTH / Math.sqrt(3);
export const HEX_OFFSET_X = HEX_WIDTH;
export const HEX_OFFSET_Y = HEX_SIZE * 1.5;

export const COLS = Math.ceil(800 / HEX_WIDTH);
// export const ROWS = Math.floor(640 / HEX_OFFSET_Y);
export const ROWS = COLS;

// export const COLS = 30;
// export const ROWS = 30;

export const ENDPOINT_TOKEN_IMG_TABLE: FlagTypeImageTable = {
    START: 'startHex.png',
    END: 'endHex.png',
    // ERROR: 'errorHex.png'
};

export const TERRAIN_TYPE_IMG_TABLE: TerrainTypeImageTable = {
    DESERT: 'desertHex.gif',
    GRASS: 'grassHex.gif',
    MOUNTAIN: 'mountainHex.gif',
    ORE: 'oreHex.gif',
    WATER: 'waterHex.gif',
    WHEAT: 'wheatHex.gif',
    WOOD: 'woodHex.gif',
};

export const TERRAIN_TYPE_DIFFICULTY_TABLE: TerrainTypeDifficultyTable = {
    DESERT: 5,
    GRASS: 1,
    MOUNTAIN: 10,
    ORE: 8,
    WATER: Infinity,
    WHEAT: 3,
    WOOD: 7,
};

export const HEXAGON_RELATIVE_POSITION_MODIFIER = {
    // even rows (0) odd rows (1)
    RIGHT: [[+1,  0], [+1,  0]],
    TOP_RIGHT: [[ 0, -1],  [+1, -1]],
    TOP_LEFT: [[-1, -1], [ 0, -1]],
    LEFT: [[-1,  0], [-1,  0]],
    BOTTOM_LEFT: [[-1, +1], [ 0, +1]],
    BOTTOM_RIGHT: [[ 0, +1], [+1, +1]],
};

export enum LAYERS {
    TERRAIN,
    MIDDLE,
    TOP
};

export const map = [
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,1,1,1,1,1,1,1,1,1,1,1,1,4,4],
    [4,1,1,1,1,1,1,1,1,1,1,1,1,4,4],
    [4,1,1,1,1,1,1,3,1,1,1,1,1,4,4],
    [4,1,1,1,1,3,3,1,3,3,1,1,1,4,4],
    [4,1,1,1,1,3,3,1,1,3,1,3,1,4,4],
    [4,1,1,1,3,1,1,1,1,3,1,3,1,4,4],
    [4,1,1,1,3,1,1,1,1,3,1,3,1,4,4],
    [4,1,1,1,3,1,1,1,1,1,3,1,1,4,4],
    [4,1,1,1,3,1,1,1,1,3,3,1,1,4,4],
    [4,1,1,1,3,1,1,1,1,3,1,1,1,4,4],
    [4,1,1,1,3,1,1,3,3,1,1,1,1,4,4],
    [4,1,1,1,3,3,3,1,3,1,1,1,1,4,4],
    [4,1,1,1,1,1,1,1,1,1,1,1,1,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];

