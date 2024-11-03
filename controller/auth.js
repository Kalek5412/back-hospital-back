const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt");

const login=async(req,res=response)=>{
    const {email,password}=req.body;
    try {
        const usuarioDB=await User.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'email no encontrado no valida'
            })
        }
        const validPassword=bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'password no coinciden'
            })
        }
        const token=await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "revisar log",
        });
      }
}

const renewToken= async(req,res=response)=>{
    const uid=req.uid;
    const token= await generarJWT(uid);
    res.json({
        ok:true,
        token
    });
}

module.exports={login,renewToken}