const Joi = require('joi');
const { Profesor } = require('../baseDatos/index');

const validadorRegistro = Joi.object({
  documento: Joi.string().min(8).max(10).required().messages({
    'string.base': 'El documento debe ser un texto.',
    'string.empty': 'El documento es obligatorio.',
    'string.min': 'El documento debe tener al menos {#limit} caracteres.',
    'string.max': 'El documento no puede tener más de {#limit} caracteres.',
    'any.required': 'El documento es un campo obligatorio.'
  }),

  nombre: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
    'any.required': 'El nombre es un campo obligatorio.'
  }),

  apellido: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El apellido debe ser un texto.',
    'string.empty': 'El apellido es obligatorio.',
    'string.min': 'El apellido debe tener al menos {#limit} caracteres.',
    'string.max': 'El apellido no puede tener más de {#limit} caracteres.',
    'any.required': 'El apellido es un campo obligatorio.'
  }),

  profesion: Joi.string().min(2).max(50).required().messages({
    'string.base': 'La profesion debe ser un texto.',
    'string.empty': 'La profesion es obligatorio.',
    'string.min': 'La profesion debe tener al menos {#limit} caracteres.',
    'string.max': 'La profesion no puede tener más de {#limit} caracteres.',
    'any.required': 'La profesion es un campo obligatorio.'
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'El email debe ser un texto.',
    'string.empty': 'El email es obligatorio.',
    'string.email': 'El email debe ser un correo electrónico válido.',
    'any.required': 'El email es un campo obligatorio.'
  }),

  celular: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'El celular debe tener exactamente 10 dígitos numéricos.',
    'string.empty': 'El celular es obligatorio.',
    'any.required': 'El celular es un campo obligatorio.'
  })
});

const registrarProfesor = async (req, res) => {
  try {
    const { error } = validadorRegistro.validate(req.body, { abortEarly: false });

    if (error) {
      const mensajesErrores = error.details.map(detail => detail.message).join('|');
      return res.status(400).json(
      {
          mensaje: 'Errores en la validacion',
          resultado: {
            documento:'',
            nombre:'',
            apellido:'',
            profesion:'',
            email:'',
            celular:'',
            erroresValidacion: mensajesErrores
          }
      });
    }

    const { documento, nombre, apellido, profesion, email, celular} = req.body;
    
    const profesorExistente = await Profesor.findByPk(documento);
    
    if (profesorExistente) {
      return res.status(400).json({ mensaje: 'El profesor ya existe',resultado:null });
    }

    const nuevoProfesor = await Profesor.create({ documento, nombre, apellido, profesion, email, celular });
    res.status(201).json(
      { 
        mensaje:'Profesor creado',
        resultado: {
          documento:nuevoProfesor.documento,
          nombre:nuevoProfesor.nombre,
          apellido:nuevoProfesor.apellido,
          profesion:nuevoProfesor.profesion,
          email:nuevoProfesor.email,
          celular:nuevoProfesor.celular,
          erroresValidacion: ''
        }
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null});
  }
};

const listarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findAll();
    res.status(200).json({ mensaje: 'Profesores listados', resultado: profesor });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

const actualizarProfesor = async (req, res) => {
  try {
    const { documento } = req.params;
    const { nombre, apellido, profesion, email, celular } = req.body;
    const profesor = await Profesor.findByPk(documento);
    
    if (!profesor) {
      return res.status(404).json({ mensaje: 'Profesor no encontrado', resultado: null });
    }
    
    const nuevoProfesor = await Profesor.update({ nombre, apellido, profesion, email, celular });
    res.status(200).json({ mensaje: 'Profesor actualizado', resultado: nuevoProfesor });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

const borrarProfesor = async (req, res) => {
  try {
    const { documento } = req.params;
    const profesor = await Profesor.findByPk(documento);
    
    if (!profesor) {
      return res.status(404).json({ mensaje: 'Profesor no encontrado', resultado: null });
    }
    
    const borrarProfesor = await Profesor.destroy();
    res.status(200).json({ mensaje: 'Profesor eliminado', resultado: borrarProfesor });
  } catch (error) {
    res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

module.exports = {
    registrarProfesor,
    listarProfesor,
    actualizarProfesor,
    borrarProfesor
};