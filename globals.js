const FPS = 60;

const BACKGROUND = "#2a2a2aff";
const FOREGROUND = "#0e900e";
const ENTITY = "#960b0bff";

const w = 800, h = 600;

function degreeToRad(angle){
  return angle * Math.PI / 180;
}

const increasePerfomance = true;
let angleX=degreeToRad(310), angleY=degreeToRad(320), angleZ=0;
let posX=0, posY=0, posZ=7.8;
let globalPath;