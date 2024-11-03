
const {Router}=require('express');
const exFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, returnImage } = require('../controller/upload');


const router = Router();
router.use(exFileUpload());

router.put("/:tipo/:id",validarJWT,fileUpload);
router.get("/:tipo/:foto",returnImage);

module.exports=router  