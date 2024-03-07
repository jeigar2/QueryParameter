# QueryParameter v.0.2

## Descripción en español:

El programa es una aplicación web que tiene la capacidad de recibir una consulta SQL junto con sus parámetros correspondientes. Por un lado, recibe la consulta SQL que contiene marcadores de posición representados por el símbolo '?', y por otro lado, recibe los parámetros junto con sus tipos de datos. El objetivo principal de esta aplicación es construir la consulta SQL final sustituyendo los marcadores de posición por los valores correspondientes de los parámetros proporcionados.

Una vez que la aplicación recibe la consulta SQL y los parámetros, realiza el proceso de sustitución, asegurándose de que los tipos de datos se correspondan correctamente con los marcadores de posición en la consulta SQL. Posteriormente, devuelve la consulta SQL finalizada, lista para ser ejecutada en la base de datos.

Esta aplicación es útil en entornos donde se necesite ejecutar consultas SQL dinámicas y personalizadas, permitiendo la flexibilidad de proporcionar parámetros de forma dinámica sin comprometer la seguridad de la aplicación.

## Descripción en inglés:

The program is a web application capable of receiving an SQL query along with its corresponding parameters. On one hand, it receives the SQL query containing placeholders represented by the symbol '?', and on the other hand, it receives the parameters along with their data types. The main objective of this application is to construct the final SQL query by replacing the placeholders with the corresponding parameter values provided.

Once the application receives the SQL query and parameters, it performs the substitution process, ensuring that the data types match correctly with the placeholders in the SQL query. Subsequently, it returns the finalized SQL query, ready to be executed in the database.

This application is useful in environments where dynamic and customized SQL queries need to be executed, allowing the flexibility of providing parameters dynamically without compromising the security of the application.

## Ejemplo

- Ejemplo de traza

```sql
2023-10-27 12:24:10,203 DEBUG Clase.metodo1 ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,203 DEBUG Clase.metodo1 ooo Using Connection [org.jboss.jca.adapters.jdbc.jdk8.WrappedConnectionJDK8@62b30f94]
2023-10-27 12:24:10,204 DEBUG Clase.metodo1 ==>  Preparing: SELECT T0.Campo1, T0.Campo2, T0.Id_T1, T0.Campo4, T1.Campo5, T1.Campo6 FROM Tabla0 T0 LEFT JOIN Tabla1 T1 ON T0.Campo1 = T1.Id WHERE T0.Id_T1 IN ( ? ) AND T0.Campo4 IN ( ? ) AND T0.Campo7 =? AND T0.Campo8 =? AND T0.Campo1 IN ( ? )
2023-10-27 12:24:10,204 DEBUG Clase.metodo1 ==> Parameters: 19070117440(String), 15/07/2019(String), 2(Long), 2(Long), 2306061014267641601000000110267(BigDecimal)
2023-10-27 12:24:10,250 TRACE Clase.metodo1 <==    Columns: Campo1, Campo2, Id_T1, Campo4, Campo5, Campo6
2023-10-27 12:24:10,250 TRACE Clase.metodo1 <==    Columns: Campo1, Campo2, Id_T1, Campo4, Campo5, Campo6
```

- Ejemplo de parámetros: `19070117440(String), 15/07/2019(String), 2(Long), 2(Long), 2306061014267641601000000110267(BigDecimal)`

- Salida

```sql
SELECT T0.Campo1, T0.Campo2, T0.Id_T1, T0.Campo4, T1.Campo5, T1.Campo6 FROM Tabla0 T0 LEFT JOIN Tabla1 T1 ON T0.Campo1 = T1.Id WHERE T0.Id_T1 IN ( '204 DEBUG Clase.metodo1 ==> Parameters: 19070117440' ) AND T0.Campo4 IN ( '15/07/2019' ) AND T0.Campo7 =2 AND T0.Campo8 =2 AND T0.Campo1 IN ( 2306061014267641601000000110267 )
```