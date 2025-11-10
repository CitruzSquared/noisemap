function setup() {
  createCanvas(800, 400);
}
let radius = 2;
let ocean = 0.55;
  
  
let seed = Math.floor(Math.random() * 1e10);
let origin = [radius*(Math.random() * 2 + 2) + Math.random() * 2 - 1, radius*(Math.random() * 2 + 2) + Math.random() * 2 - 1, radius*(Math.random() * 2 + 2) + Math.random() * 2 - 1];

function draw() {
  
  noiseSeed(seed);
  noiseDetail(6, 0.5);
  background(220);
  for (let p = 0; p < height; p++) {
    let phi = (height - p) / height * Math.PI - Math.PI/2;
    for (let t = 0; t < width; t++) {
      let theta = (t / width) * Math.PI * 2 - Math.PI;
      let x = radius * Math.cos(phi) * Math.cos(theta) + origin[0];
      let y = radius * Math.cos(phi) * Math.sin(theta) + origin[0];
      let z = radius * Math.sin(phi) + origin[0];
      let n = noise(x, y, z);
      let c;
      if (n > ocean) {
        c = color(166, 217, 121);
      } else {
        c = color(71, 116, 179);
      }
      set(t, p, c);
    }
  }
  console.log(seed);
  console.log(origin);
  updatePixels();
  noLoop();
}
