/*--/api/usuarios--*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getDoctor, postDoctor, putDoctor, deleteDoctor } = require("../controller/doctor");


const router = Router();

  router.get("/", getDoctor),
  router.post("/", [
    validarJWT,
    check('nombre','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe de ser válido').isMongoId(),
    validarCampos
  ], postDoctor),
  router.put("/:id", [
    validarJWT,
    check('nombre','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe de ser válido').isMongoId(),
    validarCampos
  ], putDoctor),
  router.delete("/:id",validarJWT,  deleteDoctor);

module.exports = router;
