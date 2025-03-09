const { GoogleGenerativeAI } = require("@google/generative-ai"); // Librería para interactuar con la API de Google Generative AI
const fs = require("fs"); // Módulo para leer la entrada del usuario desde la consola
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

const { APIKEY } = process.env;

const genAI = new GoogleGenerativeAI(APIKEY);

// Converts local file information to base64
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = "¿Que contiene esta imagen?";

    const imageParts = [
        fileToGenerativePart("./imgs/Donut.jpg", "image/jpg"),
    ];

    const generatedContent = await model.generateContent([prompt, ...imageParts]);

    console.log(generatedContent.response.text());
}

run();