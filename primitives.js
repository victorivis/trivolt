// Octaedro (8 faces triangulares)


class Octaedro{
  static vertices = [
    {x: 0, y: 0, z: 0.5},    // 0 - topo
    {x: 0, y: 0, z: -0.5},   // 1 - base
    {x: 0.5, y: 0, z: 0},    // 2 - direita
    {x: -0.5, y: 0, z: 0},   // 3 - esquerda
    {x: 0, y: 0.5, z: 0},    // 4 - frontal
    {x: 0, y: -0.5, z: 0}    // 5 - traseira
  ];

  static edges = [
    [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
    [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
  ];

  getEdges(){
    return edges;
  }

  getVertices(){
    return vertices;
  }
}

class Cubo{
  #pzs = -0.25;
  #pze = 0.25
  
  static vertices = [
    {x: 0.25, y: 0.25, z: pzs},
    {x: -0.25, y: 0.25, z: pzs},
    {x: 0.25, y: -0.25, z: pzs},
    {x: -0.25, y: -0.25, z: pzs},

    {x: 0.25, y: 0.25, z: pze},
    {x: -0.25, y: 0.25, z: pze},
    {x: 0.25, y: -0.25, z: pze},
    {x: -0.25, y: -0.25, z: pze},
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
    return edges;
  }

  getVertices(){
    return vertices;
  }
}