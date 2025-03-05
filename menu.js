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
    
    // Check for spawning new ducks
    if (ducks.length < maxDucks && !ducks.some(duck => duck.state === "shot" || duck.state === "falling")) {
      if (dogState === "idle") {
        spawnDuck();
      }
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
    
    // Calculate the rise animation progress (0 to 1) over the first 0.5 seconds
    let riseProgress = Math.min(dogTime / 0.5, 1);
    
    // Calculate the dog's y position - starts at bottom of screen and rises to height - 160
    // Using easeOutCubic for smoother animation
    let easeValue = 1 - Math.pow(1 - riseProgress, 3); // Cubic easing
    let startY = height - 160; // Start position at the bottom of screen
    let endY = height - 190; // Final position
    let dogY = startY - easeValue * (startY - endY);
    
    if (dogState === "laughing") {
      image(dog.laugh, width / 2, dogY, 100, 100);
    } else if (dogState === "showing") {
      image(dog.found, width / 2, dogY, 100, 100);
    }
    
    dogTime += deltaTime / 1000;
    // Show dog for 2 seconds total (including the 0.5s rise animation)
    if (dogTime > 2) {
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
