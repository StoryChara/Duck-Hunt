function keyPressed() {
  if (menu === "Intro") { 
    if (keyCode === 32) {
      music.song.stop();
      dogSmell();
    }
  } else if (menu === "Game") { 
    if (key === 'R' || key === 'r') {
      menu = "Start";
      ducks = [];
      score = 0;
      gameTime = 0;
      speedMultiplier = 1;
      maxDucks = 2;
      spawnInterval = 120;
    }
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
      gunSFX();
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
  menu = "Intro"; // Set the menu to "Game" after resetting
  spawnDuck(); // Start the game by spawning a duck
  dog_smell = 0;
}

function spawnDuck() {
  miss = 0;
  let newDuck = new Duck();
  ducks.push(newDuck);
  if (shots === 0) {
    shots = 3; // Reset shots counter when new ducks are spawned and shots are 0
  }
  quackSFX();
}
