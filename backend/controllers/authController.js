const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, contraseña, whatsapp, instagram } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({ nombre, email, contraseña, whatsapp, instagram });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
