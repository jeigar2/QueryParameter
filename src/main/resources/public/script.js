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
        var queries = result.split('\n').filter(Boolean); // Eliminar líneas vacías
        buildTable(queries);
        //document.getElementById("result").value = result;
    })
    .catch(error => console.error('Error:', error));
}

function clearFields() {
    document.getElementById("content").value = "";
    clearTable();
}

// Función para calcular y establecer el ancho de los textareas basado en el ancho de la pantalla
function setWidth() {
    var screenWidth = window.innerWidth;
    var textareaWidth = Math.floor(screenWidth * 0.9 / 8); // Asumiendo un tamaño de caracter promedio
    document.getElementById("content").cols = Math.max(50, textareaWidth); // Establece un mínimo de 50 columnas
    //document.getElementById("result").cols = Math.max(50, textareaWidth);
}

// Función para construir la tabla con las queries y los enlaces de copiar
function buildTable(queries) {
    var tableBody = document.querySelector("#queryTable tbody");
    tableBody.innerHTML = "";

    queries.forEach(query => {
        var row = document.createElement("tr");
        // Celda de la query
        var queryCell = document.createElement("td");
        queryCell.innerHTML = '<pre data-dependencies="sql" class="language-sql" tabindex="0">' + formatSQL(query) + '</pre>';
        queryCell.addEventListener("click", function() {copyClipboard(query)});
        row.appendChild(queryCell);
        tableBody.appendChild(row);

    });
     // Realizar el resaltado de sintaxis después de construir la tabla
     //Prism.highlightAll(); // no es necesario
}

// Función para borrar todas las filas de la tabla excepto la primera (encabezado)
function clearTable() {
    var tableBody = document.querySelector("#queryTable tbody");
    tableBody.innerHTML = ""; // Elimina todas las filas del cuerpo de la tabla
}

function copyClipboard(query) {
            // Copiar el texto de la query al portapapeles
            navigator.clipboard.writeText(query)
                .then(() => console.error("Query copiada"))
                .catch(err => console.error('Error al copiar: ', err));
        }

function formatSQL(sqlString) {
    // Reemplazar palabras clave SQL con spans con clase de token
    var formattedSQL = sqlString.replace(/\b(SELECT|FROM|LEFT JOIN|WHERE|ORDER BY|HAVING|GROUP BY|AND|OR)\b/gi, '<span class="token keyword">$1</span>');
    formattedSQL = formattedSQL.replace(/\b(AS|COUNT|MAX|IS NOT|NULL|DESC|ON|IN|BETWEEN|DISTINCT|ASC|DESC|NOT|CASE|THEN|WITH|INTO|LIKE|UNION|ALL|VALUES)\bi/g, '<span class="token keyword2">$1</span>');
    // Reemplazar identificadores (entre backticks) con spans con clase de token
    formattedSQL = formattedSQL.replace(/(`[^`]+`)/g, '<span class="token identifier">$1</span>');
    // Reemplazar funciones con spans con clase de token
    formattedSQL = formattedSQL.replace(/\b(COUNT|MAX)\b/gi, '<span class="token function">$1</span>');
    // Reemplazar operadores con spans con clase de token
    formattedSQL = formattedSQL.replace(/([\(\),]|[\s]=[\s]|[\s]\*[\s]|[\s]\.[\s]|[\s]IS[\s])/gi, '<span class="token punctuation">$1</span>');
    // Agregar saltos de línea después de cada punto y coma
    formattedSQL = formattedSQL.replace(/;/g, ';\n');
    return '<code class="language-sql">' + formattedSQL + '</code>';
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
