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

// Consulta para obtener la lista de catedráticos desde la tabla profesores
router.get('/catedraticos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT nombre FROM profesores');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener catedráticos:', error);
        res.status(500).json({ error: 'Error al obtener catedráticos' });
    }
});

// Consulta para obtener la lista de cursos desde la tabla cursos
router.get('/cursos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT nombre FROM cursos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
});

// Ruta para crear una nueva publicación en la tabla publicaciones
router.post('/publicaciones', async (req, res) => {
    const { id_usuario, fecha_hora, catedratico, curso, cuerpo } = req.body;
    try {
        const query = 'INSERT INTO publicaciones (id_usuario, fecha_hora, catedratico, curso, cuerpo) VALUES (?, ?, ?, ?, ?)';
        await pool.query(query, [id_usuario, fecha_hora, catedratico, curso, cuerpo]);
        res.json({ message: 'Publicación creada exitosamente' });
    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).json({ error: 'Error al crear publicación' });
    }
});

module.exports = router;
