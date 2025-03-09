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

// Obtener el modelo generativo deseado
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Iniciar el chat con un historial inicial
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Mi nombre es Kevin y Tengo 16 años" }],
        },
        {
            role: "model",
            parts: [{ text: "Hola Kevin, ¿en qué puedo ayudarte hoy?" }],
        },
    ],
});

/**
 * Función para enviar un mensaje al chat y recibir una respuesta en streaming.
 * @param {string} prompt - El mensaje o prompt del usuario.
 */
async function sendMessageChatIA(prompt) {
    try {
        // Enviar el mensaje al chat y obtener la respuesta en streaming
        const result = await chat.sendMessageStream(prompt);

        // Mostrar la respuesta en streaming chunk por chunk
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            process.stdout.write(chunkText); // Escribir el chunk en la consola sin saltos de línea
        }

        // Añadir un salto de línea al final para mejorar la legibilidad
        process.stdout.write("\n");
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al enviar el mensaje:", error.message);
    }
}

/**
 * Función para iniciar la conversación con el usuario.
 */
function startChat() {
    // Solicitar al usuario que ingrese un mensaje o prompt
    rl.question("Por favor, ingresa tu mensaje o prompt (escribe 'close' para salir): ", async (prompt) => {
        if (prompt.toLowerCase() === "close") {
            // Cerrar la interfaz readline y finalizar el programa
            rl.close();
            return;
        }

        // Enviar el mensaje al chat y mostrar la respuesta
        await sendMessageChatIA(prompt);

        // Llamar recursivamente a la función para continuar la conversación
        startChat();
    });
}

// Iniciar la conversación
startChat();