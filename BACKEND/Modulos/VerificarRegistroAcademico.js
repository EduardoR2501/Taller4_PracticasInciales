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

router.post('/verificar_registro', async (req, res) => {
    const { registroAcademico, correo } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE registroAcademico = ? AND correo = ?', [registroAcademico, correo]);
        
        if (rows.length > 0) {
            res.json({ exists: true, message: 'Usuario encontrado', usuario: rows[0] });
        } else {
            res.json({ exists: false, message: 'El usuario no está registrado' });
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ exists: false, message: 'Error interno del servidor' });
    }
});

module.exports = router;
