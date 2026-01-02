class Octaedro{
  static vertices = [
    {x: 0, y: 0, z: 0.5},
    {x: 0, y: 0, z: -0.5},
    {x: 0.5, y: 0, z: 0},
    {x: -0.5, y: 0, z: 0},
    {x: 0, y: 0.5, z: 0},
    {x: 0, y: -0.5, z: 0}
  ];

  static edges = [
    [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
    [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
  ];

  getEdges(){
    return Octaedro.edges;
  }

  getVertices(){
    return Octaedro.vertices;
  }
}

class Cubo{
  static pzs = -0.25;
  static pze = 0.25
  
  static vertices = [
    {x: 0.25, y: 0.25, z: Cubo.pzs},
    {x: -0.25, y: 0.25, z: Cubo.pzs},
    {x: 0.25, y: -0.25, z: Cubo.pzs},
    {x: -0.25, y: -0.25, z: Cubo.pzs},

    {x: 0.25, y: 0.25, z: Cubo.pze},
    {x: -0.25, y: 0.25, z: Cubo.pze},
    {x: 0.25, y: -0.25, z: Cubo.pze},
    {x: -0.25, y: -0.25, z: Cubo.pze},
  ];

  static edges = [
    [2, 0, 1, 3],
    [6, 4, 5, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  getEdges(){
    return Cubo.edges;
  }

  getVertices(){
    return Cubo.vertices;
  }

  getCenter(){
    const center = {x:0, y:0, z:0};
    for(let v of this.getVertices()){
      center.x += v.x;
      center.y += v.y;
      center.z += v.z;
    }

    center.x = (center.x / this.getVertices().length);
    center.y = (center.y / this.getVertices().length);
    center.z = (center.z / this.getVertices().length);

    console.log(center);
    return center;
  }
}