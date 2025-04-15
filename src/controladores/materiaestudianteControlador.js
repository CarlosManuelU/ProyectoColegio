const { MateriaEstudiante } = require('../baseDatos');

const asignarEstudiante = async (req, res) => {
  try {
    const asignado = await MateriaEstudiante.create(req.body);
    res.status(201).json({ mensaje: "Materia x Estudiante: ", resultado: asignado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};

const listarEstudianteMateria = async (req, res) => {
  try {
    const { documento_estudiante } = req.params;
    const estudiantemateria = await MateriaEstudiante.findAll({ where: { documento_estudiante } });
    res.status(200).json({ mensaje: "Lista de estudiantes con sus materias", resultado: estudiantemateria });
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};

const listarMateriaEstudiante = async (req, res) => {
  try {
    const { id_materia } = req.params;
    const materiasestudiante = await MateriaEstudiante.findAll({ where: { id_materia } });
    res.status(200).json({ mensaje: "Lista de materias con sus estudiantes", resultado: materiasestudiante });
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};

module.exports = {
    asignarEstudiante,
    listarEstudianteMateria,
    listarMateriaEstudiante
};