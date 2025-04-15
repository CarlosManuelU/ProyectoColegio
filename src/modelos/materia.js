const defineMateria = (sequelize, DataTypes) => {
    return sequelize.define('Materia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'nombre'
        },
        horasSemana: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'materia',
        timestamps: true
    });
};

module.exports = defineMateria;
