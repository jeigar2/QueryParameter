package es.comepiedras.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import io.javalin.util.FileUtil;



public class AppConfing {
    public static Javalin configureApp() {
        // Configurar el JsonMapper
        ObjectMapper objectMapper = new ObjectMapper();
        Javalin app = Javalin.create(config -> {
            config.staticFiles.add("/public", Location.CLASSPATH);
            //      config.jsonMapper(new JavalinJackson().updateMapper(mapper -> {
            //          mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
            //      }));
        }).start(7071);
        // Configura aquí cualquier otra configuración de Javalin que necesites
        return app;
    }
}