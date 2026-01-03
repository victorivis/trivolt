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

//let angleX=degreeToRad(270), angleY=degreeToRad(317.8), angleZ=degreeToRad(165);
let angleX=degreeToRad(310), angleY=degreeToRad(320), angleZ=0;
let posX=0, posY=0, posZ=7.8;

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
});
angleYSlider.addEventListener('input', () => {
  angleYInput.value = angleYSlider.value;
  angleY = Number(angleYSlider.value) * Math.PI / 180;
});
angleZSlider.addEventListener('input', () => {
  angleZInput.value = angleZSlider.value;
  angleZ = Number(angleZSlider.value) * Math.PI / 180;
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

console.log(game);

const BACKGROUND = "#2a2a2aff";
const FOREGROUND = "#0e900e";
const ENTITY = "#960b0bff";

const w = 800, h = 600;
game.height = h;
game.width = w;
const ctx = game.getContext("2d");
console.log(ctx);

let dz = 0;
const FPS = 60;

function clear(){
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, w, h);
}

function point({x, y}){
  const s = 20;
  ctx.fillStyle = FOREGROUND;
  ctx.fillRect(x - s/2, y - s/2, s, s);
}

function screen(p) {
  // -1..1 => 0..2 => 0..1 => 0..w
  return {
    x: (p.x + 1)/2*game.width,
    y: (1 - p.y)/2*game.height,
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

function degreeToRad(angle){
  return angle * Math.PI / 180;
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
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = FOREGROUND;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.restore();
}

const circunference = 2*Math.PI;

function globalTransform(p, angle){
  let copyP = {...p};

  if(rotationX.checked){
    angleX += angle;
  }
  if(rotationY.checked){
    angleY += angle;
  }
  if(rotationZ.checked){
    angleZ += angle;
  }

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

  copyP = rotate_yz(rotate_xz(rotate_xy(copyP, angleZ), angleY), angleX);
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

function frame(){
  const dt = 1/FPS;
  dz += dt;
  const angle = cumulative_speed.checked ? dt : degreeToRad(dt);
  globalAngle = angle;

  
  clear();
  gameLoop();

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
  
  setTimeout(frame, 1000/FPS);
}

function init(){
  console.log(roads);

  setTimeout(frame, 1000/FPS);
}

init();