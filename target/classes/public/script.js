function buildQuery() {
    var query = document.getElementById("query").value;
    var arguments = document.getElementById("arguments").value;

    // Hacer la solicitud POST al servidor
    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            query: query,
            arguments: arguments
        })
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById("result").value = result;
    })
    .catch(error => console.error('Error:', error));
}

function clearFields() {
    document.getElementById("query").value = "";
    document.getElementById("arguments").value = "";
    document.getElementById("result").value = "";
}

// Función para calcular y establecer el ancho de los textareas basado en el ancho de la pantalla
function setWidth() {
    var screenWidth = window.innerWidth;
    var textareaWidth = Math.floor(screenWidth * 0.9 / 8); // Asumiendo un tamaño de caracter promedio
    document.getElementById("query").cols = Math.max(50, textareaWidth); // Establece un mínimo de 50 columnas
    document.getElementById("arguments").cols = Math.max(50, textareaWidth);
    document.getElementById("result").cols = Math.max(50, textareaWidth);
}

function copyOutputToClipboard() {
    var outputTextarea = document.getElementById("result");
    outputTextarea.select();
    document.execCommand("copy");
    alert("Salida copiada al portapapeles: " + outputTextarea.value);

// Evento que se dispara cuando se redimensiona la pantalla
window.addEventListener("resize", setWidth);

setWidth();

