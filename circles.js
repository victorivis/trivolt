function degreeToRad(angle){
  return angle * Math.PI / 180;
}

function circle(x=150, y=150){
  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.stroke();
}

//CanvasPath.ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void
function circleRotation(x, y, angleX, angleY) {
  const radius = 50;

  ctx.strokeStyle = ENTITY;
  ctx.lineWidth = 5;
  const angle = 30 + 7*dz;

  if(angle == 0) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * Math.PI / 180);
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * Math.abs(Math.cos(degreeToRad(angleX))), radius * Math.abs(Math.cos(degreeToRad(angleY))), 0, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
}

function algunsMovimentos(dz){
  circle(150, 150);
  circleRotation(150, 150, 20*dz, 20*dz);
  circleRotation(150, 150, 20*dz, 0);

  circle(400, 400);
  circleRotation(400, 400, 20*dz, 20*dz);
  circleRotation(400, 400, 0, 20*dz);

  circle(200, 400);
  circleRotation(200, 400, 57*dz, 0);

  circle(400, 100);
  circleRotation(400, 100, 20*dz, 20*dz);
  circleRotation(400, 100, 0, 20*dz);
  circleRotation(400, 100, 10*dz, 0);

  circle(600, 300);
  circleRotation(600, 300, 0, 10*dz);
  circleRotation(600, 300, 0, 10*dz-25);
  circleRotation(600, 300, 0, 10*dz+25);

  circle(700, 120);
  circleRotation(700, 120, 30*dz, 0);
  circleRotation(700, 120, 0, 30*dz);
}