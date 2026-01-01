function Gradient(ctx){
  const gradient = ctx.createRadialGradient(
    200, 200, 0,
    200, 200, 200
  );
  gradient.addColorStop(0, '#FFA500');
  gradient.addColorStop(1, '#FFFF00');


  const triangle = new Path2D();
  triangle.moveTo(250, 50);
  triangle.lineTo(300, 150);
  triangle.lineTo(200, 150);
  triangle.closePath();

  //roundedRect(ctx, 400, 5, 200, 200, Number(rounding.value));
  roundedRect(ctx, 400, 5, 200, 200, Number(rounding.value), gradient);
  ctx.fillStyle = gradient;
  ctx.fill(triangle);
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

function rbgSquare(ctx){
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(
          ${Math.floor(255 - 42.5 * i)}
          ${Math.floor(255 - 42.5 * j)}
          0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}

function roundedRect(ctx, x, y, width, height, radius, gradient) {
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
}

function gradientCircle(ctx){
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
  ctx.restore();
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