const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mascota = sequelize.define('Mascota', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raza: {
      type: DataTypes.STRING
    },
    edad: {
      type: DataTypes.INTEGER
    },
    imagen: {
      type: DataTypes.STRING // Nombre del archivo guardado
    },
    detalles: {
      type: DataTypes.TEXT
    }
  });

  // Asociación con el modelo Usuario (asume que está definido en models/index.js)
  Mascota.associate = (models) => {
    Mascota.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'Usuario',
      onDelete: 'CASCADE'
    });
  };

  return Mascota;
};
