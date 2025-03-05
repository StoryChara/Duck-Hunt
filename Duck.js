class Duck {
  constructor() {
    this.size = 65;
    this.image = random([duck.diagonal, duck.lado]);
    this.state = "flying"; 
    this.shotTime = 0; 
    this.missed = false; // Nuevo atributo para saber si el pato escapó
    this.sfx = music.sfx_duck;

    // Generar posición inicial en las esquinas inferiores o el borde inferior
    let spawnPoint = floor(random(3)); // 0: esquina inferior izquierda, 1: esquina inferior derecha, 2: borde inferior
    if (spawnPoint === 0) { // Esquina inferior izquierda
      this.x = -this.size;
      this.y = height + this.size;
      this.speedX = random(1, 3) * speedMultiplier; // Moverse hacia la derecha
    } else if (spawnPoint === 1) { // Esquina inferior derecha
      this.x = width + this.size;
      this.y = height + this.size;
      this.speedX = random(-3, -1) * speedMultiplier; 
    } else if (spawnPoint === 2) { 
      this.x = random(width);
      this.y = height + this.size;
      this.speedX = random(-1, 1) * speedMultiplier; 
    }
    this.speedY = random(-3, -1) * speedMultiplier; 
  }

  update() {
    if (this.state === "flying") {
      this.x += this.speedX;
      this.y += this.speedY;
    } else if (this.state === "shot") {
      if (millis() - this.shotTime > 500) { 
        this.state = "falling";
        this.speedX = 0; 
        this.speedY = 4; // Caer verticalmente
      }
    } else if (this.state === "falling") {
      this.y += this.speedY;
    }
  }

  display() {
    imageMode(CENTER);
    if (this.state === "flying") {
      if (this.speedX >= 0) {
        image(this.image, this.x, this.y, this.size, this.size);
      } else {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        scale(-1, 1);
        image(this.image, 0, 0, this.size, this.size);
        pop();
      }

    } else if (this.state === "shot") {
      image(duck.disparo, this.x, this.y, this.size, this.size);
    } else if (this.state === "falling") {
      image(duck.caida, this.x, this.y, this.size, this.size);
    }
  }

  isOffScreen() {
    return this.y < -this.size || this.y > height + this.size || this.x < -this.size || this.x > width + this.size;
  }

  isHit(px, py) {
    return this.state === "flying" && dist(px, py, this.x, this.y) < this.size / 2;
  }

  getShot() {
    this.state = "shot";
    this.shotTime = millis(); 
    this.sfx.play();
  }
}
