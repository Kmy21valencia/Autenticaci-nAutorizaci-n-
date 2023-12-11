const { Router } = require('express')
const { createInventario, getInventarios, updateInventarioByID} = require('../controllers/inventario')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');
const { verificarRolDocente } = require('../middlewares/docente');

const router = Router()


router.post('/',verificarToken, verificarPermisoAdministrador, createInventario)


router.get('/',verificarToken,verificarPermisoAdministrador, getInventarios)


router.get('/',verificarToken, verificarPermisoAdministrador, updateInventarioByID)

module.exports = router;