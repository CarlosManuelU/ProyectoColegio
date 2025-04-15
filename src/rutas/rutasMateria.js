const express = require('express');
const enrutador = express.Router();
const materiaControlador = require('../controladores/materiaControlador');

enrutador.post('/registrar', materiaControlador.registrarMateria);
enrutador.get('/listar', materiaControlador.listarMateria);
enrutador.put('/actualizar/:documento', materiaControlador.actualizarMateria);
enrutador.delete('/borrar/:documento', materiaControlador.borrarMateria);

module.exports = enrutador;