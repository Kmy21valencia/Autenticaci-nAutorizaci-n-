const { Router } = require('express')
const { createMarca, getMarcas, updateMarca } = require('../controllers/marca')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()



router.post('/',verificarToken, verificarPermisoAdministrador, createMarca)


router.put('/:id',verificarToken, verificarPermisoAdministrador, updateMarca)


router.get('/',verificarToken, verificarPermisoAdministrador, getMarcas)




module.exports = router 