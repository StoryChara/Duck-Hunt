let menu = "Start";
let scenarios, music, duck, dog;

function preload() {
  scenarios = {
    start: loadImage("resources/sprites/start.png"),
    game: loadImage("resources/sprites/game.png")
  };
  
  music = {
    song: loadSound("resources/sfx/Title.mp3")
  };
  
  font = {
    Duck: loadFont("resources/fonts/DUCK_HOUND.ttf"),
    Pixel: loadFont("resources/fonts/Early_GameBoy.ttf")
  };
  
  duck = {
    diagonal: loadImage("resources/sprites/duck1.gif"),
    lado: loadImage("resources/sprites/duck2.gif"),
    disparo: loadImage("resources/sprites/duck3.png"),
    caida: loadImage("resources/sprites/duck4.gif")
  }
  
  dog = {
    laugh: loadImage("resources/sprites/dog_laugh.gif"),
    smell: loadImage("resources/sprites/dog_smell.gif"),
    found: loadImage("resources/sprites/dog_found.png"),
    jump: loadImage("resources/sprites/dog_jump.gif")
  }
}

function setup() {
  const canvas = createCanvas(625, 550);
  canvas.parent('canvas-container');
}


function draw() {
  if (menu === "Start"){
    start_game();
  } else if (menu === "Intro"){
    menu_intro();
  } else if (menu === "Game") {
    menu_game();
  }
}

function keyPressed() {
  if (menu === "Intro" && keyCode === 32){
      music.song.stop();
      menu = "Game";
  }
}

function mousePressed() {
  if (menu === "Start") {
      introMusic();
      menu = "Intro";
  }
}
