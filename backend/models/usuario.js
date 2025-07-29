const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 20], // ejemplo de validación
      },
    },
    instagram: {
      type: DataTypes.STRING,
    },
  });

  // Hashear contraseña antes de crear usuario
  Usuario.beforeCreate(async (user) => {
    if (user.contraseña) {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(user.contraseña, salt);
    }
  });

  // También puedes hashear si se actualiza la contraseña
  Usuario.beforeUpdate(async (user) => {
    if (user.changed('contraseña')) {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(user.contraseña, salt);
    }
  });

  return Usuario;
};
