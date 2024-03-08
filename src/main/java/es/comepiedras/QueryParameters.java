package es.comepiedras;

import es.comepiedras.config.AppConfing;
import io.javalin.Javalin;
//import org.json.JSONArray;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.List;

public class QueryParameters {

    public static final String PARAMETERS = "Parameters:";
    public static final String PREPARING = "Preparing:";

    public static void main(String[] args) {
        Javalin app = AppConfing.configureApp();

        // Configurar ruta para servir la página HTML
        //app.get("/", ctx -> ctx.render("/index.html")); Esto está dando error, así que lo comento

        // Configurar ruta para manejar la solicitud de la query
        app.post("/query", ctx -> {
            // Obtener la query del cuerpo de la solicitud
            String content = ctx.formParam("content");

//            JSONArray queries = new JSONArray();
            String[] lines = content.split("\n");
            String currentQuery = null;
            List<String> queriesWithParams = new ArrayList<>();

            for (String line : lines) {
                if (line.contains(PREPARING)) {
                    // Guardar la query actual
                    currentQuery = line;//line.substring(11); // Eliminamos "Preparing:" del inicio de la línea
                } else if (line.contains(PARAMETERS)) {
                    // Si encontramos "Parameters:", esta línea son los parámetros de la query anterior
                    if (currentQuery != null) {
                        String params = line.substring(line.indexOf(PARAMETERS)+11).trim(); // Eliminamos "Parameters:" del inicio de la línea
                        // Crear la query con los argumentos reemplazados
                        queriesWithParams.add(QueryParameters.reemplazarSQLConParametros( currentQuery, params));
                    }
                }
            }

            // Enviar la query con los argumentos reemplazados como respuesta
            ctx.result(String.join("\n", queriesWithParams));
        });

    }

    private static String reemplazarSQLConParametros(String query, String paramLine) {

        // Encuentra la consulta SQL
        Pattern queryPattern = Pattern.compile("Preparing: (.+)");
        Matcher queryMatcher = queryPattern.matcher(query);

        if (queryMatcher.find()) {
            query = queryMatcher.group(1);
        }

        // paramLine = paramLine.substring(paramLine.indexOf(":") + 1);
        // Encuentra los valores de los parámetros
        Pattern paramPattern = Pattern.compile("([^,]*)\\(([^)]+)\\)(?:,\\s*)?");
        Matcher paramMatcher = paramPattern.matcher(paramLine);

        while (paramMatcher.find()) {
            String paramName = paramMatcher.group(2);
            String paramValue = paramMatcher.group(1);
            System.out.println("parametro: " + paramName);
            if ("Long".equals(paramName) || "BigDecimal".equals(paramName)) {
                query = query.replaceFirst("\\?", paramValue);
            } else if ("String".equals(paramName)) {
                paramValue = paramValue.replace("\"", ""); // Eliminar comillas dobles si estÃ¡n presentes
                query = query.replaceFirst("\\?", "'" + paramValue + "'");
            } else if ("Timestamp".equals(paramName)) {
                query = query.replaceFirst("\\?",
                        "TO_TIMESTAMP('" + paramValue.substring(0, 19) + "', 'YYYY-MM-DD HH24:MI:SS')");
            } else {
                System.out.println("tipo de parametro: " + paramName + " , valor: " + paramValue);
                // query = query.replaceFirst("\\?", "'" + paramValue + "'");
            }
        }
        System.out.println(query);
        return query;
    }
}
