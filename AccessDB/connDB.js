const mysql = require("mysql2/promise"); // Módulo para conectarse a MySQL
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

// Obtener la API key y las credenciales de la base de datos desde las variables de entorno
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Configurar la conexión a la base de datos MySQL
async function getDbConnection() {
    return await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });
}

module.exports = {getDbConnection};