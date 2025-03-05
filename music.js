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

function dogSmell(){
  music.sfx_dog.stop();
  music.sfx_dog.setPath("resources/sfx/Duck_Hunt_Intro.mp3",() => {
    music.sfx_dog.play();
    // Aquí inserta la logica de mostrar al perro oliendo
    music.sfx_dog.onended(function () {
      music.sfx_dog.setPath("resources/sfx/Dog_Bark.mp3",() => {
        image(dog.jump, 0, 0);
        // Aquí inserta la logica de mostrar al perro saltando
      });
    });
  });
}
