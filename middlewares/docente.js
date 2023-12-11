

const verificarRolDocente = (req, res, next) => {
    
    if (req.usuario.rol !== 'docente') {
      return res.status(403).json({ msg: 'Acceso no autorizado. Solo los docentes y administradores pueden acceder a esta funcionalidad.' });
    }
  
   
    next();
  };
 
  module.exports = {
    verificarRolDocente
  };