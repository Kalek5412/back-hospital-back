/*--/api/hospitales--*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getHospital, postHospital, putHospital, deleteHospital } = require("../controller/hospital");

const router = Router();

  router.get("/", getHospital),
  router.post("/", [
    validarJWT,
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
  ], postHospital),
  router.put("/:id", [
    validarJWT,
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
  ] , putHospital),
  router.delete("/:id",validarJWT,deleteHospital);

module.exports = router;
