const teclas = {};

window.addEventListener("keydown", e => teclas[e.key] = true);
window.addEventListener("keyup",   e => teclas[e.key] = false);

const roadHeight=0;
const roadStartZ=-8;
const roadEndZ=30;

const moveLimL = -2;
const moveLimR = 2;
const roadStep = 1;

const roads = [
  new Polyedra([{x: 0.5, y: roadHeight, z: roadStartZ}, {x: 0.5, y: roadHeight, z: roadEndZ}]),
  new Polyedra([{x: -0.5, y: roadHeight, z: roadStartZ}, {x: -0.5, y: roadHeight, z: roadEndZ}]),
  new Polyedra([{x: 1.5, y: roadHeight, z: roadStartZ}, {x: 1.5, y: roadHeight, z: roadEndZ}]),
  new Polyedra([{x: -1.5, y: roadHeight, z: roadStartZ}, {x: -1.5, y: roadHeight, z: roadEndZ}]),
  new Polyedra([{x: 2.5, y: roadHeight, z: roadStartZ}, {x: 2.5, y: roadHeight, z: roadEndZ}]),
  new Polyedra([{x: -2.5, y: roadHeight, z: roadStartZ}, {x: -2.5, y: roadHeight, z: roadEndZ}]),
];

const players = [
  new TriangularPrisme(0, 0.5, 0, 1, 0.5),
]

const playersPos = [
  [0,0],
];

const enemies = [];

const gamePolyedras = [
  roads,
  players,
  enemies
]

function displayGameEntities(){
  gamePolyedras.forEach(
    gp => gp.forEach(
      p => displayPolyedra(p)
    )
  );
}

let debug = false;

function runControls(){
  const step = 1;

  if(teclas['w'] && playersPos[0][1]+step <= moveLimR){
    playersPos[0][1] += step;
    players[0].move({dx: 0, dy: 0, dz: step});
  }
  if(teclas['s'] && playersPos[0][1]-step >= moveLimL){
    playersPos[0][1] -= step;
    players[0].move({dx: 0, dy: 0, dz: -step});
  }
  if(teclas['a'] && playersPos[0][0]-step >= moveLimL){
    playersPos[0][0] -= step;
    players[0].move({dx: -step, dy: 0, dz: 0});
  }
  if(teclas['d'] && playersPos[0][0]+step <= moveLimR){
    playersPos[0][0] += step;
    players[0].move({dx: step, dy: 0, dz: 0});
  }

  if(teclas['l']){
    debug = true;
  }
  else{
    debug = false;
  }
}

function enemyCycle(){
  const step = 20/FPS;

  const chance = 10;
  const ran = Math.floor(Math.random()*chance);

  if(ran == 1){

    const dist = 1 + (moveLimR-moveLimL)/roadStep;
    const pos = Math.floor(Math.random() * dist); 

    const X = (roadStep * pos - moveLimR);
    enemies.push(
      new Octaedro(X, 0.5, roadEndZ, 0.6)
    );
  }

  for(e of enemies){
    e.move({dx: 0, dy: 0, dz: -step});
  }
  
  for (let i = enemies.length - 1; i>=0; i--) {
    if (enemies[i].getCenter().z <= roadStartZ) {
      enemies.splice(i, 1);
    }
  }
}

function gameLoop(){
  runControls();
  enemyCycle();
  displayGameEntities();

  if(debug){
    console.log("Game entities");
    console.log(gamePolyedras);
  }
}