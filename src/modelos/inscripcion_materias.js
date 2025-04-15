const defineMateriaEstudiante = (sequelize, DataTypes) => {
    return sequelize.define('MateriaEstudiante', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            documento_estudiante: {
                type: DataTypes.STRING,
                references: {
                    model: 'estudiante',
                    key: 'documento'
                }
            },
            id_materia: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'materia',
                    key: 'id'
                }
            },
            fecha_inscripcion: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            notaFinal: {
                type: DataTypes.DECIMAL(2, 1),
                allowNull: false,
                validate: {
                    min: 0.0,
                    max: 5.0
                }
            },
            estado: {
                type: DataTypes.ENUM('inscrito', 'aprobado', 'reprobado', 'retirado'),
                allowNull: false
            }
        }, {
            tableName: 'inscripcionmaterias',
            timestamps: true,
        });
    };

  
  module.exports = defineMateriaEstudiante;
  