const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');


// Middleware para procesar los datos JSON enviados en las solicitudes
router.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root', // o tu nombre de usuario si es diferente
    password: 'AntonioR25',
    database: 'basededatosfiusac',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
  

// Ruta para manejar las solicitudes POST de registro de usuario
router.post('/registro', async (req, res) => {
  // Mostrar en la consola los datos recibidos desde el frontend
  console.log('Datos recibidos desde el frontend:', req.body);

  try {
    // Obtener una conexión del pool de conexiones
    const connection = await pool.getConnection();

    // Query SQL para insertar un nuevo usuario en la tabla 'usuarios'
    const query = `
    INSERT INTO usuarios (registroAcademico, nombre, apellido, contra, correo, has_commented)
    VALUES (?, ?, ?, ?, ?, false)
    `;

    // Datos del usuario recibidos desde el frontend
    const { registroAcademico, nombre, apellido, contra, correo } = req.body;
    const has_commented = false; // Por defecto, el usuario no ha comentado

    // Ejecutar la consulta SQL
    await connection.query(query, [registroAcademico, nombre, apellido, contra, correo, has_commented]);

    // Liberar la conexión para que pueda ser utilizada por otros
    connection.release();

    // Enviar una respuesta de éxito al frontend
    res.json({ mensaje: 'Registro de usuario exitoso' });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la inserción de datos
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

// Exporta el router para que pueda ser utilizado en otros archivos
module.exports = router;
