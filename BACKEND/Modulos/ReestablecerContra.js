const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Configurar la conexión a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'AntonioR25',
    database: 'basededatosfiusac',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ruta para reestablecer la contraseña
// Ruta para reestablecer la contraseña
router.put('/reestablecer-contrasena', async (req, res) => {
    try {
        const { registroAcademico, correo, contra } = req.body;

        // Verificar si el usuario existe en la base de datos con el registro académico y el correo electrónico
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE registroAcademico = ? AND correo = ?', [registroAcademico, correo]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        // Actualizar la contraseña del usuario
        const updateConnection = await pool.getConnection();
        await updateConnection.query('UPDATE usuarios SET contra = ? WHERE registroAcademico = ? AND correo = ?', [contra, registroAcademico, correo]);
        updateConnection.release();

        res.json({ mensaje: 'Contraseña reestablecida correctamente.' });
    } catch (error) {
        console.error('Error al reestablecer la contraseña:', error);
        res.status(500).json({ mensaje: 'Error al reestablecer la contraseña.' });
    }
});


module.exports = router;
