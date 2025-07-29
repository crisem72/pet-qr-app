const { Sequelize } = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];

// Crear instancia de Sequelize con configuración actual
const sequelize = new Sequelize(config);

// Importar modelos
const Usuario = require('./usuario')(sequelize);
const Mascota = require('./mascota')(sequelize);

// Definir relaciones
Usuario.hasMany(Mascota, {
  foreignKey: 'usuarioId',
  as: 'mascotas' // Alias para acceder a las mascotas de un usuario
});

Mascota.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'Usuario' // Alias para acceder al usuario desde una mascota
});

// Exportar conexión y modelos
module.exports = {
  sequelize,
  Usuario,
  Mascota
};
