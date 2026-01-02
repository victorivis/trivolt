const zSlider = document.getElementById('z_slider');
const roundingSlider = document.getElementById('rounding');
const zValue = document.getElementById('z_value');
const roundingValue = document.getElementById('rounding_value');
let zSliderVal = 2;

const rotation_x = document.getElementById('rotation-x');
const rotation_y = document.getElementById('rotation-y');
const rotation_z = document.getElementById('rotation-z');

zValue.textContent = zSlider.value;
zSlider.addEventListener('input', () => {
  zValue.textContent = zSlider.value;
  zSliderVal = Number(zSlider.value);
});

roundingValue.textContent = roundingSlider.value;
roundingSlider.addEventListener('input', () => {
  roundingValue.textContent = roundingSlider.value;
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
const FPS = 50;

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

let angleX=0, angleY=0, angleZ=0;
function globalTransform(p, angle, sliderVal){
  let copyP = {...p};

  if(rotation_x.checked){
    angleX += angle;
  }
  if(rotation_y.checked){
    angleY += angle;
  }
  if(rotation_z.checked){
    angleZ += angle;
  }

  copyP = rotate_yz(rotate_xz(rotate_xy(copyP, angleZ), angleY), angleX);

  return screen(
    project(
      translate_z(copyP, sliderVal)
    )
  );
}

function displayFaces(edges, vertices, angle){
  for(f of edges){
    for(let i=0; i<f.length; i++){
      const a = globalTransform(vertices[f[i]], angle, zSliderVal);
      const b = globalTransform(vertices[f[(i+1)%f.length]], angle, zSliderVal);
      line(a, b);
    }
  }
}

const poliedro = new Cubo();

function frame(){
  const dt = 1/FPS;
  dz += dt;
  const angle = cumulative_speed.checked ? dt : degreeToRad(dt);

  clear();
  rbgSquare(ctx);
  displayFaces(poliedro.getEdges(), poliedro.getVertices(), angle);
  //displayFaces(faces, vertices, angle);
  //for(v of squareFace(0.25)){
  //  point(globalTransform(v, angle, zSliderVal));
  //}
  
  if(circles.checked){
    algunsMovimentos(dz);
  }
  if(gradients.checked){
    Gradient(ctx);
  }

  setTimeout(frame, 1000/FPS);
}

function init(){
  setTimeout(frame, 1000/FPS);
}

init();