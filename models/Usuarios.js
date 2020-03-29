const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg:'Agrega un correo válido'
            },
            notEmpty:{
                msg: 'El e-mail no puede ir vacío'
            }
        },
        unique:{
            args:true,
            msg : 'Usuario ya registrado'
        }
    },
    password : {
        type : Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'El password no puede ir vacío'
            }
        }
    },
    token:{
        type: Sequelize.STRING
    },
    expiracion:{
        type: Sequelize.DATE
    }
},{
    hooks:{
        beforeCreate(attributes, options) {
            attributes.password = bcrypt.hashSync(attributes.password,bcrypt.genSaltSync(10));
        }
    }
});

//Metodos personalizados

Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;