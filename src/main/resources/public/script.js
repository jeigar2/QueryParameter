function buildQuery() {
    var content = document.getElementById("content").value;

    // Hacer la solicitud POST al servidor
    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            "content": content
        })
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById("result").value = result;
    })
    .catch(error => console.error('Error:', error));
}

function clearFields() {
    document.getElementById("content").value = "";
    document.getElementById("result").value = "";
}

// Función para calcular y establecer el ancho de los textareas basado en el ancho de la pantalla
function setWidth() {
    var screenWidth = window.innerWidth;
    var textareaWidth = Math.floor(screenWidth * 0.9 / 8); // Asumiendo un tamaño de caracter promedio
    document.getElementById("content").cols = Math.max(50, textareaWidth); // Establece un mínimo de 50 columnas
    document.getElementById("result").cols = Math.max(50, textareaWidth);
}

function copyOutputToClipboard() {
    var outputTextarea = document.getElementById("result");
    outputTextarea.select();
    document.execCommand("copy");
    //alert("Salida copiada al portapapeles: " + outputTextarea.value);
}
// Evento que se dispara cuando se redimensiona la pantalla
window.addEventListener("resize", setWidth);
// Eventos de clic para los botones
document.getElementById("buildButton").addEventListener("click", buildQuery);
document.getElementById("clearButton").addEventListener("click", clearFields);

setWidth();

/*
2023-10-27 12:24:10,203 DEBUG Clase.metodo1 ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,203 DEBUG Clase.metodo1 ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,204 DEBUG Clase.metodo1 ==>  Preparing: SELECT T0.Campo1, T0.Campo2, T0.Id_T1, T0.Campo4, T1.Campo5, T1.Campo6 FROM Tabla0 T0 LEFT JOIN Tabla1 T1 ON T0.Campo1 = T1.Id WHERE T0.Id_T1 IN ( ? ) AND T0.Campo4 IN ( ? ) AND T0.Campo7 =? AND T0.Campo8 =? AND T0.Campo1 IN ( ? )
2023-10-27 12:24:10,204 DEBUG Clase.metodo1 ==> Parameters: 19070117440(String), 15/07/2019(String), 2(Long), 2(Long), 2306061014267641601000000110267(BigDecimal)
2023-10-27 12:24:10,250 TRACE Clase.metodo1 <==    Columns: Campo1, Campo2, Id_T1, Campo4, Campo5, Campo6
2023-10-27 12:24:10,250 TRACE Clase.metodo1 <==    Columns: Campo1, Campo2, Id_T1, Campo4, Campo5, Campo6
*/