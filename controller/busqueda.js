const { response } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const getBusqueda = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, doctores, hospitales] = await Promise.all([
    User.find({ nombre: regex }),
    Doctor.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);
  res.json({
    ok: true,
    usuarios,
    doctores,
    hospitales,
  });
};

const getCollectionBusqueda = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case 'doctores':
      data = await Doctor.find({ nombre: regex })
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');
      break;
    case 'hospitales':
      data = await Hospital.find({ nombre: regex })
      .populate('usuario', 'nombre img');
      break;
    case 'usuarios':
      data = await User.find({ nombre: regex });
      break;

    default:
      res.status(400).json({
        ok: false,
        msg: "la tabla tiene q estar en la bd",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = { getBusqueda, getCollectionBusqueda };
