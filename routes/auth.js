const { Router } = require('express');
const { autenticarUsuario } = require('../middlewares/auth');

const router = Router();


router.post('/', autenticarUsuario);

module.exports = router;
