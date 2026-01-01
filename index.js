console.log(game);

const BACKGROUND = "#2a2a2aff";
const FOREGROUND = "#0e900e";
const ENTITY = "#960b0bff";

//const w = 1080, h = 720;
const w = 800, h = 600;

let dz = 0;
const FPS = 50;

game.height = h;
game.width = w;
game.getContext("2d");

const ctx = game.getContext("2d");

let z_slider_val;

z_slider.addEventListener("input", () => {
  z_slider_val = Number(z_slider.value);
});

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

function circle(x=150, y=150){
  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.stroke();
}

function rotated_circle(){
  const x = 150;
  const y = 150;
  const radius = 50;
  const angle = (30) * Math.PI / 180;

  ctx.save();               // salva o estado atual
  ctx.translate(x, y);      // move o ponto (0,0) para o centro do círculo
  ctx.rotate(angle);        // rotaciona 30° no eixo Z

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
}

function rotatedCircle() {
  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;
  const angle = 30 + 7*dz;

  if(angle == 0) return;

  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate(angle * Math.PI / 180);
  ctx.beginPath();
  ctx.ellipse(0, 0, 50, Math.abs( Math.cos(angle * Math.PI / 180)), 0, 0, Math.PI * 2);
  //CanvasPath.ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void
  ctx.stroke();
  
  ctx.restore();
}

console.log(ctx);

function translate_z({x, y, z}, dz){
  return {x, y, z: z+dz};
}

/*
function degreeToRad(angle){
  return angle * Math.PI / 180;
}
*/

function rotate_xz({x, y, z}, angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return {
    x: x*c - z*s,
    y: y,
    z: x*c + z*s,
  }
}

/*
const vertices = [
  {x: 0.5, y: 0.5, z: 0.75},
  {x: -0.5, y: 0.5, z: 0.75},
  {x: 0.5, y: -0.5, z: 0.75},
  {x: -0.5, y: -0.5, z: 0.75},

  {x: 0.5, y: 0.5, z: 0.25},
  {x: -0.5, y: 0.5, z: 0.25},
  {x: 0.5, y: -0.5, z: 0.25},
  {x: -0.5, y: -0.5, z: 0.25},
];
*/

/*
const vertices = [
  {x: 0.5, y: 0.5, z: 0.25},
  {x: -0.5, y: 0.5, z: 0.25},
  {x: 0.5, y: -0.5, z: 0.25},
  {x: -0.5, y: -0.5, z: 0.25},

  {x: 0.5, y: 0.5, z: -0.25},
  {x: -0.5, y: 0.5, z: -0.25},
  {x: 0.5, y: -0.5, z: -0.25},
  {x: -0.5, y: -0.5, z: -0.25},
];
*/

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

/*
const faces = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
]
*/

const faces = [
  [2, 0, 1, 3],
  [6, 4, 5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
]

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

const extras = [];
function squareFace(z){
  if(extras.length == 0){
    const n=20;
    const inicio=-0.5;
    const fim=0.5;
    const acrescimo = (fim-inicio)/n;

    for(let i=0; i<=20; i++){
      extras.push({x: inicio+acrescimo*i, y: inicio, z});
      extras.push({x: inicio+acrescimo*i, y: fim, z});
      extras.push({y: inicio+acrescimo*i, x: inicio, z});
      extras.push({y: inicio+acrescimo*i, x: fim, z});

      //extras.push({x: inicio+acrescimo*i, y: inicio, z: -z});
      //extras.push({x: inicio+acrescimo*i, y: fim, z: -z});
      //extras.push({y: inicio+acrescimo*i, x: inicio, z: -z});
      //extras.push({y: inicio+acrescimo*i, x: fim, z: -z});
    }
  }
  return extras;
}

const gradient = ctx.createRadialGradient(
  200, 200, 0,    // x1, y1, r1 (centro, raio interno)
  200, 200, 200   // x2, y2, r2 (centro, raio externo)
);
gradient.addColorStop(0, '#FFA500');
gradient.addColorStop(1, '#FFFF00');

const triangle = new Path2D();
triangle.moveTo(100, 100);
triangle.lineTo(150, 200);
triangle.lineTo(50, 200);
triangle.closePath();

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  /*
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  */
}

function frame(){
  const dt = 1/FPS;

  dz += 0.01;
  const angle = -Math.PI*dz*2;

  

  clear();
  //point(screen(project({x: 0, y:0, z:1+dz})));
  //point(screen(project({x: 0.25, y:1, z:1+dz})));
  //algunsMovimentos(dz);

  /*
  for(v of vertices){
    point(
      screen(
        project(
          translate_z(rotate_xz(v, 30*dz), sliderZ)
        )
      )
    );
  }

  for(v of squareFace(0.25)){
    point(
      screen(
        project(
          translate_z(rotate_xz(v, 30*dz), sliderZ)
        )
      )
    );
  }
  */

  /*
  for(v of vertices){
    point(
      screen(
        project(
          translate_z(rotate_xz(v, angle), sliderZ)
        )
      )
    );
  }
  */

  for(v of squareFace(0.25)){
    point(
      screen(
        project(
          translate_z(rotate_xz(v, angle), z_slider_val)
        )
      )
    );
  }

  line({x: -100, y: -200}, {x: 200, y: 400});

  
  for(f of faces){
    for(let i=0; i<f.length; i++){
      const a = screen(
        project(
          translate_z(rotate_xz(vertices[f[i]], angle), z_slider_val)
        )
      );

      const b = screen(
        project(
          translate_z(rotate_xz(vertices[f[(i+1) % f.length]], angle), z_slider_val)
        )
      );
      //console.log(a, b);

      line(a, b);
    }
  }
  
  roundedRect(ctx, 200, 200, 200, 200, Number(rounding.value));

  /*
  // Aplicar gradiente
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400)
  */

  // Usar o caminho múltiplas vezes
  ctx.fillStyle = gradient;
  ctx.fill(triangle);

  //ctx.translate(1, 0);
  ctx.setTransform(0.5, Number(outro.value), 0, 0.5, 0, 0);

  setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);