function playSound(){
  music.song.setLoop(true);
  music.song.play();
}

//----------------------------------------------------------------------//

function introMusic(){
  music.song.stop();
  music.song.setPath("resources/sfx/Title.mp3", playSound);
}

function failMusic(){
  music.song.stop();
  music.song.setPath("resources/sfx/You_Failed.mp3", playSound);
}

//----------------------------------------------------------------------//

function gunSFX(){
  music.sfx_gun.stop();
  music.sfx_gun.setPath("resources/sfx/Gun_Shot.mp3",() => {
    music.sfx_gun.play();
  });
}

//----------------------------------------------------------------------//

function dogSmell() {
  menu = "Game";
  dogState = "smelling"; // Estado inicial del perro

  music.sfx_dog.stop();
  music.sfx_dog.setPath("resources/sfx/Duck_Hunt_Intro.mp3", () => {
    music.sfx_dog.play();

    music.sfx_dog.onended(function () {
      music.sfx_dog.setPath("resources/sfx/Dog_Bark.mp3", () => {
        music.sfx_dog.play();
        dogState = "jumping"; // Cambiar a la animación del perro saltando

        music.sfx_dog.onended(function () {
          dogState = "idle";
          spawnDuck(); // Iniciar el juego después de la animación del perro
        });
      });
    });
  });
}

function dogSFX(){
  music.sfx_dog.stop();
  if (dogState === "showing"){
    music.sfx_dog.setPath("resources/sfx/Dog_Shows_Duck.mp3", () => {
      music.sfx_dog.play();
    });
  } else {
    music.sfx_dog.stop();
    music.sfx_dog.setPath("resources/sfx/Dog_Laughs.mp3", () => {
      music.sfx_dog.play();
    });
  }
  
}

//----------------------------------------------------------------------//

function quackSFX(){
  music.sfx_quack.stop();
  music.sfx_quack.setPath("resources/sfx/Duck_Quack.mp3", () => {
    music.sfx_quack.play();
  });
}
