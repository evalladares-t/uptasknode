const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res,next) =>{
    const proyecto = await Proyectos.findOne({
        where:{
            url:req.params.url
        }
    });
    //Leer el valor de los imputs
    const {tarea} = req.body;
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar a la bd
    const result= await Tareas.create({tarea,estado,proyectoId});

    if(!result){
        return next();
    }
    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);

};

exports.cambiarEstadoTarea = async (req,res,next) =>{
    const {id} = req.params;
    const tarea = await Tareas.findOne({
        where:{
            id
        }
    });
    //cambiar estado
    let estado = 0;

    if(tarea.estado ===estado){
        estado=1;
    }
    tarea.estado = estado;
    const result =await tarea.save();
    if(!result){
        next();
    }
    res.status(200).send('Actualizado');
};

exports.eliminarTarea = async (req,res,next) =>{
    const {id} = req.params;

    const result =await Tareas.destroy({
        where:{
            id
        }
    });
    if(!result){
        next();
    }
    res.status(200).send('Tarea Eliminada');
};