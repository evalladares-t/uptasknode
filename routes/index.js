const {Router} = require('express');
const proyectoController = require('../controllers/proyect.controller');
const tareasController = require('../controllers/tareas.controller');
const userController = require('../controllers/user.controller');
const router = Router();
const { body} = require('express-validator/check');

module.exports = function(){
    router.get('/',proyectoController.proyectosHome);
    router.get('/nuevo-proyecto',proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('name').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    //Listar los diferentes proyectos
    router.get('/proyectos/:url',proyectoController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id',proyectoController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('name').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );
    router.delete('/proyectos/:url',proyectoController.eliminarProyecto);

    //Rutas para las tareas:
    router.post('/proyectos/:url',tareasController.agregarTarea);
    //Actualiar tarea
    router.patch('/tareas/:id',tareasController.cambiarEstadoTarea);
    //Eliminar tarea
    router.delete('/tareas/:id',tareasController.eliminarTarea);

    //Rutas para el usuario
    router.get('/crear-cuenta',userController.formCrearcuenta);
    router.post('/crear-cuenta',userController.Crearcuenta);
    return router;
};