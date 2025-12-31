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

function circle(){
  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(150, 150, 50, 0, Math.PI * 2);
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
  try{
    ctx.strokeStyle = ENTITY;
    ctx.lineWidth = 5;
    const angle = 30 + 5*dz;

    console.log(angle)
    
    // Salvar o estado atual do contexto
    ctx.save();
    
    // Mover para a posição do círculo
    ctx.translate(150, 150);
    
    // Rotacionar 30 graus (convertendo para radianos)
    // Para "dentro da tela", rotacionamos em torno do eixo Z
    ctx.rotate(angle * Math.PI / 180);
    
    // Desenhar uma elipse (círculo rotacionado aparece como elipse em perspectiva)
    // A altura da elipse diminui para simular rotação 3D
    ctx.beginPath();
    ctx.ellipse(0, 0, 50, 50 * Math.cos(angle * Math.PI / 180), 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Restaurar o estado do contexto
    ctx.restore();
  }
  catch(er){
    console.log(er);
  }
}

console.log(ctx);

function frame(){
  const dt = 1/FPS;

  dz += dt;

  clear();
  point(screen(project({x: 0, y:0, z:1+dz})));
  point(screen(project({x: 0.25, y:1, z:1+dz})));
  circle();
  rotatedCircle(dz);

  setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);