const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Obtener mascotas del usuario logueado
router.get('/', authMiddleware, mascotaController.obtenerMascotasDelUsuario);

// Crear mascota
router.post('/', authMiddleware, upload.single('imagen'), mascotaController.crearMascota);

// Ruta pública para ver info de la mascota
router.get('/:id', mascotaController.verMascota);

module.exports = router;
