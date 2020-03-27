const {Router} = require('express');
const proyectoController = require('../controllers/proyect.controller');
const router = Router();

module.exports = function(){
    router.use('/',proyectoController.proyectosHome);
    return router;
};