// Importar las dependencias necesarias
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Librería para interactuar con la API de Google Generative AI
const readline = require("readline"); // Módulo para leer la entrada del usuario desde la consola
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

// Obtener la API key desde las variables de entorno
const { APIKEY } = process.env;

// Configurar la interfaz readline para leer la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Inicializar la instancia de Google Generative AI con la API key
const genAI = new GoogleGenerativeAI(APIKEY);

// Función principal para realizar una pregunta al modelo de IA
async function askQuestion(prompt) {
    try {
        // Obtener el modelo generativo deseado (en este caso, "gemini-2.0-flash")
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Generar contenido utilizando el modelo y el prompt proporcionado
        const result = await model.generateContent(prompt);

        // Mostrar la respuesta generada por el modelo en la consola
        console.log("Respuesta del modelo:");
        console.log(result.response.text());
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al generar contenido:", error.message);
    } finally {
        // Cerrar la interfaz readline después de completar la operación
        rl.close();
    }
}

// Función principal para realizar una pregunta al modelo de IA e imprimir la respuesta por partes
async function generateContentStream(prompt) {
    try {
        // Obtener el modelo generativo deseado
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generar contenido en streaming utilizando el prompt
        const result = await model.generateContentStream(prompt);

        // Mostrar el contenido en streaming chunk por chunk
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            process.stdout.write(chunkText); // Escribir el chunk en la consola sin saltos de línea
        }
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al generar contenido en streaming:", error.message);
    } finally {
        rl.close()
    }
}

// Solicitar al usuario que ingrese un prompt
rl.question("Por favor, ingresa tu pregunta o prompt: ", async (prompt) => {
    // Llamar a la función askQuestion con el prompt proporcionado por el usuario
    // await askQuestion(prompt);

    // Llamar a la función generateContentStream con el prompt proporcionado por el usuario
    await generateContentStream(prompt)
});