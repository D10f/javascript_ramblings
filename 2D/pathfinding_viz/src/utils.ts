/**
 * Constrains the value to be between the min and max numbers.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}

/**
 * Calculates the distance between two points.
 */
export const taxicabDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Calculates the distance between two points.
 */
export const euclidianDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

/**
 * Calculates the angle, in radians, between two points.
 */
export const angleBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1);
};

/**
 * Generates a random integer between min and (up to but not including) max.
 */
export const randomInt = (min: number, max: number) => {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Selects a random item from the array
 */
export const randomItem = (arr: any[]) => {
    return arr[randomInt(0, arr.length)];
};

/**
 * Draws a straight line between two Hexagons
 */
export const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.strokeStyle = '#303446';
    ctx.stroke();
}
