const defineMateriaProfesor = (sequelize, DataTypes) => {
  return sequelize.define('MateriaProfesor', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      documento_profesor: {
          type: DataTypes.STRING,
          references: {
              model: 'profesor',
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
      fecha_asignacion: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          unique: 'fecha_asignacion'
      }
  }, {
      tableName: 'materiaprofesor',
      timestamps: true,
  });
};

module.exports = defineMateriaProfesor;
