const keyHold = {};
const keyUp = {};
const keyDown = {};

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
let movementBlock = false;

const roadHeight=0;
const roadStartZ=-8;
const roadEndZ=30;

const moveLimL = -2;
const moveLimR = 2;
const roadStep = 1;
const moveDist = (moveLimR - moveLimL)/roadStep + 1;

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
];

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

function switchPause(){
  if(startButton.visible){
    isPaused = false;
    startButton.visible = false;
    startButton.text = "CONTINUAR";
    startButton.width = 300;
    frame();
  }
  else{
    isPaused = true;
    startButton.visible = true;
  }
}

function runControls(){
  if(!isPaused && !movementBlock){
    const step = roadStep;

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

  if(keyDown['p'] && !movementBlock){
    switchPause();
  }

  if(keyHold['l']){
    debug = true;
  }
  else{
    debug = false;
  }

  clearObj(keyDown);
  clearObj(keyUp);

  if(debug){
    console.log("Keys");
    console.log(keyDown);
    console.log(keyUp);
  }
}

function spawnEnemy(lane, X){
  if(obstacleTypes.checked){
    if((lane&7)==2){
      enemies.push(
        new Cube(X, 0.5, roadEndZ, 0.4, 1)
      );
    }
    else if(lane&1){
      enemies.push(
        new Cylinder(X, 0.5, roadEndZ, 0.4, 1)
      );
    }
    else{
      enemies.push(
        new Octaedro(X, 0.5, roadEndZ, 0.6)
      );
    }
  }
  else{
    enemies.push(
      new Octaedro(X, 0.5, roadEndZ, 0.6)
    );
  }

  enemiesLane.push(
    lane-(moveDist>>1)
  );
}

const contactRange = 0.5;
let spawnRate = 0.09;
let enemySpeed = 20/FPS;
function updateEnemies(){
  const ran = Math.random();

  if(ran < spawnRate){
    const lane = Math.floor(Math.random() * moveDist); 
    const X = (roadStep * lane - moveLimR);

    spawnEnemy(lane, X);
  }

  for(e of enemies){
    e.move({dx: 0, dy: 0, dz: -enemySpeed});
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

const retryButton = {
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

  typewriter.setCurrentText(retryButton.text);
  let text = typewriter.getText();
  
  if(text.length == retryButton.text.length){
    const blink = Math.floor(Date.now()>>9)&1;
    if(blink) text += "_";
    else text += "  ";
  }

  ctx.fillStyle = TEXT_LIGHT;
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    text,
    retryButton.x + (retryButton.width >> 1),
    retryButton.y + (retryButton.height >> 1)
  );

  ctx.restore();
}

const typewriter = new Typewriter();
const gameOverText = "Game Over";
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
    movementBlock = true;
    ctx.strokeStyle = TEXT_LIGHT;
    ctx.lineWidth = 4;
    ctx.font = "80px Arial";
    ctx.textAlign = "center";

    typewriter.setCurrentText(gameOverText);
    const text = typewriter.getText();
    
    ctx.fillText(text, w>>1, h>>1);
    ctx.strokeText(text, w>>1, h>>1);

    if (text.length === gameOverText.length) {
      retryButton.visible = true;
      retryButton.x = (w - retryButton.width) >> 1;
      retryButton.y = (h >> 1) + 60;
      drawRetryButton();
      isPaused = true;
    }
    else{
      isPaused = !isPaused;
    }
  }
  ctx.restore();
}

function resetGame(){
  life = maxLife;
  movementBlock = false;
  enemies.length = 0;
  enemiesLane.length = 0;
  isPaused = false;
  blinkCount = 0;
  typewriter.reset();
  retryButton.visible=false;
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
    if(startButton.visible){
      const rect = game.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= startButton.x && x <= startButton.x + startButton.width &&
          y >= startButton.y && y <= startButton.y + startButton.height) {
        switchPause();
      }
    }
  });
});

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

let mainMenu = true;
const startButton = {
  x: 0,
  y: 0,
  width: 270,
  height: 80,
  text: "INICIAR",
  visible: true
};

//const instructionsText = ["Use WASD to move", "Avoid the obstacles", "Press P to pause"];
const instructionsText = ["Use WASD para mover", "Desvie dos obstáculos", "Aperte P para pausar"];

let contMassa=0;
const starMenuOffset = 140;
const instructionsTextOffset = 70;
const instructionsTextLineSpace = 35;
function centerStartButton() {
  startButton.x = (w - startButton.width) >> 1;
  startButton.y = 180+starMenuOffset;
}

function drawStartScreen() {
  if (!startButton.visible) return;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillRect(0, 0, w, h);
  
  ctx.fillStyle = TEXT;
  ctx.font = "60px 'Arial'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("TRIVOLT", w >> 1, starMenuOffset);
  
  ctx.font = "24px 'Arial'";
  ctx.fillStyle = DETAILS_TEXT;
  instructionsText.forEach((text, index) => {
    ctx.fillText(text, w >> 1, starMenuOffset + instructionsTextOffset + (index * instructionsTextLineSpace));
  });

  centerStartButton();
  drawStartButton();
}

function drawStartButton(){
  if (!startButton.visible) return;
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(startButton.x, startButton.y, startButton.width, startButton.height);
  
  ctx.strokeStyle = TEXT;
  ctx.lineWidth = 4;
  ctx.strokeRect(startButton.x, startButton.y, startButton.width, startButton.height);
  
  const blink = Math.floor(Date.now() / 500)&1;
  ctx.fillStyle = TEXT;
  ctx.font = "bold 38px 'Arial'";
  
  let buttonText = startButton.text;
  
  if(blink) buttonText += "_";
  else buttonText += "  ";
  
  ctx.fillText(
    buttonText,
    startButton.x + (startButton.width >> 1),
    startButton.y + (startButton.height >> 1)
  );

  runControls();

  setTimeout(drawStartButton, 500);
}