const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

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

router.post('/verificar', async (req, res) => {
    const { registroAcademico, contra } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE registroAcademico = ?', [registroAcademico]);
        
        if (rows.length > 0) {
            const usuario = rows[0];
            if (usuario.contra === contra) {
                res.json({ exists: true, message: 'Inicio de sesión exitoso', usuario });
            } else {
                res.json({ exists: false, message: 'Contraseña incorrecta' });
            }
        } else {
            res.json({ exists: false, message: 'El usuario no está registrado' });
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ exists: false, message: 'Error interno del servidor' });
    }
});

module.exports = router;
