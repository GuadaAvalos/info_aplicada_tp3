let gamestate;
let nave;
let jugador;
let balas = [];
let imgbala;
let enemy;
let enemigos = [];
let tiempoenemies = 1;
let puntos = 0;

function preload() {
  nave = loadImage("images/nave.png");
  imgbala = loadImage("images/bala.png");
  enemy = loadImage("images/enemie.png");
  inicio = loadImage("images/inicio.png");
}

function setup() {
  createCanvas(600, 600);
  jugador = new MovNave(60, 60);
  gamestate = "menu";
}

function draw() {
  background(7, 25, 82);
  textSize(20);
  strokeWeight(1);
  // textFont();
  fill(255);
  text("Puntos: " + puntos, 10, 30);

  if (gamestate == "menu") {
    image(inicio, 0, 0, 600, 600);
  }
  
  if (gamestate == "playing") {
    jugador.show();

    for (let i = 0; i < balas.length; i++) {
      // acualiza la posicion de la bala
      balas[i].update();
      // dibuja la bala
      balas[i].show();

      for (let j = 0; j < enemigos.length; j++) {
        let enemyHitbox = enemigos[j].enemyBox();

        if (balas[i].colision(enemyHitbox)) {
          balas.splice(i, 1);
          enemigos.splice(j, 1);
          puntos += 1;

          break;
        }
      }
    }

    //enemigos aleatorios cayendo desde arriba
    if (frameCount % (60 / tiempoenemies) == 0) {
      let nuevoenemigo = new Enemy(random(width - 50), -50, random(1, 4));
      enemigos.push(nuevoenemigo);
    }

    // Actualizar y mostrar los enemigos
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].update();
      enemigos[i].show();
    }

    //ver si algun enemigo toco el final
    let enemyend = false;
    
    for (let i = 0; i < enemigos.length; i++) {
      if (enemigos[i].gameover) {
        enemyend = true;
        break;
      }
    }
    
    if (enemyend) {
      gamestate = "gameover"
    }
    
  }
  
  if (gamestate == "gameover") {
     background(1, 22, 64);
    
     textSize(30);
    strokeWeight(1);
    fill(255);
    text("Game Over", width / 2 - 80, height / 2 - 10);
    text("Puntos: " + puntos, width / 2 - 60, height / 2 + 30);
    text("Presiona espacio para superar tu record!", 20, height / 2 + 100);
  }
  
}

function mouseClicked() {
  if (gamestate == "playing") {
    //inicializa la bala con coordenada X (siguiendo al mouseX) e Y (a -20px del borde de abajo) y a 10px de velocidad
    let bala = new Bala(mouseX, height - 50, 10);

    //almacena las balas clickeadas en el array balas
    balas.push(bala);
  }
  
}

function keyPressed () {
  if (gamestate == "menu" && key == " ") {
    gamestate = "playing"
  } else if (gamestate == "gameover" && key == " ") {
    puntos = 0;
    balas = [];
    enemigos = [];
    restartGame();
  }
}

function restartGame () {
  gamestate = "playing";
  tiempoenemies = 1;
}

class MovNave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    if (mouseX - 30 < 0) {
      image(nave, 0, height - 50, this.x, this.y);
    } else if (mouseX - 30 > width) {
      image(nave, width - 60, height - 50, this.x, this.y);
    } else {
      image(nave, mouseX - 30, height - 50, this.x, this.y);
    }
  }
}

class Bala {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.size = 20;
  }

  update() {
    // se resta el valor de this.velocity a la propiedad this.y, lo que mueve la bala hacia arriba en la pantalla.
    this.y -= this.velocity;
  }

  show() {
    // ellipse(this.x, this.y, this.size, this.size);
    image(
      imgbala,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    ); //Laser image
  }

  colision(hitBox) {
    let d = dist(
      this.x,
      this.y,
      hitBox.x + hitBox.width / 2,
      hitBox.y + hitBox.height / 2
    );

    if (d < (this.size + hitBox.width) / 2) {
      return true;
    }
  }

}

class Enemy {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.size = 30;
    this.gameover = false;
  }

  update() {
    this.y += this.velocity;
    
     if (this.y >= height) {
      this.gameover = true;
     }
  }

  show() {
    image(enemy, this.x, this.y, this.size, this.size);
  }

  enemyBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size,
    };
  }
  
  gameover () {
    
  }
}
