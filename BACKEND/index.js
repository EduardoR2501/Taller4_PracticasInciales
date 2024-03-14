const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

// Importar los módulos de los enrutadores
const registrarUsuarioRouter = require('./Modulos/RegistrarUsuario');
const consultaDeExistenciaRouter = require('./Modulos/ConsultaExistencia');
const reestablecerContraRouter = require('./Modulos/ReestablecerContra'); // Importar el nuevo enrutador
const verificarRegistroAcademicoRouter = require('./Modulos/VerificarRegistroAcademico');

app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend

// Usar los enrutadores
app.use(registrarUsuarioRouter);
app.use(consultaDeExistenciaRouter);
app.use(reestablecerContraRouter); // Usar el nuevo enrutador
app.use(verificarRegistroAcademicoRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
