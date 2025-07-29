const { Mascota } = require('../models');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

exports.crearMascota = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USUARIO:", req.usuario);

    const { nombre, raza, edad, detalles } = req.body;

    if (!nombre || !req.file || !req.usuario?.id) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios (nombre, imagen o usuario)' });
    }

    const nuevaMascota = await Mascota.create({
      nombre,
      raza,
      edad: edad ? parseInt(edad) : null,
      imagen: req.file.filename,
      detalles,
      usuarioId: req.usuario.id
    });

    // Ruta para el QR
    const qrURL = `http://localhost:3001/api/mascotas/${nuevaMascota.id}`;
    const qrPath = path.join(__dirname, '..', 'qr', `qr-${nuevaMascota.id}.png`);

    await QRCode.toFile(qrPath, qrURL);

    res.status(201).json({
      mensaje: 'Mascota registrada correctamente',
      mascota: nuevaMascota,
      qr: `/qr/qr-${nuevaMascota.id}.png`
    });

  } catch (error) {
    console.error('Error al crear mascota:', error);
    res.status(500).json({ mensaje: 'Error interno al registrar la mascota' });
  }
};

exports.verMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, {
      include: ['Usuario'] // Asegurate que la asociación esté definida en el modelo
    });

    if (!mascota) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json(mascota);

  } catch (error) {
    console.error('Error al obtener mascota:', error);
    res.status(500).json({ mensaje: 'Error al obtener la mascota' });
  }
};


exports.obtenerMascotasDelUsuario = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({
      where: { usuarioId: req.usuario.id }
    });
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener mascotas' });
  }
};


