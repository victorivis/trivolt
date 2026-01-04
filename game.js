const keyHold = {};
let keyUp = {};
let keyDown = {};

window.addEventListener("keydown", e => { 
  if (e.repeat) return;
  keyHold[e.key] = 1;
  keyDown[e.key] = true;
});
window.addEventListener("keyup",   e => {
  keyUp[e.key] = true;
  delete keyHold[e.key];
});

let blinkCount=0;
const blinkTime = FPS*2;
const blinkFreq = 3;

let isPaused = false;

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
const enemiesLane = [];

const gamePolyedras = [
  roads,
  players,
  enemies
]

const maxLife = 3;
let life = maxLife;
function damagePlayer(){
  if(blinkCount <= 0){
    blinkCount = blinkTime;
    life--;
  }
}

function displayGameEntities(){
  startPath();
  gamePolyedras.forEach(
    gp => gp.forEach(
      p => displayPolyedra(p)
    )
  );
  render();
}

let debug = false;

function clearObj(obj){
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      delete obj[key];
    }
  }
}

const keyHoldTime = 2;

function runControls(){
  if(!isPaused){
    const step = 1;

    if(keyHold['w'] && playersPos[0][1]+step <= moveLimR){
      playersPos[0][1] += step;
      players[0].move({dx: 0, dy: 0, dz: step});
    }
    if(keyHold['s'] && playersPos[0][1]-step >= moveLimL){
      playersPos[0][1] -= step;
      players[0].move({dx: 0, dy: 0, dz: -step});
    }
    if((keyDown['a'] || keyHold['a']>keyHoldTime) && playersPos[0][0]-step >= moveLimL){
      playersPos[0][0] -= step;
      players[0].move({dx: -step, dy: 0, dz: 0});

      if(keyHold['a'] > 0){
        keyHold['a'] -= keyHoldTime;
      }
    }
    if((keyDown['d'] || keyHold['d']>keyHoldTime) && playersPos[0][0]+step <= moveLimR){
      playersPos[0][0] += step;
      players[0].move({dx: step, dy: 0, dz: 0});

      if(keyHold['d'] > 0){
        keyHold['d'] -= keyHoldTime;
      }
    }

    for (const key in keyHold) {
      keyHold[key]++;
    }
  }

  if(keyDown['p']){
    isPaused = !isPaused;
  }

  if(keyHold['l']){
    debug = true;
  }
  else{
    debug = false;
  }

  //keyDown = {};
  //keyUp = {};

  clearObj(keyDown);
  clearObj(keyUp);

  if(debug){
    console.log("Keys");
    console.log(keyDown);
    console.log(keyUp);
  }
}

const contactRange = 0.5;
function updateEnemies(){
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

    enemiesLane.push(
      pos-2
    );
  }

  for(e of enemies){
    e.move({dx: 0, dy: 0, dz: -step});
  }
  
  if(debug){
    console.log("playerPos", playersPos[0][0]);
  }
  for (let i = enemies.length - 1; i>=0; i--) {
    const posZ = enemies[i].getCenter().z;

    if(debug){
      console.log("enemy", enemiesLane[i], posZ-contactRange, posZ+contactRange, playersPos[0][1]);
    }

    if(playersPos[0][0] == enemiesLane[i] && playersPos[0][1] >= posZ-contactRange && playersPos[0][1] <= posZ+contactRange){
      damagePlayer();
    }

    if (posZ <= roadStartZ) {
      enemies.splice(i, 1);
      enemiesLane.splice(i, 1);
    }
  }
}

function updatePlayer(){
  if(blinkCount>=0){
    if(blinkCount%blinkFreq == 1){
      players[0].hide();
    }
    else{
      players[0].show();
    }

    blinkCount--;
  }
}

let retryButton = {
  x: 0,
  y: 0,
  width: 200,
  height: 60,
  text: "RETRY",
  visible: false
};

function drawRetryButton() {
  if (!retryButton.visible) return;

  ctx.save();
  
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(retryButton.x, retryButton.y, retryButton.width, retryButton.height);
  ctx.strokeStyle = TEXT_LIGHT;
  ctx.lineWidth = 2;
  ctx.strokeRect(retryButton.x, retryButton.y, retryButton.width, retryButton.height);

  ctx.fillStyle = TEXT_LIGHT;
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    retryButton.text,
    retryButton.x + (retryButton.width >> 1),
    retryButton.y + (retryButton.height >> 1)
  );

  ctx.restore();
}


document.addEventListener('DOMContentLoaded', function() {
  game.addEventListener('click', function(event) {
    if (retryButton.visible) {
      const rect = game.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= retryButton.x && x <= retryButton.x + retryButton.width &&
          y >= retryButton.y && y <= retryButton.y + retryButton.height) {
        resetGame();
      }
    }
  });
});


function resetGame(){
  life = maxLife;
  enemies.length = 0;
  enemiesLane.length = 0;
  isPaused = false;
  blinkCount = -1;
}

function drawHUD() {
  ctx.save();
  ctx.fillStyle = TEXT_LIGHT;
  ctx.font = "30px 'Arial'";
  ctx.textAlign = "left";

  if (life > 0) {
    let hearts = "▣".repeat(life);
    ctx.fillText(hearts, 10, 30);
  } 
  else {
    ctx.strokeStyle = TEXT_LIGHT;
    ctx.lineWidth = 4;
    ctx.font = "80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", w>>1, h>>1);
    ctx.strokeText("GAME OVER", w>>1, h>>1);

    isPaused = true;

    retryButton.visible = true;
    
    retryButton.x = (w - retryButton.width) >> 1;
    retryButton.y = (h >> 1) + 60;
    drawRetryButton();
  }
  ctx.restore();
}

function gameLoop(){
  runControls();

  if(!isPaused){
    updateEnemies();
    updatePlayer();
  }
  displayGameEntities();
  drawHUD();

  if(debug){
    console.log("Game entities");
    console.log(gamePolyedras);
  }
}