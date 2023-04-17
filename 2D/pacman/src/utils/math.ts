// https://github.com/processing/p5.js/blob/v1.6.0/src/math/calculation.js#L71
export const constrain = (n: number, high: number, low: number) => {
    return Math.max(Math.min(n, high), low);
};

export const taxicabDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

export const euclidianDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

export const randomInt = (min: number, max: number) => {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min)) + min;
};
