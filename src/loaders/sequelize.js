const db = require("../models");
const { logger } = require("../winston");

module.exports = async () => {
    for (const name of Object.keys(db)) {
        try {
            await db[name].sequelize.sync({force: false});
            logger.info(`database ${name} connection ok`);
        } catch (err) {
            logger.error(err.stack);
        }
    }
};