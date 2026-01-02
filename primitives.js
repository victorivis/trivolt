class Polyedra{
  vertices
  edges
  center

  constructor(vertices){
    if(vertices){
      this.vertices = vertices;
      
      this.edges = [[]];
      for(let i=0; i<vertices.length; i++){
        this.edges[0].push(i);
      }
    }
  }

  getEdges(){
    return this.edges;
  }

  getVertices(){
    return this.vertices;
  }

  getCenter(){
    return this.center;
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