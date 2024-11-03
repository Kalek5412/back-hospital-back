const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  //const usuarios = await User.find({}, "nombre email role google");
  const desde = Number(req.query.desde) || 0;
  const [usuarios,total]=await Promise.all([
    User.find({},'nombre email role google img')
      .skip(desde)
      .limit(5),
    User.countDocuments()  
  ]);

  res.json({
    ok: true,
    usuarios,
    total
  });
};

const postUsers = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existemail = await User.findOne({ email });

    if (existemail) {
      return res.status(400).json({
        ok: false,
        msg: "el carreo estaregistrado....",
      });
    }

    const usuario = new User(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    const token=await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const putUsers = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "no existe un usuario por ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existemail = await User.findOne({ email });
      if (existemail) {
        return res.status(400).json({
          ok: false,
          msg: "existe un suusario con ese correo...",
        });
      }
    }
    campos.email = email;

    const usuarioActualizado = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const deleteUsers = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "no existe un usuario por ese id",
      });
    }
    await User.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers };
