const sequelizeLoader = require('./sequelize');
const morganLoader = require('./morgan');
const expressLoader = require('./express');

module.exports = async (app) => {
    await sequelizeLoader();
    morganLoader();
    expressLoader(app);
}