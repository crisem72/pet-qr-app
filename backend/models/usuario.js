const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    whatsapp: { type: DataTypes.STRING },
    instagram: { type: DataTypes.STRING }
  });

  Usuario.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(user.contraseña, salt);
  });

  return Usuario;
};
