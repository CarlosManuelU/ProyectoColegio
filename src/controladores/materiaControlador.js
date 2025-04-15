const Joi = require('joi');
const { Materia } = require('../baseDatos/index');

const validadorRegistro = Joi.object({  
    nombre: Joi.string().min(2).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),
  
    horasSemana: Joi.number().integer().min(1).max(168).required().messages({
      'number.base': 'Las horas por semana deben ser un número.',
      'number.integer': 'Las horas por semana deben ser un número entero.',
      'number.min': 'Las horas por semana deben ser al menos {#limit}.',
      'number.max': 'Las horas por semana no pueden superar {#limit}.',
      'any.required': 'Las horas por semana son obligatorias.'
    }),
  
    descripcion: Joi.string().max(255).allow('').messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.max': 'La descripción no puede tener más de {#limit} caracteres.'
    })
  });

const registrarMateria = async (req, res) => {
  try {
    const { error } = validadorRegistro.validate(req.body, { abortEarly: false });

    if (error) {
      const mensajesErrores = error.details.map(detail => detail.message).join('|');
      return res.status(400).json(
      {
          mensaje: 'Errores en la validacion',
          resultado: {
            id:'',
            nombre:'',
            horasSemana:'',
            descripcion:'',
            erroresValidacion: mensajesErrores
          }
      });
    }

    const { id, nombre, horasSemana, descripcion} = req.body;
    
    const materiaExistente = await Materia.findByPk(id);
    
    if (materiaExistente) {
      return res.status(400).json({ mensaje: 'La materia ya existe',resultado:null });
    }

    const nuevaMateria = await Materia.create({ id, nombre, horasSemana, descripcion });
    res.status(201).json(
      { 
        mensaje:'Materia creada',
        resultado: {
          id:nuevaMateria.id,
          nombre:nuevaMateria.nombre,
          horasSemana:nuevaMateria.horasSemana,
          descripcion:nuevaMateria.descripcion,
          erroresValidacion: ''
        }
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null});
  }
};

const listarMateria = async (req, res) => {
  try {
    const materia = await Materia.findAll();
    res.status(200).json({ mensaje: 'Materias listados', resultado: materia });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

const actualizarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, horasSemana, descripcion } = req.body;
    const materia = await Materia.findByPk(id);
    
    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada', resultado: null });
    }
    
    const nuevaMateria = await Materia.update({ nombre, horasSemana, descripcion });
    res.status(200).json({ mensaje: 'Materia actualizada', resultado: nuevaMateria });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

const borrarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await Materia.findByPk(id);
    
    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada', resultado: null });
    }
    
    const borrarMateria = await Materia.destroy();
    res.status(200).json({ mensaje: 'Materia eliminada', resultado: borrarMateria });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};


module.exports = {
    registrarMateria,
    listarMateria,
    actualizarMateria,
    borrarMateria
};