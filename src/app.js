require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const estudianteRutas = require('./rutas/rutasEstudiante');
const profesorRutas = require('./rutas/rutasProfesor');
const materiaRutas = require('./rutas/rutasMateria');
const materiaprofesorRutas = require('./rutas/rutasMateriaProfesor');
const materiaestudianteRutas = require('./rutas/rutasMateriaEstudiante');

app.use(express.json());
app.use(cors());

app.use('/api/estudiante', estudianteRutas);
console.log('✔️ Rutas de estudiante montadas');
app.use('/api/profesor', profesorRutas);
console.log('✔️ Rutas de profesores montadas');
app.use('/api/materia', materiaRutas);
console.log('✔️ Rutas de materias montadas');
app.use('/api/materia_profesor', materiaprofesorRutas);
console.log('✔️ Rutas de materia x profesor montadas');
app.use('/api/inscripcion_materias', materiaestudianteRutas);
console.log('✔️ Rutas de materia x estudiante montadas');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
