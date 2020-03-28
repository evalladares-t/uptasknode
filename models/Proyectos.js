const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos  = db.define('proyectos',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING(150)
    },
    url:{
        type:Sequelize.STRING(150)
    }
},{
    hooks:{
        beforeCreate(attributes, options) {
            const url= slug(attributes.name).toLowerCase();


            attributes.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;
