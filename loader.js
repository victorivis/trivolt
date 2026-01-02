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
    };
    reader.readAsText(file);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', handleFileSelect);
});