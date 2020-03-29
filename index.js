const express = require('express');
const routes = require('./routes');
const passport = require('./config/passport');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const helpers = require('./helpers');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

//Habilitar bodyparser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Importar modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync()
    .then(() => console.log("Conectado a la bd"))
    .catch((error) => console.log("Error en la conexión a la bd: "+ error));

//Donde cargar los archivos estáticos
app.use(express.static('public'));

//Habilitar PUG
app.set('view engine','pug');
    //Añadir las carpetas de las vistas
    app.set('views',path.join(__dirname,'./views'));

//app.use(expressValidator());
app.use(flash());
app.use(cookieParser());

//Apartado de sesiones
app.use(session({
    secret:'supersecreto',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar  var dump
app.use((req,res,next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.years = fecha.getFullYear();
    next();
});



//Se agrega las rutas
app.use('/',routes());

app.listen(3001,() =>{
    console.log('Server run on port 3001');
});

module.exports = app;