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
2023-10-27 12:24:10,203 DEBUG IFacturaATRPdPDAO.findFicherosBasePdPDTO ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,203 DEBUG IFacturaATRPdPDAO.findFicherosBasePdPDTO ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,204 DEBUG IFacturaATRPdPDAO.findFicherosBasePdPDTO ==>  Preparing: SELECT FAC.X_FACTURA_ATR_HUELLA, FAC.PUN_X_CUPS_20, FAC.D_CODIGO_FISCAL, FAC.F_FECHA_FACTURA, KGT.FIC_X_NOMBRE_FICHERO AS NOMBRE_FICHERO_ZIP, KGT.D_NOMBRE_FICHERO_PLANO AS NOMBRE_FICHERO_PLANO FROM V_SAT_FACTURAS_ATR FAC LEFT JOIN KGT_FICHEROS_BLOQUES KGT ON FAC.X_FACTURA_ATR_HUELLA = KGT.X_HUELLA WHERE FAC.D_CODIGO_FISCAL IN ( ? ) AND FAC.F_FECHA_FACTURA IN ( ? ) AND FAC.LINEG_X_LINEA_NEGOCIO=? AND FAC.PAI_X_PAIS=? AND FAC.X_FACTURA_ATR_HUELLA IN ( ? )
2023-10-27 12:24:10,204 DEBUG IFacturaATRPdPDAO.findFicherosBasePdPDTO ==> Parameters: 19070117440(String), 15/07/2019(String), 2(Long), 2(Long), 2306061014267641601000000110267(BigDecimal)
2023-10-27 12:24:10,250 TRACE IFacturaATRPdPDAO.findFicherosBasePdPDTO <==    Columns: X_FACTURA_ATR_HUELLA, PUN_X_CUPS_20, D_CODIGO_FISCAL, F_FECHA_FACTURA, NOMBRE_FICHERO_ZIP, NOMBRE_FICHERO_PLANO
2023-10-27 12:24:10,250 TRACE IFacturaATRPdPDAO.findFicherosBasePdPDTO <==    Columns: X_FACTURA_ATR_HUELLA, PUN_X_CUPS_20, D_CODIGO_FISCAL, F_FECHA_FACTURA, NOMBRE_FICHERO_ZIP, NOMBRE_FICHERO_PLANO
*/