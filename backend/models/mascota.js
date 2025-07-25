const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mascota = sequelize.define('Mascota', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    raza: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    imagen: { type: DataTypes.STRING }, // Nombre del archivo
    detalles: { type: DataTypes.TEXT }
  });

  return Mascota;
};
