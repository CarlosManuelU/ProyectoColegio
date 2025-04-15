const express = require('express');
const enrutador = express.Router();
const materiaProfesor = require('../controladores/materiaprofesorControlador');

enrutador.post('/asignar', materiaProfesor.asignarProfesor);
enrutador.get('/listar/:documento_profesor', materiaProfesor.listarMateriaProfesor);

module.exports = enrutador;