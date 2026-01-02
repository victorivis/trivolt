function drawGlowingCircle(ctx, x, y, radius=40) {
  ctx.save();
  const layers = [
    { radius: radius * 0.42, blur: 15, color: '#f72929ff'},
    { radius: radius * 0.6, blur: 30, color: '#840101ff'},
  ];
  
  layers.reverse().forEach(layer => {
    ctx.beginPath();
    ctx.arc(x, y, layer.radius, 0, Math.PI * 2);
    ctx.fillStyle = layer.color;
    ctx.filter = `blur(${layer.blur}px)`;
    ctx.fill();
  });
  ctx.restore();

  ctx.save();
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, '#FFCE45');
  gradient.addColorStop(0.35,'#F4362A' );
  
  const radiusSize = radius;
  const percent = 0.025;
  const blurSize = radiusSize * percent

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.filter = `blur(${blurSize}px) brightness(1.1)`;
  ctx.fill();
  ctx.restore();
}

const orbs = [
  { x: 150 - 200, y: 100, z: 1, radius: 40},
  { x: 300 - 200, y: 200, z: 1, radius: 40},
  { x: 450 - 200, y: 300, z: 1, radius: 40},
  { x: 600 - 200, y: 400, z: 1, radius: 40},
  { x: 800, y: 30 , z: 1, radius: 200},
];

function drawOrbs(ctx, orbs) {
  orbs.forEach(orb => {
    drawGlowingCircle(ctx, orb.x, orb.y, orb.radius);
  });
}