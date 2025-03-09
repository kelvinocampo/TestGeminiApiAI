const { getDbConnection } = require("./connDB.js");

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

module.exports = { executeQuery };