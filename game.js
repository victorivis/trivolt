const teclas = {};

window.addEventListener("keydown", e => teclas[e.key] = true);
window.addEventListener("keyup",   e => teclas[e.key] = false);

function runControls(){
  if(teclas['w']){
    players[0].move({dx: 0, dy: 0, dz: 1});
    console.log("aaa");
  }
  if(teclas['s']){
    players[0].move({dx: 0, dy: 0, dz: -1});
  }
  if(teclas['a']){
    players[0].move({dx: -1, dy: 0, dz: 0});
  }
  if(teclas['d']){
    players[0].move({dx: 1, dy: 0, dz: 0});
  }
}

function gameLoop(){
  runControls();
}