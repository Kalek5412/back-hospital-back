const {Schema,model} = require('mongoose');

const DoctorSchema=Schema({
    nombre:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }

},{Collection:'doctores'});

DoctorSchema.method('toJSON',function(){
    const {__v,  ...object}=this.toObject();
    return object;
})


module.exports=model('Doctor',DoctorSchema);