const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

router.use(express.json());

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

// Obtener todas las publicaciones
router.get('/publicaciones', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM publicaciones');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).json({ mensaje: 'Error al obtener publicaciones' });
    }
});

module.exports = router;
