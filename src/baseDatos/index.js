require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');

const defineEstudiante = require('../modelos/estudiante');
const defineMateria = require('../modelos/materia');
const defineProfesor = require('../modelos/profesor');
const defineMateriaProfesor = require('../modelos/materia_profesor');
const defineMateriaEstudiante = require('../modelos/inscripcion_materias');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const Estudiante = defineEstudiante(sequelize, DataTypes);
const Materia = defineMateria(sequelize, DataTypes);
const Profesor = defineProfesor(sequelize, DataTypes);
const MateriaProfesor = defineMateriaProfesor(sequelize, DataTypes);
const MateriaEstudiante = defineMateriaEstudiante(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));

module.exports = {
    Estudiante,
    Materia,
    Profesor,
    MateriaProfesor,
    MateriaEstudiante,
    sequelize
};