function start_game(){
  push();
    background(0, 0, 0);
    fill(255);
    textFont(font.Duck);
    textAlign(CENTER, CENTER);
    fill(255); stroke(0); strokeWeight(0); textSize(width/15);
    text("CLICK to Start", (width / 2), (height/2));
  pop();
}

function menu_intro(){  
  push();
    imageMode(CORNER);
    image(scenarios.start, 0, 0);
    fill(255);
    textFont(font.Pixel);
    textAlign(CENTER, CENTER);
    fill(234, 158, 34); stroke(0); strokeWeight(5); textSize(height / 30);
    text("Press SPACE to continue", (width / 2), ((3 * height) / 4) + 25);
  pop();
}

function menu_game(){
  push();
    background(99, 173, 255);
    imageMode(CORNER);
    image(scenarios.game, 0, 0);
  pop();
}
