function createFastRotation(angleX, angleY, angleZ) {
  const cx = Math.cos(angleX);
  const sx = Math.sin(angleX);
  const cy = Math.cos(angleY);
  const sy = Math.sin(angleY);
  const cz = Math.cos(angleZ);
  const sz = Math.sin(angleZ);
  
  return function(p) {
    const x1 = cz * p.x - sz * p.y;
    const y1 = sz * p.x + cz * p.y;
    
    const x2 = cy * x1 - sy * p.z;
    const z2 = sy * x1 + cy * p.z;
    
    const y3 = cx * y1 - sx * z2;
    const z3 = sx * y1 + cx * z2;
    
    return { x: x2, y: y3, z: z3 };
  };
}

const fastRotator = createFastRotation(angleX, angleY, angleZ);

const roundingSlider = document.getElementById('rounding');
const roundingValue = document.getElementById('rounding_value');

const rotationX = document.getElementById('rotation-x');
const rotationY = document.getElementById('rotation-y');
const rotationZ = document.getElementById('rotation-z');

const angleXInput = document.getElementById('angle-x');
const angleYInput = document.getElementById('angle-y');
const angleZInput = document.getElementById('angle-z');

const posXInput = document.getElementById('pos-x');
const posYInput = document.getElementById('pos-y');
const posZInput = document.getElementById('pos-z');

const posXSlider = document.getElementById('pos-x-slider');
const posYSlider = document.getElementById('pos-y-slider');
const posZSlider = document.getElementById('pos-z-slider');

const angleXSlider = document.getElementById('angle-x-slider');
const angleYSlider = document.getElementById('angle-y-slider');
const angleZSlider = document.getElementById('angle-z-slider');

roundingValue.textContent = roundingSlider.value;
roundingSlider.addEventListener('input', () => {
  roundingValue.textContent = roundingSlider.value;
});

angleXInput.addEventListener('input', ()=>{
  angleX = Math.PI * Number(angleXInput.value)/180;
});

angleYInput.addEventListener('input', ()=>{
  angleY = Math.PI * Number(angleYInput.value)/180;
});

angleZInput.addEventListener('input', ()=>{
  angleZ = Math.PI * Number(angleZInput.value)/180;
});

function syncPosInputs() {
  posXInput.value = posX;
  posYInput.value = posY;
  posZInput.value = posZ;

  posXSlider.value = posX;
  posYSlider.value = posY;
  posZSlider.value = posZ;
}

syncPosInputs();

function syncAngleInputs() {
  angleXInput.value = (angleX * 180 / Math.PI).toFixed(2);
  angleYInput.value = (angleY * 180 / Math.PI).toFixed(2);
  angleZInput.value = (angleZ * 180 / Math.PI).toFixed(2);

  angleXSlider.value = angleXInput.value;
  angleYSlider.value = angleYInput.value;
  angleZSlider.value = angleZInput.value;
}

syncAngleInputs();

posXSlider.addEventListener('input', () => {
  posX = Number(posXSlider.value);
  posXInput.value = posX;
});

posYSlider.addEventListener('input', () => {
  posY = Number(posYSlider.value);
  posYInput.value = posY;
});

posZSlider.addEventListener('input', () => {
  posZ = Number(posZSlider.value);
  posZInput.value = posZ;
});

posXInput.addEventListener('input', () => {
  posX = Number(posXInput.value);
  posXSlider.value = posX;
});

posYInput.addEventListener('input', () => {
  posY = Number(posYInput.value);
  posYSlider.value = posY;
});

posZInput.addEventListener('input', () => {
  posZ = Number(posZInput.value);
  posZSlider.value = posZ;
});

angleXSlider.addEventListener('input', () => {
  angleXInput.value = angleXSlider.value;
  angleX = Number(angleXSlider.value) * Math.PI / 180;
  fastRotator = createFastRotation(angleX, angleY, angleZ);
});
angleYSlider.addEventListener('input', () => {
  angleYInput.value = angleYSlider.value;
  angleY = Number(angleYSlider.value) * Math.PI / 180;
  fastRotator = createFastRotation(angleX, angleY, angleZ);
});
angleZSlider.addEventListener('input', () => {
  angleZInput.value = angleZSlider.value;
  angleZ = Number(angleZSlider.value) * Math.PI / 180;
  fastRotator = createFastRotation(angleX, angleY, angleZ);
});

angleXInput.addEventListener('input', () => {
  angleX = Number(angleXInput.value) * Math.PI / 180;
  angleXSlider.value = angleXInput.value;
});
angleYInput.addEventListener('input', () => {
  angleY = Number(angleYInput.value) * Math.PI / 180;
  angleYSlider.value = angleYInput.value;
});
angleZInput.addEventListener('input', () => {
  angleZ = Number(angleZInput.value) * Math.PI / 180;
  angleZSlider.value = angleZInput.value;
});

const roundingGroup = document.getElementById('rounding-group');

gradients.addEventListener('change', () => {
  const children = roundingGroup.children;

  if (gradients.checked) {
    for (let child of children) {
      child.classList.remove('hidden');
    }
  }
  else {
    for (let child of children) {
      child.classList.add('hidden');
    }
  }
});

game.height = h;
game.width = w;
const ctx = game.getContext("2d");

let dz = 0;
function clear(){
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, w, h);
}

function point({x, y}){
  const s = 20;
  ctx.fillStyle = FOREGROUND;
  ctx.fillRect(x - s/2, y - s/2, s, s);
}

const w2 = w/2;
const h2 = h/2;
function screen(p) {
  // -1..1 => 0..2 => 0..1 => 0..w
  return {
    x: (p.x + 1)*w2,
    y: (1 - p.y)*h2,
  }
}

function project({x, y, z}){
  return {x: x/z, y: y/z};
}

function circle(x, y, radius=50){
  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function translate({x, y, z}, {dx, dy, dz}){
  return {x: x+dx, y: y+dy, z: z+dz};
}

function translate_z({x, y, z}, dz){
  return {x, y, z: z+dz};
}

function rotate_xz({x, y, z}, angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return {
    x: x*c - z*s,
    y: y,
    z: x*s + z*c,
  }
}

function rotate_xy({x, y, z}, angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  
  return {
    x: x*c - y*s,
    y: x*s + y*c,
    z: z,
  }
}

function rotate_yz({x, y, z}, angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return {
    x: x,
    y: y*c - z*s,
    z: y*s + z*c,
  }
}

const pzs = -0.25;
const pze = 0.25
const vertices = [
  {x: 0.25, y: 0.25, z: pzs},
  {x: -0.25, y: 0.25, z: pzs},
  {x: 0.25, y: -0.25, z: pzs},
  {x: -0.25, y: -0.25, z: pzs},

  {x: 0.25, y: 0.25, z: pze},
  {x: -0.25, y: 0.25, z: pze},
  {x: 0.25, y: -0.25, z: pze},
  {x: -0.25, y: -0.25, z: pze},
];

const faces = [
  [2, 0, 1, 3],
  [6, 4, 5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function line(p1, p2){
  globalPath.moveTo(p1.x, p1.y);
  globalPath.lineTo(p2.x, p2.y);
}

const circunference = 2*Math.PI;

function globalTransform(p, angle){

  if(rotationX.checked){
    angleX += angle;
  }
  if(rotationY.checked){
    angleY += angle;
  }
  if(rotationZ.checked){
    angleZ += angle;
  }

  if(!increasePerfomance){
    if(angleX > 2*Math.PI){
      angleX = angleX%circunference;
    }
    if(angleY > 2*Math.PI){
      angleY = angleY%circunference;
    }
    if(angleZ > 2*Math.PI){
      angleZ = angleZ%circunference;
    }

    angleXInput.value = (angleX * 180 / Math.PI).toFixed(2);
    angleYInput.value = (angleY * 180 / Math.PI).toFixed(2);
    angleZInput.value = (angleZ * 180 / Math.PI).toFixed(2);
  }

  //const copyP = fastRotator(p);
  const copyP = rotate_yz(rotate_xz(rotate_xy(p, angleZ), angleY), angleX);
  const translatedP = translate(copyP, {dx: posX, dy: posY, dz: posZ});

  return screen(
    project(
      translatedP
    )
  );
}

function displayFaces(edges, vertices, angle){
  for(f of edges){
    for(let i=0; i<f.length; i++){
      const a = globalTransform(vertices[f[i]], angle);
      const b = globalTransform(vertices[f[(i+1)%f.length]], angle);
      
      line(a, b);
    }
  }
}

let globalAngle=0;
function displayPolyedra(polyedra){
  displayFaces(polyedra.getEdges(), polyedra.getVertices(), globalAngle);
}

const poliedro = new Cube(0, 0.5, 0, 0.5);

const lowBro = [
  new Cube(0, 0, 0, 1),
  new Cube(2, 0, 0, 1),
  new Octaedro(0, 2, 0, 1),
  new Cube(-2, 0, 0, 1),
  new Cube(0, -2, 0, 1),
]

function startPath(){
  globalPath = new Path2D;
}

function render(){
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = FOREGROUND;
  ctx.stroke(globalPath);
  ctx.restore();
}

let contLegal=60;
function frame(){
  const dt = 1/FPS;
  dz += dt;
  const angle = cumulative_speed.checked ? dt : degreeToRad(dt);
  globalAngle = angle;

  clear();
  if(loadedPolyedra.length > 0){
    startPath();
    loadedPolyedra.forEach(p => displayPolyedra(p, angle));
    render();
  }
  else{
    gameLoop();
  }

  if(circles.checked){
    algunsMovimentos(dz);
  }
  if(gradients.checked){
    rbgSquare(ctx);
    Gradient(ctx);
  }
  if(showOrbs.checked){
    drawOrbs(ctx, orbs);
  }
  
  if(startButton.visible){
    drawStartScreen();
  }
  else{
    setTimeout(frame, 1000/FPS);
  }
}

function init(){
  setTimeout(frame, 1000/FPS);
}

init();

function syncEnemyProperties(){
  enemySpeedSlider.value = enemySpeed*FPS;
  enemySpeedInput.value = enemySpeed*FPS;
  spawnRateSlider.value = spawnRate*100;
  spawnRateInput.value = spawnRate*100;
}

enemySpeedInput.addEventListener("change", e => {
  enemySpeed = Number(enemySpeedInput.value)/FPS;
  enemySpeedSlider.value = enemySpeedInput.value;
});

enemySpeedSlider.addEventListener("change", e => {
  enemySpeed = Number(enemySpeedSlider.value)/FPS;
  enemySpeedInput.value = enemySpeedSlider.value;
});


spawnRateInput.addEventListener("change", e => {
  spawnRate = Number(spawnRateInput.value)/100;
  spawnRateSlider.value = spawnRateInput.value;
});

spawnRateSlider.addEventListener("change", e => {
  spawnRate = Number(spawnRateSlider.value)/100;
  spawnRateInput.value = spawnRateSlider.value;
});

syncEnemyProperties();