function setup() {
    createCanvas(windowWidth / 1.5, windowWidth / 3);
}
let radius = 2;
let ocean = 0.55;


let seed = Math.floor(Math.random() * 1e10);
let origin = [radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1, radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1, radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1];

function draw() {

    noiseSeed(seed);
    noiseDetail(6, 0.5);
    background(220);
    for (let p = 0; p < height; p++) {
        let phi = (height - p) / height * Math.PI - Math.PI / 2;
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
    updatePixels();

    make_stats();
    noLoop();
}

function initialize() {
    radius = Math.abs(document.getElementById("radius_value").value);
    seed = Math.floor(document.getElementById("seed_value").value);
    if (seed == 0) {
        seed = Math.floor(Math.random() * 1e10);
    }
    ocean = document.getElementById("ocean_value").value;
    if (ocean < 0) {
        ocean = 0;
    } else if (ocean > 1) {
        ocean = 1;
    }
    let origin_x = Math.abs(document.getElementById("origin_x").value);
    if (origin_x == 0) {
        origin_x = radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1;
    }
    let origin_y = Math.abs(document.getElementById("origin_y").value);
    if (origin_y == 0) {
        origin_y = radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1;
    }
    let origin_z = Math.abs(document.getElementById("origin_z").value);
    if (origin_z == 0) {
        origin_z = radius * (Math.random() * 2 + 2) + Math.random() * 2 - 1;
    }
    origin = [origin_x, origin_y, origin_z];

    redraw();
}

function make_stats() {
    document.getElementById("stats").innerHTML = "";
    let table = `<table> 
                <tr> <th> Planet Radius </th> <td> ${radius} </td> </tr>
                <tr> <th> Seed </th> <td> ${seed} </td> </tr>
                <tr> <th> Origin X </th> <td> ${origin[0]} </td> </tr>
                <tr> <th> Origin Y </th> <td> ${origin[1]} </td> </tr>
                <tr> <th> Origin Y </th> <td> ${origin[2]} </td> </tr>
                <tr> <th> Sea Height </th> <td> ${ocean} </td> </tr>`
    document.getElementById("stats").innerHTML += table;
}
