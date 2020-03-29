const {Router} = require('express');
const proyectoController = require('../controllers/proyect.controller');
const tareasController = require('../controllers/tareas.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = Router();
const { body} = require('express-validator/check');

module.exports = function(){

    router.get('/',authController.usuarioAutenticado,
        proyectoController.proyectosHome);
    router.get('/nuevo-proyecto',authController.usuarioAutenticado,
        proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto',authController.usuarioAutenticado,
        body('name').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    //Listar los diferentes proyectos
    router.get('/proyectos/:url',authController.usuarioAutenticado,proyectoController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id',authController.usuarioAutenticado,proyectoController.formularioEditar);
    router.post('/nuevo-proyecto/:id',authController.usuarioAutenticado,
        body('name').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );
    router.delete('/proyectos/:url',authController.usuarioAutenticado,proyectoController.eliminarProyecto);

    //Rutas para las tareas:
    router.post('/proyectos/:url',authController.usuarioAutenticado,tareasController.agregarTarea);
    //Actualiar tarea
    router.patch('/tareas/:id',authController.usuarioAutenticado,tareasController.cambiarEstadoTarea);
    //Eliminar tarea
    router.delete('/tareas/:id',authController.usuarioAutenticado,tareasController.eliminarTarea);

    //Rutas para el usuario
    router.get('/crear-cuenta',userController.formCrearcuenta);
    router.post('/crear-cuenta',userController.Crearcuenta);
    router.get('/iniciar-sesion',userController.formIniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario);

    router.get('/cerrar-sesion',authController.cerrarSesion);


    return router;
};