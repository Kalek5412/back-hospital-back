/*--/api/auth--*/
const {Router} = require('express');
const {check} = require('express-validator'); 
const { login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= Router();

router.post('/',[
    check('email','emeail es obligatorio').isEmail(),
    check('password','role es obligatorio').not().isEmpty(),
    validarCampos
],login)

router.get('/renew',
    validarJWT,
    renewToken
)

module.exports=router;