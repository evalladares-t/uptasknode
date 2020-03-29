const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect : '/iniciar-sesion',
    failureFlash:true,
    badRequestMessage:'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = (req,res,next) =>{
    //private
    if(req.isAuthenticated()){
        return next();
    }
    //public
        return res.redirect('/iniciar-sesion');
};

exports.cerrarSesion = (req,res) =>{

    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion')
    })
};

//Generar token
exports.enviarToken = async (req,res) =>{
    const {email} = req.body;

    const usuario = await Usuarios.findOne({
        where:{
            email
        }
    });

    if(!usuario){
        req.flash('error','No existe esa cuenta');
        res.render('/restablecer',{
            nombrePagina: 'Restablecer contraseña',
            mensajes:req.flash()
        })
    }
    usuario.token = crypto.randomBytes(30).toString('hex');
    usuario.expiracion = Date.now()+3600000;
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;
    console.log(resetUrl);
};

exports.validarToken = async (req,res,next) =>{
    const usuario = await Usuarios.findOne({
        where:{
            token:req.params.token
        }
    });

    if(!usuario){
        req.flash('error','no valido');
        res.redirect('/restablecer')
    }
    res.render('resetPassword',{
        nombrePagina: 'Restablecer contraseña',
    })

};

exports.actualizarPassword = async (req,res) =>{
    const usuario = await Usuarios.findOne({
        where:{
            token:req.params.token,
            expiracion : {
                [Op.gte] :Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error','No válido');
        res.redirect('restablecer');
    }
    usuario.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    usuario.token =null;
    usuario.expiracion=null;
    await usuario.save();

    req.flash('correcto','Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
};
