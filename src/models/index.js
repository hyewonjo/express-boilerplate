'use strict';

const env = process.env.NODE_ENV || 'development';

const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

const config = require('../config/sequelize')[env];
const { logger } = require('../winston');

const databaseNames = Object.keys(config);

const db = {};

function getLogging(level) {
    if (level === 'debug')
        return msg => logger.debug(msg);

    return false;
}

for (const name of databaseNames) {
    const curConfig = config[name];
    db[name] = {};
    db[name]['sequelize'] = new Sequelize(curConfig.database, curConfig.username, curConfig.password, {
        host: curConfig.host,
        port: curConfig.port,
        dialect: curConfig.dialect,
        timezone: '+09:00',
        pool: {
            max: 20,
            min: 10,
            acquire: 30000,
            idle: 10000,
        },
        logging: getLogging(curConfig.logLevel),
    });
}

const basename = path.basename(__filename);

for (const name of databaseNames) {
    const curModelPath = __dirname + `/${name}`;
    fs.readdirSync(curModelPath)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach(file => {
            const model = require(path.join(curModelPath, file));
            model.init(db[name]['sequelize']);
            db[name][model.name] = model;
        });
}

for (const name of databaseNames) {
    Object.keys(db[name]).forEach(modelName => {
        if (db[name][modelName].associate) {
            db[name][modelName].associate(db);
        }
    })
}

module.exports = db;
