const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

//Donde cargar los archivos estáticos
app.use(express.static('public'));

//Habilitar PUG
app.set('view engine','pug');
//Añadir las carpetas de las vistas
app.set('views',path.join(__dirname,'./views'));

//Se agrega las rutas
app.use('/',routes());


app.listen(3000,() =>{
    console.log('Server run on port 3000');
});

module.exports = app;