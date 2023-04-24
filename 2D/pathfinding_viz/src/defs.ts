export const ALLOW_DIAGONAL = false;
export const CELL_SIZE = 30;
// export const COLS = Math.floor(800 / CELL_SIZE);
// export const ROWS = Math.floor(640 / CELL_SIZE);

export const HEX_WIDTH = 30;
export const HEX_SIZE = HEX_WIDTH / Math.sqrt(3);
export const HEX_OFFSET_X = HEX_WIDTH;
export const HEX_OFFSET_Y = HEX_SIZE * 1.5;

export const COLS = Math.floor(800 / HEX_WIDTH);
export const ROWS = Math.floor(640 / HEX_OFFSET_Y);
