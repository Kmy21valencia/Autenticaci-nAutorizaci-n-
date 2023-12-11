const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  
  const token = req.header('Authorization');

  
  if (!token) {
    return res.status(401).json({ msg: 'Acceso no autorizado. No se proporcionó un token.' });
  }

  try {
    
    const decoded = jwt.verify(token, 'secreto'); 

    
    req.usuario = decoded.usuario;

   
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = {
  verificarToken
};
