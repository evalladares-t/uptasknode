const Proyectos = require('../models/Proyectos');


exports.proyectosHome = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina:"Proyectos",
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

    let errores = [];

    if(!name){
        errores.push({'texto':'Agregar un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length>0){
        res.render('nuevoProyecto',{
            nombrePagina:"Nuevo Proyectos",
            errores
        })
    }
    else{

        const proyectos = await Proyectos.create({name});
        res.redirect('/');
    }

};