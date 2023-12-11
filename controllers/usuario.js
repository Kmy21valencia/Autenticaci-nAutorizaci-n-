const Usuario = require('../models/usuario');
const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUsuario = async (req = request, res = response) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

  
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

  
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: contraseñaEncriptada,
      rol,
    });

    


    const token = jwt.sign(
      { usuario: nuevoUsuario._id },
      'secreto', 
      { expiresIn: '10h' }
      
    );
      console.log(token)

     
     nuevoUsuario.token = token;

     await nuevoUsuario.save();
 
     return res.status(201).json({ usuario: nuevoUsuario, token });
   } catch (e) {
     return res.status(500).json({ msg: 'Error al crear el usuario' });
   }
 };



const updateUsuario = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado, email, nombre, rol, contraseña } = req.body;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', usuario);

    usuario.estado = estado;
    usuario.email = email ? email.toUpperCase() : usuario.email;
    usuario.nombre = nombre ? nombre.toUpperCase() : usuario.nombre;
    usuario.rol = rol !== undefined ? rol : usuario.rol;
    usuario.fechaActualizacion = new Date();

    
    if (contraseña) {
      usuario.contraseña = contraseña;
    }
    await usuario.save();

    return res.json(usuario);
  } catch (e) {
    return res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};


const getUsuarios = async (req = request, res = response) => {
  try {
    const { estado } = req.query;

    const usuariosDB = await Usuario.find({ estado });

    return res.json(usuariosDB);
  } catch (e) {
    return res.status(500).json({ msg: 'Error al obtener los usuarios' });
  }
};

module.exports = { createUsuario, getUsuarios, updateUsuario };
