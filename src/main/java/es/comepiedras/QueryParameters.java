package es.comepiedras;

import es.comepiedras.config.AppConfing;
import io.javalin.Javalin;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QueryParameters {
    public static void main(String[] args) {
        Javalin app = AppConfing.configureApp();

        // Configurar ruta para servir la página HTML
        //app.get("/", ctx -> ctx.render("/index.html")); Esto está dando error, así que lo comento

        // Configurar ruta para manejar la solicitud de la query y los argumentos
        app.post("/query", ctx -> {
            // Obtener la query y los argumentos del cuerpo de la solicitud
            String query = ctx.formParam("query");
            String arguments = ctx.formParam("arguments");

            // Crear la query con los argumentos reemplazados
            String queryWithArguments = QueryParameters.reemplazarSQLConParametros( query, arguments);

            // Enviar la query con los argumentos reemplazados como respuesta
            ctx.result(queryWithArguments);
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
