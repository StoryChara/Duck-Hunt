function start_game() {
  push();
    background(0, 0, 0);
    fill(255);
    textFont(font.Duck);
    textAlign(CENTER, CENTER);
    fill(255); stroke(0); strokeWeight(0); textSize(width/15);
    text("CLICK to Start", (width / 2), (height/2));
  pop();
}

function menu_intro() {  
  push();
    imageMode(CORNER);
    image(scenarios.start, 0, 0);
    fill(255);
    textFont(font.Pixel);
    textAlign(CENTER, CENTER);
    fill(234, 158, 34); stroke(0); strokeWeight(5); textSize(height / 30);
    text("Press SPACE to continue", (width / 2), ((3 * height) / 4) + 25);
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
        ducks.splice(i, 1); 
      }
    }

    imageMode(CORNER);
    image(scenarios.game, 0, 0); 

    imageMode(CENTER);
    image(crosshair, mouseX, mouseY, 30, 30);

    // Mostrar el puntaje
    fill(255);
    textFont(font.Pixel);
    textSize(24);
    textAlign(RIGHT, TOP);
    text(`Score: ${score}`, width - 20, 20);

    if (ducks.length < maxDucks && !ducks.some(duck => duck.state === "shot" || duck.state === "falling")) {
      spawnDuck();
    }

    // Aumentar la velocidad de los patos con el tiempo
    gameTime += deltaTime / 1000; 
    if (gameTime > 10) {
      speedMultiplier += 0.3; 
      gameTime = 0; 
    }
  pop();
}