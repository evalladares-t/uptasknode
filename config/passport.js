const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

//Login con credenciales propias

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email,password,done)=>{
            try{
                const usuario = await Usuarios.findOne({
                    where:{
                        email:email
                    }

                });
                //Si existe usuario
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message:'El password no es correcto'
                    })
                }
                //Credenciales correctas
                return done(null,usuario)
            }
            catch (error) {
                //No existe usuario
                return done(null,false,{
                    message:'Esa cuenta no existe'
                })
            }
        }
    )
);


// serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});


module.exports = passport;
