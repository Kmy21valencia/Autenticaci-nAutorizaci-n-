const { Router } = require('express');
const { createUsuario, getUsuarios, updateUsuario } = require('../controllers/usuario');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router();


router.post('/', createUsuario);


router.put('/:id', verificarToken, verificarPermisoAdministrador, updateUsuario);


router.get('/',  verificarToken, verificarPermisoAdministrador, getUsuarios);

module.exports = router;
