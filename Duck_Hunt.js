// Variables xd
let menu = "Start";
let scenarios, music, duck, dog;
let ducks = []; // Array para almacenar los patos
let score = 0; // Puntaje del jugador
let crosshair; // Imagen de la mira
let gameTime = 0; // Tiempo transcurrido en el juego
let speedMultiplier = 1; // Multiplicador de velocidad de los patos
let maxDucks = 2; // Límite máximo de patos en pantalla
let spawnInterval = 120; // Intervalo de generación de patos (en frames)
let missedDucks = 0; // Contador de patos perdidos
let dogState = "idle"; // Estado del perro (idle, laughing, showing)
let dogTime = 0; // Tiempo que el perro ha estado en pantalla
let shots = 3; // Contador de disparos

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

  crosshair = loadImage("resources/sprites/crosshair.png"); 
}

function setup() {
  const canvas = createCanvas(625, 550);
  canvas.parent('canvas-container');
}

function draw() {
  if (menu === "Start") {
    start_game();
  } else if (menu === "Intro") {
    menu_intro();
  } else if (menu === "Game") {
    menu_game();
  } else if (menu === "GameOver") {
    gameOverScreen();
  }
}