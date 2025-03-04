function playSound(){
  music.song.setLoop(true);
  music.song.play();
}

function playSE(){
  music.se.play();
}

//----------------------------------------------------------------------//

function introMusic(){
  music.song.stop();
  music.song.setPath("resources/sfx/Title.mp3", playSound);
}
