import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, 'Token');
    req.usuario = decoded; // Almacena los datos del usuario decodificados en el objeto de solicitud para su uso posterior
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

export { verificarToken };