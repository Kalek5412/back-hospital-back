const path = require('path');
const fs=require('fs');
const { response } = require("express");
const {v4: uuidv4} = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload=(req,res=response)=>{
    const tipo= req.params.tipo;
    const id= req.params.id;
    const tiposValidos=['hospital','doctor','usuario'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'no es un tipo definido en el back'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        });
    }

    const file =req.files.imagen;
    
    const nombreCortado=file.name.split('.');
    const extensionArchivo=nombreCortado[nombreCortado.length-1];

    const extensionesValidas=['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'no es uan extension permitida'
        })
    }

    const nombreArchivo= `${uuidv4()}.${extensionArchivo}`;
    const path=`./uploads/${tipo}/${nombreArchivo}`;


    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

    // Actualizar base de datos
    actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const returnImage=(req,res=response)=>{
    const tipo=req.params.tipo;
    const foto=req.params.foto;
    const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        const pathImg=path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg)
    }
    
}

module.exports={fileUpload,returnImage}