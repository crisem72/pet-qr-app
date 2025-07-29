const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, contraseña, whatsapp, instagram } = req.body;

    // Validación básica
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' });
    }

    // Verificar si ya existe el usuario
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Crear el usuario (la contraseña se hashea automáticamente por el hook)
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
      whatsapp,
      instagram
    });

    // Generar token al registrarse
    const token = jwt.sign(
      { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', token });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Verificar si existe el usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

