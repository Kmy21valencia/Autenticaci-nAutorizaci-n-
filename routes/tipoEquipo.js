const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, updateTipoEquipo } = require('../controllers/tipoEquipo')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()



router.post('/', verificarToken, verificarPermisoAdministrador, createTipoEquipo)


router.put('/:id', verificarToken, verificarPermisoAdministrador, updateTipoEquipo)


router.get('/',verificarToken, verificarPermisoAdministrador, getTipoEquipos)




module.exports = router 