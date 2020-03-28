const {Router} = require('express');
const proyectoController = require('../controllers/proyect.controller');
const router = Router();
const { body} = require('express-validator/check');

module.exports = function(){
    router.get('/',proyectoController.proyectosHome);
    router.get('/nuevo-proyecto',proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('name').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto);
    return router;
};