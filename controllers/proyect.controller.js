const Proyectos = require('../models/Proyectos');


exports.proyectosHome = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina:"Proyectos "+res.locals.years,
        proyectos
    })
};

exports.formularioProyecto = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina:"Nuevo Proyecto",
        proyectos
    })
};

exports.nuevoProyecto = async (req,res) =>{
    //Validar que tengamos algo en el imput
    const name = req.body.name;
    const proyectos = await Proyectos.findAll();

    let errores = [];

    if(!name){
        errores.push({'texto':'Agregar un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length>0){
        res.render('nuevoProyecto',{
            nombrePagina:"Nuevo Proyectos",
            errores,
            proyectos
        })
    }
    else{

        await Proyectos.create({name});
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req,res) =>{
    const proyectosPromise = await Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where:{
            url:req.params.url
        }
    });
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    if(!proyecto){
        return next();
    }
    res.render('tareas',{
        nombrePagina:"Tareas del Proyecto",
        proyectos,
        proyecto

    })
};


exports.formularioEditar = async (req,res) =>{
    const proyectosPromise = await Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where:{
            id:req.params.id
        }
    });
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    res.render('nuevoProyecto',{
        nombrePagina:"Editar Proyecto",
        proyectos,
        proyecto
    })
};

exports.actualizarProyecto = async (req,res) =>{
    //Validar que tengamos algo en el imput
    const name = req.body.name;
    const proyectos = await Proyectos.findAll();

    let errores = [];

    if(!name){
        errores.push({'texto':'Agregar un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length>0){
        res.render('nuevoProyecto',{
            nombrePagina:"Nuevo Proyectos",
            errores,
            proyectos
        })
    }
    else{

        await Proyectos.update(
            {name:name},
            {where:{
                id:req.params.id
                }}
        );
        res.redirect('/');
    }
};

exports.eliminarProyecto = async (req,res,next) => {
    const {urlProyecto} = req.query;
    const response = await Proyectos.destroy({
        where:{
            url:urlProyecto
        }
    })
    if(!response){
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
};