function start_game() {
  push();
    background(0, 0, 0);
    fill(255);
    textFont(font.Duck);
    textAlign(CENTER, CENTER);
    fill(255); stroke(0); strokeWeight(0); textSize(width / 14); // 70% larger
    text("CLICK to Start", (width / 2), (height / 2));
  pop();
}

function menu_intro() {  
  push();
    imageMode(CORNER);
    image(scenarios.start, 0, 0, width, height); // Adjust image size to canvas
    fill(255);
    textFont(font.Pixel);
    textAlign(CENTER, CENTER);
    fill(234, 158, 34); stroke(0); strokeWeight(8.5); textSize(height /20); // 70% larger
    text("Press SPACE to continue", (width / 2), ((3 * height) / 4) + 42.5); // 70% larger
  pop();
}

function menu_game() {
  push();
    background(99, 173, 255);

    // Dibujar los patos 
    for (let i = ducks.length - 1; i >= 0; i--) {
      ducks[i].update();
      ducks[i].display();
      if (ducks[i].isOffScreen()) {
        if (ducks[i].state === "flying") {
          score -= 100; // Penalización si el pato escapa
          missedDucks++; // Increment missed ducks counter
        }
        ducks.splice(i, 1); 
      }
    }

    imageMode(CORNER);
    image(scenarios.game, 0, 0, width, height); // Adjust image size to canvas

    imageMode(CENTER);
    noCursor();
    image(crosshair, mouseX, mouseY, 51, 51); // 70% larger

    if (missedDucks >= 3) { // Condición para perder
      menu = "GameOver";
    }

    // Mostrar el puntaje
    fill(255);
    textFont(font.Pixel);
    textSize(40.8); // 70% larger
    textAlign(RIGHT, TOP);
    text(`Score: ${score}`, width - 34, 34); // 70% larger

    // Mostrar los disparos restantes
    textAlign(LEFT, TOP);
    text(`Shots: ${shots}`, 34, 34); // 70% larger

    // Mostrar los patos que se han volado
    textAlign(LEFT, BOTTOM);
    text(`Missed Ducks: ${missedDucks}`, 34, height - 34); // 70% larger

    if (ducks.length < maxDucks && !ducks.some(duck => duck.state === "shot" || duck.state === "falling")) {
      if (dogState === "idle" ) {
        spawnDuck();
      } else {
        showDog();
      }
    }

    // Aumentar la velocidad de los patos con el tiempo
    gameTime += deltaTime / 1000; 
    if (gameTime > 10) {
      speedMultiplier += 0.3; 
      gameTime = 0; 
    }
  pop();
}

function showDog() {
  push();
    imageMode(CENTER);
    if (dogState === "laughing") {
      image(dog.laugh, width / 2, height / 2, 200, 200); // Ajustar tamano perro riendose
    } else if (dogState === "showing") {
      image(dog.found, width / 2, height / 2, 200, 200); // tamano y perro mostrando patos
    }
    dogTime += deltaTime / 1000;
    if (dogTime > 2) { // Show dog for 2 seconds
      dogState = "idle";
      dogTime = 0;
    }
  pop();
}

function gameOverScreen() {
  push();
    background(0, 0, 0, 150); // Semi-transparent background
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 510, 340); // 70% larger

    fill(0);
    textFont(font.Pixel);
    textAlign(CENTER, CENTER);
    textSize(40.8); // 70% larger
    text(`Game Over\nScore: ${score}`, width / 2, height / 2 - 90); // Move score up

    fill(234, 158, 34);
    rect(width / 2, height / 2 + 100, 200, 50); // Adjust button size and position
    fill(0);
    textSize(20.4); // 50% of the score text size
    text("Restart", width / 2, height / 2 + 100); // Adjust button text
    cursor(ARROW); // Show the mouse cursor
  pop();
}