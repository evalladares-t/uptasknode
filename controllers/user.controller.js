const Usuarios = require('../models/Usuarios');


exports.formCrearcuenta= (req,res)=>{
    res.render('crearCuenta',{
        nombrePagina:' Crear cuenta en Uptask'
    })
};

exports.formIniciarSesion= (req,res)=>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina:' Iniciar sesion en Uptask',
        error
    })
};

exports.Crearcuenta= async (req,res)=>{
    const {email,password}  = req.body;
    try {
        await Usuarios.create({email,password});
            res.redirect('/iniciar-sesion');
    }catch (error) {
        req.flash('error',error.errors.map(error => error.message));
        res.render('crearCuenta',{
            nombrePagina:' Crear cuenta en Uptask',
            mensajes: req.flash(),
            email,
            password
        })
    }

};