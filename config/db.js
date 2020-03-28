const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('uptasknode', 'root', '', {
    host: 'localhost',
    dialect:'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+0'
    },
    timezone: 'Etc/GMT+0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;