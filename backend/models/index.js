const { Sequelize } = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const Usuario = require('./usuario')(sequelize);
const Mascota = require('./mascota')(sequelize);

// Relaciones
Usuario.hasMany(Mascota, { foreignKey: 'usuarioId' });
Mascota.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = {
  sequelize,
  Usuario,
  Mascota
};
