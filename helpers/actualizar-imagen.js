const fs = require('fs');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User=require('../models/user');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen=async (tipo, id, nombreArchivo )=>{
    let pathViejo = '';
    
    switch( tipo ) {
        case 'doctor':
            const doctor = await Doctor.findById(id);
            if ( !doctor ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/doctor/${doctor.img}`;
            borrarImagen(pathViejo);

            doctor.img = nombreArchivo;
            await doctor.save();
            return true;

        break;
        
        case 'hospital':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospital/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;
        
        case 'usuario':

            const usuario = await User.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuario/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }

}
module.exports={actualizarImagen}