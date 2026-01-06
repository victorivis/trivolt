const fileInput = document.getElementById('file-input');
const fileContent = document.getElementById('file-content');

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    console.log("Arquivo selecionado:", file.name);

    const fileInfo = document.getElementById('file-info');
    fileInfo.textContent = `Nome do arquivo: ${file.name}, Tamanho: ${file.size} bytes`;
    const reader = new FileReader();
    
    reader.onload = function(e) {
      fileContent.textContent = e.target.result;

      if(file.name.endsWith('.obj')){
        parseObjToPolyedra(e.target.result);
      }
    };
    reader.readAsText(file);
  }
}

let loadedPolyedra = [];

function parseObjToPolyedra(objString){
  const faces = [];
  const vertices = [];

  objString.split('\n').forEach(element => {
    const line = element.trim().split(/\s+/);

    const identifier = line.shift();
    if(identifier == 'f'){
      faces.push(
        line.map(e => Number(e)-1)
      );
      console.log('f', line);
    }
    if(identifier == 'v'){
      vertices.push(
        {
          x: Number(line[0]),
          y: Number(line[1]),
          z: Number(line[2]),
        }
      );
      console.log('v', line);
    }
  });

  const temp = new Polyedra(vertices, faces);
  console.log("vertices", temp.getVertices());
  console.log("edges", temp.getEdges());

  loadedPolyedra.push(
    new Polyedra(vertices, faces)
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', handleFileSelect);
});