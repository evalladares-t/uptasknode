const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.proyectosHome = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    //console.log(res.locals.usuario);
    const proyectos = await Proyectos.findAll({
        where:{
            usuarioId
        }
    });
    res.render('index',{
        nombrePagina:"Proyectos "+res.locals.years,
        proyectos
    })
};

exports.formularioProyecto = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    //console.log(res.locals.usuario);
    const proyectos = await Proyectos.findAll({
        where:{
            usuarioId
        }
    });
    res.render('nuevoProyecto',{
        nombrePagina:"Nuevo Proyecto",
        proyectos
    })
};

exports.nuevoProyecto = async (req,res) =>{
    //Validar que tengamos algo en el imput

    const name = req.body.name;
    const usuarioId = res.locals.usuario.id;
    //console.log(res.locals.usuario);
    const proyectos = await Proyectos.findAll({
        where:{
            usuarioId
        }
    });

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

        await Proyectos.create({name,usuarioId});
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    //console.log(res.locals.usuario);
    const proyectosPromise = Proyectos.findAll({
        where: {
            usuarioId
        }
    });
    const proyectoPromise = Proyectos.findOne({
        where:{
            url:req.params.url,
            usuarioId
        }
    });
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    //Consultar tareas del proyecto actual
    const tareas = await  Tareas.findAll({
        where:{
            proyectoId : proyecto.id
        },
        include:[
            {model:Proyectos}
        ]
    });
    //console.log(tareas);
    if(!proyecto){
        return next();
    }
    res.render('tareas',{
        nombrePagina:"Tareas del Proyecto",
        proyectos,
        proyecto,
        tareas

    })
};


exports.formularioEditar = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = await Proyectos.findAll({
        where:{
            usuarioId
        }
    });
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
    const usuarioId = res.locals.usuario.id;
    const name = req.body.name;
    const proyectos = await Proyectos.findAll({
        where:{
            usuarioId
        }
    });

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