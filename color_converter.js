/**
* Convert a decimal integet to it's hexadecimal representation
* @param  {number} n number in decimal notation
* @return {number} number in hexadecimal notation
*/
const hexToDecimal = n => {
  return parseInt(n, 16);
};


/**
* Convert RGB color code to it's hexadecimal representation
* @param  {string} hexCode A color hex code, with or without it's hash prefix
* @return {string} A string with the rgb color e.g., rgb(135, 20, 55)
*/
const hexToRgb = hexCode => {
  const i = hexCode.length === 6 ? 0 : 1;
  const r = hexCode.slice(i, i + 2);
  const g = hexCode.slice(i + 2, i + 4);
  const b = hexCode.slice(i + 4, i + 6);

  return `rgb(${hexToDecimal(r)}, ${hexToDecimal(g)}, ${hexToDecimal(b)})`;
};


/**
* Convert RGB color code to it's hexadecimal representation
* @param  {string, number, array}  r The red component or a full array
* @param  {string, number}         g The green component
* @param  {string, number}         b The blue component
* @return {string}                 A string with the hexcode e.g., #0C56B1
*/
const rgbToHex = (r, g, b) => {
  const hexValues = '0123456789ABCDEF';
  const hexResult = [];
  let rgbCode;

  if (r === undefined) {
    return 'Invalid RGB code provided';
  }

  if (typeof r !== 'object' && (!g === undefined || !b === undefined)) {
    return 'Invalid RGB code provided'
  } else if (typeof r === 'object') {
    rgbCode = r.join(',')
  } else {
    rgbCode = `${r},${g},${b}`;
  }

  const colorCodes = rgbCode.matchAll(/\d{1,3}/g);

  for ([color] of colorCodes) {

    colorCode = parseInt(color, 10);

    if (colorCode < 0 || colorCode > 255) {
      return 'Invalid RGB code provided';
    }

    const temp = [];

    for (let quotient = 1; quotient > 0; colorCode = quotient) {
      quotient        = Math.floor(parseInt(colorCode, 10) / 16);
      const remainder = colorCode % 16;
      const hexCode   = hexValues[remainder % 16];
      temp.unshift(hexCode);
    }

    if (temp.length < 2) {
      temp.unshift(0);
    }
    hexResult.push(temp.join(''));
  }

  return `#${hexResult.join('')}`;
};
