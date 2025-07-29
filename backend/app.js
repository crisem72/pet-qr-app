require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/qr', express.static('qr'));

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ⬇️ Agregá esta parte para las mascotas
const mascotaRoutes = require('./routes/mascotaRoutes');
app.use('/api/mascotas', mascotaRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Conexión con la base de datos y levantar servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  });
});
