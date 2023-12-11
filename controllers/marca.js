const Marca = require('../models/marca')
const {request, response} = require('express')
const { db } = require('../models/marca')


const createMarca = async (req = request, res = response ) => {
    
    try{
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const marcaBD = await Marca.findOne({nombre})
        if(marcaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const marca = new Marca(data)
   
        await marca.save()
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}




 const updateMarca = async (req = request, res = response ) => {
    
    try{
        const { id } = req.params
        const { estado, nombre } = req.body

        const marca = await Marca.findById(id)

        if (!marca) {
            return res.status(404).json({
                msg: 'Marca no encontrada'
            })
        }

        marca.estado = estado
        marca.nombre = nombre ? nombre.toUpperCase() : marca.nombre
        marca.fechaActualizacion = new Date()

        await marca.save()

        return res.json(marca)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}



 const getMarcas = async (req = request,
    res = response) => {
    try{
        const { estado } = req.query;


        const marcasDB = await Marca.find({estado})

        return res.json(marcasDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


module.exports = {createMarca, getMarcas, updateMarca}
