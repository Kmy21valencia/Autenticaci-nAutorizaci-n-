const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(cors({
  origin: '*'
}))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  });


const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estadoEquipo')
const usuario = require('./routes/usuario')
const marca = require('./routes/marca')
const inventario = require('./routes/inventario')
const auth = require('./routes/auth')


app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estadoequipos', estadoEquipo)
app.use('/api/usuarios', usuario)
app.use('/api/marcas', marca)
app.use('/api/inventarios', inventario)
app.use('/api/auth', auth)


module.exports = app