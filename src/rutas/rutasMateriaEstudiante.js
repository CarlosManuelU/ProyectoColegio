const express = require('express');
const enrutador = express.Router();
const materiaEstudiante = require('../controladores/materiaestudianteControlador');

enrutador.post('/asignar', materiaEstudiante.asignarEstudiante);
enrutador.get('/listarEstudianteMateria/:documento_estudiante', materiaEstudiante.listarEstudianteMateria);
enrutador.get('/listarMateriaEstudiante/:id_materia', materiaEstudiante.listarMateriaEstudiante);

module.exports = enrutador;