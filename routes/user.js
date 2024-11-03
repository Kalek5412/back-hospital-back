/*--/api/usuarios--*/
const {Router} = require('express');
const {check} = require('express-validator'); 
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controller/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= Router();

router.get('/',validarJWT,getUsers),
router.post('/',[
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('password','password es obligatorio').not().isEmpty(),
    check('email','emeail es obligatorio').isEmail(),
    validarCampos
],postUsers),
router.put('/:id',[
    validarJWT,
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('email','emeail es obligatorio').isEmail(),
    check('role','role es obligatorio').not().isEmpty(),
    validarCampos
],putUsers),
router.delete('/:id',deleteUsers)

module.exports=router;