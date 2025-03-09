// Importar las dependencias necesarias
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Librería para interactuar con la API de Google Generative AI
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

// Obtener la API key y las credenciales de la base de datos desde las variables de entorno
const { APIKEY } = process.env;

// Inicializar la instancia de Google Generative AI con la API key
const genAI = new GoogleGenerativeAI(APIKEY);

// Función para generar una consulta SQL usando la IA
async function sendMessage(prompt, accessDB = true) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if (accessDB) {
            // Pedir a la IA que genere una consulta SQL basada en el prompt
            const result = await model.generateContent([
                `Genera solo la consulta SQL para la siguiente solicitud: "${prompt}". ` +
                `Las tablas disponibles son: user (id_user, name, email) y product (id_product, name, description).`,
            ]);

            const sqlQuery = result.response.text();
            return sqlQuery;
        } else {
            // Pedir a la IA que genere una consulta SQL basada en el prompt
            const result = await model.generateContent([
                `Esta es la respuesta de la base de datos: "${prompt}". ` +
                `Las tablas disponibles son: user (id_user, name, email) y product (id_product, name, description).`,
            ]);

            const sqlQuery = result.response.text();
            return sqlQuery;
        }
    } catch (error) {
        console.error("Error al generar la consulta SQL:", error.message);
        return null;
    }
}

module.exports = { sendMessage };
