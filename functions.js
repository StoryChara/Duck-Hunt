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
      checkDuckHit();
    }
  }
  
  function spawnDuck() {
    let newDuck = new Duck();
    ducks.push(newDuck);
  }
  
  function checkDuckHit() {
    for (let i = ducks.length - 1; i >= 0; i--) {
      if (ducks[i].isHit(mouseX, mouseY)) {
        ducks[i].getShot(); 
        score=score+50; 
        break;
      }
    }
  }
  