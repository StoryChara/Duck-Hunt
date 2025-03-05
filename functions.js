function keyPressed() {
  if (menu === "Intro" && keyCode === 32) { 
    music.song.stop();
    menu = "Game";
    spawnDuck(); 
  }

  if (key === 'R' || key === 'r') { // Reiniciar el juego
    menu = "Start";
    ducks = [];
    score = 0;
    gameTime = 0;
    speedMultiplier = 1;
    maxDucks = 2;
    spawnInterval = 120;
  }
}

function mousePressed() {
  if (menu === "Start") {
    introMusic();
    menu = "Intro";
  } else if (menu === "Game") {
    if (shots > 0) {
      shots--; // Decrease shots counter when mouse is pressed
      checkDuckHit();
      // Decrease shots counter
    }
  } else if (menu === "GameOver") {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 75 && mouseY < height / 2 + 125) {
      resetGame();
    }
  }
}

function resetGame() {
  ducks = [];
  score = 0;
  gameTime = 0;
  speedMultiplier = 1;
  maxDucks = 2;
  spawnInterval = 120;
  missedDucks = 0; // Reset missed ducks counter
  shots = 3; // Reset shots counter
  dogState = "idle"; // Reset dog state
  dogTime = 0; // Reset dog time
  menu = "Game"; // Set the menu to "Game" after resetting
  spawnDuck(); // Start the game by spawning a duck
}

function spawnDuck() {
  let newDuck = new Duck();
  ducks.push(newDuck);
  if (shots === 0) {
    shots = 3; // Reset shots counter when new ducks are spawned and shots are 0
  }
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
