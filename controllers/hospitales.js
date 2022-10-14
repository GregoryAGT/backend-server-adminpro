const { response } = require('express')
const Hospital = require('../models/hospitale')

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img',);

    res.json({
        ok: true,
        hospitales
    })

}
const crearHospital= async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    
    try{
       const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    }catch(error){
        res.status(500).json({
            ok: tfalse,
            msg: 'Hable con el administrador'
        })

    }

   
    
}
const actializarHospital= async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
           return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por ID',                
            })
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
            
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true}    );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    }catch {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
   
    
}
const borrarHospital= async (req, res = response) => {

    const id = req.params.id;
    

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
           return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por ID',                
            })
        }

        await Hospital.findByIdAndDelete(id);
        
        

        res.json({
            ok: true,
            msg: 'hospital eliminado'
        })

    }catch {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

    
}
module.exports = {
    getHospitales,
    crearHospital,
    actializarHospital,
    borrarHospital
}