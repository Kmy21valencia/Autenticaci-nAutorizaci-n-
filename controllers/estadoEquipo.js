const EstadoEquipo = require('../models/estadoEquipo')
const {request, response} = require('express')
const { db } = require('../models/estadoEquipo')

const createEstadoEquipo = async (req = request, res = response ) => {
    
    try{
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const estadoEquipoBD = await EstadoEquipo.findOne({nombre})
        if(estadoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const estadoEquipo = new EstadoEquipo(data)

        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}



 const updateEstadoEquipo = async (req = request, res = response ) => {
    
    try{
        const { id } = req.params
        const { estado, nombre } = req.body

        const estadoEquipo = await EstadoEquipo.findById(id)

        if (!estadoEquipo) {
            return res.status(404).json({
                msg: 'Estado de Equipo no encontrado'
            })
        }

        estadoEquipo.estado = estado
        estadoEquipo.nombre = nombre ? nombre.toUpperCase() : estadoEquipo.nombre
        estadoEquipo.fechaActualizacion = new Date()

        await estadoEquipo.save()

        return res.json(estadoEquipo)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}



 const getEstadoEquipos = async (req = request,
    res = response) => {
    try{
        const { estado } = req.query;


        const estadoEquiposDB = await EstadoEquipo.find({estado})
       
        return res.json(estadoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


module.exports = {createEstadoEquipo, getEstadoEquipos, updateEstadoEquipo}
