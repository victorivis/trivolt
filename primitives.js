class Polyedra{
  vertices
  edges
  center
  translation
  isOn

  constructor(vertices){
    this.translation = {dx: 0, dy: 0, dz: 0};

    if(vertices){
      this.vertices = vertices;
      
      this.edges = [[]];
      for(let i=0; i<vertices.length; i++){
        this.edges[0].push(i);
      }
    }

    this.isOn = true;
  }

  show(){
    this.isOn=true;
  }

  hide(){
    this.isOn=false;
  }

  getEdges(){
    if(this.isOn) return this.edges;
    return [];
  }

  getVertices(){
    const translated = [];
    for(let v of this.vertices){
      translated.push(translate(v, this.translation));
    }
    return translated;
  }

  getCenter(){
    return translate(this.center, this.translation);
  }

  move({dx, dy, dz}){
    this.translation = {dx: this.translation.dx + dx, dy: this.translation.dy + dy, dz: this.translation.dz + dz};
  }
}

class Octaedro extends Polyedra{
  constructor(x, y, z, r){
    super();

    this.center = {x, y, z};

    this.vertices = [];

    for(let i=0; i<2; i++){
      this.vertices.push({x, y, z: z + (i==0 ? r : -r)});
    }

    for(let i=0; i<2; i++){
      this.vertices.push({x, y: y + (i==0 ? r : -r), z});
    }

    for(let i=0; i<2; i++){
      this.vertices.push({x: x + (i==0 ? r : -r), y, z});
    }

    this.edges = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
    ];
  }
}

class Cube extends Polyedra{
  constructor(x, y, z, r){
    super();

    this.center = {x, y, z};

    this.vertices = [];
    for(let i=0; i<2; i++){
      for(let j=0; j<2; j++){
        for(let k=0; k<2; k++){
          this.vertices.push({x: x + (i==0 ? r : -r), y: y + (j==0 ? r : -r), z: z + (k==0 ? r : -r)});
        }
      }
    }

    this.edges = [
      [2, 0, 1, 3],
      [6, 4, 5, 7],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
  }
}

class TriangularPrisme extends Polyedra{
  constructor(x, y, z, l, h){
    super();
    
    const r = l/Math.sqrt(3);
    const th = l*Math.sqrt(3)/2;
    const tz = z + th*2/3;

    this.vertices = [
      {x, y: y+h/2, z: tz},
      {x: x-l/2, y: y+h/2, z: z-th/3},
      {x: x+l/2, y: y+h/2, z: z-th/3},

      {x, y: y-h/2, z: tz},
      {x: x-l/2, y: y-h/2, z: z-th/3},
      {x: x+l/2, y: y-h/2, z: z-th/3},
    ];
    
    this.edges = [
      [0, 1, 2],
      [3, 4, 5],
      [0, 3],
      [1, 4],
      [2, 5],
    ];
  }
}