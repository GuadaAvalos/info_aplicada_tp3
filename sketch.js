let nave;
let jugador; 

function preload () {
  nave = loadImage('images/nave.png')
}
function setup() {
  createCanvas(600, 600);
  jugador = new MovNave (60, 60);
}

function draw() {
  background(7, 25, 82);
  jugador.show();
}

class MovNave {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  
  show () {
    if (mouseX - 30 < 0)
      {
        image(nave, 0, height - 50, this.x, this.y);
      }
    else if (mouseX - 30 > width)
      {
        image(nave,width - this.x, height-50, this.x, this.y);
      }
    else
      {
        image(nave, mouseX-30, height-50, this.x, this.y);
      }
  }

}