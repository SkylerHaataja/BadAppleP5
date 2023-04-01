// Controls
// left click canvas: randomize colors
// scroll on canvas: zoom in and out
// press 's': change shape

let zoom1 = 20;
let minZoom = 8;
let maxZoom = 100;
let vid;
let playing = true;
let pix;
let shape = 0;
let fillC;
let isPlaying = 0;

function setup() {
  if (window.innerWidth < window.innerHeight) {
    createCanvas(window.innerWidth, window.innerWidth * (3 / 4));
    zoom1 *= width / 400;
    minZoom *= width / 400;
    maxZoom *= width / 400;
  } else {
    createCanvas(window.innerHeight * (4 / 3), window.innerHeight);
    zoom1 *= height / 400;
    minZoom *= height / 400;
    maxZoom *= height / 400;
  }
  fillC = color(256, 256, 256);
  // noCanvas();

  vid = createVideo("TouhouBadApple_compressed.mp4");
  vid.size(width, height);
  vid.volume(0.01);
  vid.hide();

  loadPixels();
}

function draw() {
  background("#1c1c1c");
  if(isPlaying){
    let gridSize = int(zoom1);
    vid.loadPixels();
    for (let y = 0; y < vid.height; y += gridSize) {
      for (let x = 0; x < vid.width; x += gridSize) {
        // at the current position, get the red
        // value (an approximation for brightness)
        // and use it to create the diameter
        let index = (y * vid.width + x) * 4;
        let r = vid.pixels[index];
        let dia = map(r, 0, 255, gridSize, 2);

        // draw a circle at the current location
        // using the diameter we calculated
        fill(fillC);
        noStroke();
        if (shape == 0) circle(x + gridSize / 2, y + gridSize / 2, dia);
        else if (shape == 1) {
          rect(x + gridSize / 2 - dia / 2, y + gridSize / 2 - dia / 2, dia, dia);
        } else if (shape == 2) {
          let tx = x + gridSize / 2 - dia / 2;
          let ty = y + gridSize / 2 + dia / 2;
          triangle(
            tx,
            ty,
            tx - dia * cos(30) * 3,
            ty + dia * sin(60) * 3,
            tx + dia * cos(30) * 3,
            ty + dia * sin(60) * 3
          );
        }
      }
    }
  }
  else{
    stroke(256);
    fill(256);
    textSize(width / 10);
    text("CLICK TO START", width/2, height/2);
    textAlign(CENTER, CENTER);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    shape++;
    if (shape > 2) {
      shape = 0;
    }
  }
  if (keycode == 189) zoom1 -= 10;

  if (keycode == 187) zoom1 += 10;
}

function mouseClicked() {
  if(!isPlaying){
    isPlaying = true;
    vid.play();
  }
    
  fillC = color(random(0, 256), random(0, 256), random(0, 256));
}

// function mouseWheel(event) {
//   zoom1 -= event.delta / 100;
//   if (zoom1 < minZoom) zoom1 = minZoom;
//   else if (zoom1 > maxZoom) zoom1 = maxZoom;
// }
