const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipos, updateEstadoEquipo } = require('../controllers/estadoEquipo')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()



router.post('/',verificarToken, verificarPermisoAdministrador, createEstadoEquipo)


router.put('/:id',verificarToken, verificarPermisoAdministrador, updateEstadoEquipo)

router.get('/',verificarToken, verificarPermisoAdministrador, getEstadoEquipos)




module.exports = router 