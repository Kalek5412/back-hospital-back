
const {Router}=require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {  getBusqueda, getCollectionBusqueda } = require('../controller/busqueda');

const router = Router();

  router.get("/:busqueda",validarJWT,getBusqueda );
  router.get("/:tabla/:busqueda",validarJWT,getCollectionBusqueda )

module.exports=router  