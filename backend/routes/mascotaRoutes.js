const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Ruta protegida con JWT y subida de imagen
router.post('/', authMiddleware, upload.single('imagen'), mascotaController.crearMascota);

// Ruta pública para ver la info escaneando el QR
router.get('/:id', mascotaController.verMascota);

module.exports = router;
