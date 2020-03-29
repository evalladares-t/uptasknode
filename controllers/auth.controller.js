const passport = require('passport');

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