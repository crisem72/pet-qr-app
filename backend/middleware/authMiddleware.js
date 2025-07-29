const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ mensaje: 'Token no proporcionado o malformado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded; // ahora disponible en req.usuario en las rutas protegidas
    next();
    
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};
