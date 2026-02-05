const FPS = 60;

//const FOREGROUND = "#0e900e";
//const TEXT = "#00ca00ff";
//const TEXT_LIGHT = "#00FF00";

const BACKGROUND = "#2a2a2a";
const FOREGROUND = "#06a506";
const TEXT = "#00ca00";
const TEXT_LIGHT = "#00ff00";
const DETAILS_TEXT = "#CCCCCC";
const ENTITY = "#960b0b";

const w = 800, h = 600;

function degreeToRad(angle){
  return angle * Math.PI / 180;
}

const increasePerfomance = true;
let angleX=degreeToRad(310), angleY=degreeToRad(320), angleZ=0;
let posX=0, posY=0, posZ=7.8;
let globalPath;