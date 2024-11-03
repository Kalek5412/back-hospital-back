const { response } = require("express");
const Doctor = require("../models/doctor");

const getDoctor = async (req, res) => {
  const doctores = await Doctor.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");

  res.json({
    ok: true,
    doctores,
  });
};

const postDoctor = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({ usuario: uid, ...req.body });
  try {
    const doctorDB = await doctor.save();
    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const putDoctor = async (req, res = response) => {
  const id = req.params.id;
  const uid=req.uid;
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "no existe un usuario por ese id",
      });
    }

    const cambioDoctor = { ...req.body, usuario: uid };

    const doctorActualizado = await Doctor.findByIdAndUpdate(
      id,
      cambioDoctor,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      doctor: doctorActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "no existe un doctor por ese id",
      });
    }
    await Doctor.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg:"doctor eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "revisar log",
    });
  }
};

module.exports = { getDoctor, postDoctor, putDoctor, deleteDoctor };
