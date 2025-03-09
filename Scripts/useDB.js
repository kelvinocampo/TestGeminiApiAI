// Importar las dependencias necesarias
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Librería para interactuar con la API de Google Generative AI
const readline = require("readline"); // Módulo para leer la entrada del usuario desde la consola
const mysql = require("mysql2/promise"); // Módulo para conectarse a MySQL
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

// Obtener la API key y las credenciales de la base de datos desde las variables de entorno
const { APIKEY, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Configurar la interfaz readline para leer la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Inicializar la instancia de Google Generative AI con la API key
const genAI = new GoogleGenerativeAI(APIKEY);

// Configurar la conexión a la base de datos MySQL
async function getDbConnection() {
    return await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });
}

// Función para ejecutar consultas SQL en la base de datos
async function executeQuery(sql) {
    const connection = await getDbConnection();
    try {
        const [rows] = await connection.execute(sql);
        return rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error.message);
        return null;
    } finally {
        await connection.end(); // Cerrar la conexión
    }
}

function cleanSQLQuery(sqlQuery) {
    // Elimina los bloques de código (```sql) y cualquier otro texto no deseado
    return sqlQuery.replace(/```sql|```/g, "").trim();
}

// Función para generar una consulta SQL usando la IA
async function generateSQLQuery(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Pedir a la IA que genere una consulta SQL basada en el prompt
        const result = await model.generateContent([
            `Genera solo la consulta SQL para la siguiente solicitud: "${prompt}". ` +
            `Las tablas disponibles son: user (id_user, name, email) y product (id_product, name, description).`,
        ]);

        const sqlQuery = result.response.text();
        return sqlQuery;
    } catch (error) {
        console.error("Error al generar la consulta SQL:", error.message);
        return null;
    }
}

// Función principal para manejar el flujo de trabajo
async function main() {
    try {
        // Solicitar al usuario que ingrese un prompt
        rl.question("Por favor, ingresa tu solicitud (ej: 'Listar todos los usuarios'): ", async (prompt) => {
            // Generar la consulta SQL usando la IA
            const sqlQuery = await generateSQLQuery(prompt);

            if (sqlQuery) {
                // Limpiar la consulta SQL
                const cleanedQuery = cleanSQLQuery(sqlQuery);
                console.log("Consulta SQL generada y limpiada:", cleanedQuery);

                // Ejecutar la consulta SQL en la base de datos
                const result = await executeQuery(cleanedQuery);

                if (result) {
                    console.log("Resultado de la consulta:");
                    console.log(result);
                }
            }

            // Cerrar la interfaz readline
            rl.close();
        });
    } catch (error) {
        console.error("Error en el flujo principal:", error.message);
    }
}

// Llamar a la función principal
main();