const verificarPermisoAdministrador = (req, res, next) => {
  
  if (req.usuario.rol === 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado. No tienes los permisos de administrador.' });
  }
  
  
  next();
};

module.exports = {
  verificarPermisoAdministrador
};
