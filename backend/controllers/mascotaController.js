const { Mascota } = require('../models');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

exports.crearMascota = async (req, res) => {
  try {
    const { nombre, raza, edad, detalles } = req.body;
    const imagen = req.file?.filename;
    const usuarioId = req.usuario.id;

    const nuevaMascota = await Mascota.create({
      nombre,
      raza,
      edad,
      imagen,
      detalles,
      usuarioId
    });

    // Generar QR con URL pública (ajustala si subís a hosting)
    const qrURL = `http://localhost:3001/api/mascotas/${nuevaMascota.id}`;
    const qrPath = path.join(__dirname, '..', 'qr', `qr-${nuevaMascota.id}.png`);

    await QRCode.toFile(qrPath, qrURL);

    res.status(201).json({ mensaje: 'Mascota registrada', mascota: nuevaMascota, qr: `/qr/qr-${nuevaMascota.id}.png` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la mascota' });
  }
};

exports.verMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, { include: ['Usuario'] });

    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });

    res.json(mascota);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la mascota' });
  }
};
