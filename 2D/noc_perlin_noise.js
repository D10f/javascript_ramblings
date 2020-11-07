function setup() {
  createCanvas(400, 400);
  background(220);
  pixelDensity(1);
}

let noiseValue = 0.01;

function draw() {
  loadPixels();

  let yOffset = 0;
  for (let i = 0; i < width; i++) {

    let xOffset = 0;
    for (let j = 0; j < height; j++) {
      const index = (i + j * height) * 4;
      const r = noise(xOffset, yOffset) * 255;

      pixels[index + 0] = map(r, 40, 300, 0, 205);
      pixels[index + 1] = map(r, 100, 500, 0, 255);
      pixels[index + 2] = map(r, 50, 200, 0, 255);
      pixels[index + 3] = 255;

      xOffset += noiseValue;
    }
    yOffset += noiseValue;
  }
  updatePixels();
  noLoop();
}
