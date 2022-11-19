let baseUrlPictures = ' https://oscaraccorsi.github.io/DeStael/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;

let img; 
let palette = [];
let pictureList = ['DeStael01.jpg', 
                   'DeStael02.jpg', 
                   'DeStael03.jpg', 
                   'DeStael04.jpg',
                   'DeStael05.jpg', 
                   'DeStael06.jpg', 
                   'DeStael07.jpg',  
                   'DeStael08.jpg', 
                   'DeStael09.png', 
                   'DeStael10.jpeg', 
                   'DeStael11.jpeg',
                   'DeStael12.jpg'];

let shapes = [];
let speed;

let quantity;
let howManyTime;
let spssr = [100, 150, 200, 250];

//--------------------------------------preload
function preload() {
  h = hour()%12;
  img = loadImage(baseUrlPictures +
                  pictureList[h]);
  logo = loadImage(baseURLImage + 
                   'good one white.png');
  console.log(pictureList[h]);
}

//--------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  quantity = round(random(2, 4));
  howManyTime = round(random(15, 60));
  speed = random(0.1, 1);
  spessore = random(spssr);
  
  
  setInterval(reloadPage, 1000*howManyTime);
  
//------------------------------------------------palette 
  img.resize(200, 0);
  img.loadPixels();
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let alpha = round(random(100, 200));
    let c = color(r, g, b, 100);
    palette.push(c);    
  }
  
  for (let i = 0; i < quantity; i++) {
    shapes[i] = {
      x: random(width),
      y: random(height),
      x1: random(width),
      y1: random(height),
      x2: random(width),
      y2: random(height),
      x3: random(width),
      y3: random(height),
      speedX: random(-speed, speed),
      speedY: random(-speed, speed),
      col: random(palette)
    };
  }
 
}

//--------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------------DRAW
function draw() {
  background(0, 0, 240);
      
  strokeCap(SQUARE);
  
  noFill();
  strokeWeight(spessore);
  
  
  for (b of shapes) { 
    stroke(b.col); 
    bezier(b.x, b.y, b.x1, b.y1, b.x2, b.y2, b.x3, b.y3);
    
    b.x += b.speedX;
    b.y += b.speedY;
    // b.x1 += b.speedX;
    // b.y1 += b.speedY;
    // b.x2 += b.speedX;
    // b.y2 += b.speedY;
    b.x3 += b.speedX;
    b.y3 += b.speedY;

    if (b.x < 0 || b.x > width || b.x3 < 0 || b.x3 > width) {
      b.speedX = -b.speedX;
    }
    if (b.y < 0 || b.y > height || b.x3 < 0 || b.x3 > height) {
      b.speedY = -b.speedY;
    }
  }
}
//----------------------------------reLoad
function reloadPage() {
   window.location.reload();
}
function mousePressed() {
  imageMode(CENTER);
  let xLogo = windowWidth-40;
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200);
  imageMode(CORNER);
  save();  
}
