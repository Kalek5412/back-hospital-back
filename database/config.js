const mongoose = require('mongoose');

const dbConnection=async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_ATLAS,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
     /*   useCreateIndex:true,
        useFindAndModify:false, */ 
       });
       console.log('base de datos conectado ... ');
    } catch (error) {
        console.log(error);
        throw new Error('error al conectar la bd...');
    }
}


module.exports={
    dbConnection
};