const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospital = async (req, res) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");

  res.json({
    ok: true,
    hospitales,
  });
};

const postHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const putHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid=req.uid;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "no existe hospital por ese id",
      });
    }

    const cambioHospital={...req.body,usuario:uid}

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, {
      new: true,
    });

    res.json({
      ok: true,
      hospital: hospitalActualizado
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "no existe un hospital por ese id",
      });
    }
    await Hospital.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

module.exports = { getHospital, postHospital, putHospital, deleteHospital };
