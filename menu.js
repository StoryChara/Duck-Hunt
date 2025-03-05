let dog_smell = 0;
let miss = 0;

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
    // Draw sky background
    background(99, 173, 255);
    
    // Show dog animations FIRST (before the grass overlay)
    if (dogState === "laughing" || dogState === "showing") {
      showDog();
    }
    
    // Draw ducks
    for (let i = ducks.length - 1; i >= 0; i--) {
      ducks[i].update();
      ducks[i].display();
      if (ducks[i].isOffScreen()) {
        if (ducks[i].state === "flying") {
          score -= 100; // Penalización si el pato escapa
          missedDucks++; // Increment missed ducks counter
          dogState = "laughing"; // Set dog to laugh when duck escapes
          dogSFX();
          dogTime = 0; // Reset dog timer
        }
        ducks.splice(i, 1);
      }
    }
    
    // Draw scenario AFTER dogs but BEFORE UI elements
    // This allows the grass foreground to cover part of the dog
    imageMode(CORNER);
    image(scenarios.game, 0, 0, width, height);
    
    // Draw UI elements (crosshair, score, etc.) LAST
    imageMode(CENTER);
    noCursor();
    image(crosshair, mouseX, mouseY, 51, 51);
    
    // Display score and game info
    fill(255);
    textFont(font.Pixel);
    textSize(20);
    textAlign(RIGHT, TOP);
    text(`Score: ${score}`, width - 34, 34);
    textAlign(LEFT, TOP);
    text(`Shots: ${shots}`, 34, 34);
    textAlign(LEFT, BOTTOM);
    text(`Missed Ducks: ${missedDucks}`, 34, height - 34);
    
    if (dogState === "smelling") {
      image(dog.smell, dog_smell, height - 100);
      dog_smell += 1;
    } else if (dogState === "jumping") {
      image(dog.jump, dog_smell, height - 125);
    }
    
    // Check for spawning new ducks
    if (ducks.length === 0 && dogState === "idle") { 
      if (miss > 0) {
        dogState = "laughing"; // Se ríe si escapó al menos un pato
      } else {
        dogState = "showing"; // Muestra el pato si los atrapamos todos
      }
      dogSFX();
      dogTime = 0; // Reiniciar el tiempo de animación
    }
    
    // Increase duck speed over time
    gameTime += deltaTime / 1000;
    if (gameTime > 10) {
      speedMultiplier += 0.3;
      gameTime = 0;
    }
    
    // Check game over condition
    if (missedDucks >= 3) {
      menu = "GameOver";
    }
  pop();
}

function showDog() {
  push();
  imageMode(CENTER);

  let totalDuration = 2; // Duración de la animación del perro
  let progress = Math.min(dogTime / totalDuration, 1);

  let startY = height - 160;
  let peakY = height - 190;
  let endY = startY;

  let dogY;

  if (progress < 0.5) {
    let riseProgress = progress * 2;
    let easeValue = 1 - Math.pow(1 - riseProgress, 3);
    dogY = startY - easeValue * (startY - peakY);
  } else {
    let fallProgress = (progress - 0.5) * 2;
    let easeValue = Math.pow(fallProgress, 3);
    dogY = peakY + easeValue * (endY - peakY);
  }

  if (dogState === "laughing") {
    image(dog.laugh, width / 2, dogY, 100, 100);
  } else if (dogState === "showing") {
    image(dog.found, width / 2, dogY, 100, 100);
  }

  dogTime += deltaTime / 1000;

  if (dogTime > totalDuration) {
    dogState = "idle"; // Permitir que `spawnDuck()` se ejecute
    dogTime = 0;
    spawnDuck(); // Generar un nuevo pato después de la animación
  }

  pop();
}

function checkDuckHit() {
  for (let i = ducks.length - 1; i >= 0; i--) {
    if (ducks[i].isHit(mouseX, mouseY)) {
      ducks[i].getShot();
      shots = 3; // Reset shots counter when a duck is hit
      score += 50;
      break;
    }
  }
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
