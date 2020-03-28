const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const helpers = require('./helpers');

//Importar modelos
require('./models/Proyectos');
require('./models/Tareas');
db.sync()
    .then(() => console.log("Conectado a la bd"))
    .catch((error) => console.log("Error en la conexión a la bd: "+ error));


//Donde cargar los archivos estáticos
app.use(express.static('public'));

//Habilitar PUG
app.set('view engine','pug');
    //Añadir las carpetas de las vistas
    app.set('views',path.join(__dirname,'./views'));

//Pasar  var dump
app.use((req,res,next)=>{
    res.locals.vardump = helpers.vardump;
    const fecha = new Date();
    res.locals.years = fecha.getFullYear();
    next();
});

//Habilitar bodyparser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}));

//Se agrega las rutas
app.use('/',routes());


app.listen(3001,() =>{
    console.log('Server run on port 3001');
});

module.exports = app;